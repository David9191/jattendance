import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabase/supabaseClient';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('there was a problem signing in: ', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
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

// 그냥 한 번 감싸주는거구나
export const UserAuth = () => useContext(AuthContext);
