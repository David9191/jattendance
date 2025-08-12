import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';

const UserProfileContext = createContext(null);

export const UserProfileContextProvider = ({ children }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState({});

  const geAllDepartments = async () => {
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

  const getDepartmentsByRole = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(
          `
            *,
            departments(*),
            roles(*)
          `,
        )
        .eq('user_id', currentUserProfile.id);

      if (error) {
        console.error('there was a problem signing in: ', error);
        return { success: false, error: error.message };
      }
      return { success: true, data: data };
    } catch (error) {
      console.error('an error occurred: ', error);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        currentUserProfile,
        setCurrentUserProfile,
        getDepartmentsByRole,
        geAllDepartments,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const UserProfile = () => useContext(UserProfileContext);
