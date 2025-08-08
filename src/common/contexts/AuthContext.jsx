import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { UserProfile } from './UserProfileContext';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const { setCurrentUserProfile } = UserProfile();

  // 회원가입
  const signUpNewUser = async (userProfile) => {
    const { email: _, password: __, ...newUserProfileWithoutId } = userProfile;

    // 회원가입
    const { data: signUpUser, error: signUpError } = await supabase.auth.signUp({
      email: userProfile.email,
      password: userProfile.password,
    });
    if (signUpError) {
      console.error('there was a problem signing up: ', signUpError);
      return { success: false, signUpError };
    }

    const userId = signUpUser.user.id;
    const newUser = {
      ...newUserProfileWithoutId,
      id: userId,
    };
    // 유저 생성 in public 스키마
    const { error: createUserError } = await supabase.from('users').insert(newUser);
    if (createUserError) {
      console.error('there was a problem create user: ', createUserError);
      return { success: false, createUserError };
    }

    // 승인 대기 중인 유저를 부서에 추가
    const { error: insertDepartmentMembershipError } = await supabase.from('department_memberships').insert({
      user_id: userId,
      department_id: userProfile.default_department_id,
    });
    if (insertDepartmentMembershipError) {
      console.error('there was a problem insert to department_memberships: ', insertDepartmentMembershipError);
      return { success: false, insertDepartmentMembershipError };
    }

    return { success: true, signUpUser };
  };

  // 유저 기본 정보를 가져옴.
  const getUserProfile = async (currentUserId) => {
    const { data: userProfile, error: userProfileError } = await supabase
      .from('users')
      .select(
        `
          *,
          user_roles(
            *,
            role:roles!user_roles_role_id_fkey(*)
          ),
          department_memberships!department_memberships_user_id_fkey(*)
        `,
      )
      .eq('id', currentUserId)
      .single();

    if (userProfileError) {
      console.error('there was a problem signing in: ', userProfileError);
      return { success: false, error: userProfileError.message };
    }

    return { success: true, data: userProfile };
  };

  // 로그인
  const signIn = async (email, password) => {
    try {
      const { data: signIn, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (signInError) {
        console.error('there was a problem signing in: ', signInError);
        return { success: false, error: signInError.message };
      }

      const { success, data: userProfile } = await getUserProfile(signIn.session.user.id);
      if (!success) return;

      setCurrentUserProfile(userProfile);

      return { success: true, data: signIn.session };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
  };

  // 로그아웃
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('there was a problem signing out: ', error);
    }
  };

  // 초기 실행
  useEffect(() => {
    // 사용자가 페이지를 새로고침하거나 브라우저를 껐다 켰을 때 로그인 상태를 즉시 복원
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 인증 상태에 변화가 생겼을 때
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    setSession,
    signUpNewUser,
    signIn,
    getUserProfile,
    signOut,
  };
  return (
    // 모든 컴포넌트에서 리렌더링 안되게 하려면 이렇게 해야함.
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
