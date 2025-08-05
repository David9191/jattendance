import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const UserProfileContext = createContext(null);

export const UserProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  // Get departments
  const geAllDepartments = async () => {
    try {
      const { data, error } = await supabase.from('departments').select('*').order('id', { ascending: true });

      if (error) {
        console.error('there was a problem signing in: ', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
  };

  /**
   * 유저의 역할에 따라 부서를 불러오는 코드
   */
  const getDepartmentsByRole = async () => {
    const currentUserId = JSON.parse(sessionStorage.getItem('currentUserProfile'));
    const isSuperAdminRole = currentUserId?.role === 'super_admin';
    if (!isSuperAdminRole) {
      return { success: false, error: '슈퍼 관리자가 아닙니다.' };
    }

    try {
      const { data, error } = await supabase.from('departments').select('*').order('id', { ascending: true });

      if (error) {
        console.error('there was a problem signing in: ', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
  };

  /**
   * 로그인 직후, 세션에 유저의 모든 정보를 세팅하는 함수
   */
  const setUserProfileToSession = async (currentUserId) => {
    try {
      // userId를 기반으로 앞으로 필요한 모든 정보. (user, department, role 등)
      const { data, error } = await supabase.rpc('get_user_profile', {
        current_user_id: currentUserId,
      });

      if (error) throw error;

      sessionStorage.setItem('currentUserProfile', JSON.stringify(data[0], null, 2));
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        setUserProfileToSession,
        getDepartmentsByRole,
        geAllDepartments,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const UserProfile = () => useContext(UserProfileContext);
