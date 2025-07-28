import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { UserProfile } from './UserProfileContext';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const { setUserProfile, userProfile } = UserProfile();

  // Sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('there was a problem signing up: ', error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Sign in
  const signInUser = async (email, password) => {
    try {
      const { data: signInUser, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
      if (signInError) {
        console.error('there was a problem signing in: ', signInError);
        return { success: false, error: signInError.message };
      }

      const { data: userProfile, error: userProfileError } = await supabase
        .from('users')
        .select()
        .eq('id', signInUser.user.id);
      if (userProfileError) {
        console.error(
          'there was a problem get userProfile: ',
          userProfileError,
        );
        return { success: false, error: userProfileError.message };
      }

      const mergedUserInfo = {
        id: signInUser.user.id,
        ...(userProfile?.[0] || {}),
      };
      setUserProfile(mergedUserInfo);

      return { success: true, data: mergedUserInfo };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
    console.log(userProfile);
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('there was a problem signing out: ', error);
    }
  };

  // Get departments
  const getDepartments = async () => {
    try {
      const { data, error } = await supabase.from('departments').select('*');

      if (error) {
        console.error('there was a problem signing in: ', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
  };

  // Create user in public.users
  const createUserProfile = async (userProfile) => {
    const { error } = await supabase.from('users').insert(userProfile);

    if (error) {
      console.error('there was a problem create user: ', error);
      return { success: false, error };
    }
    return { success: true };
  };

  // useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    // 모든 컴포넌트에서 리렌더링 안되게 하려면 이렇게 해야함.
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signInUser,
        signOut,
        getDepartments,
        createUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
