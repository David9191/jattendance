import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext(null);

export const UserProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const UserProfile = () => useContext(UserProfileContext);
