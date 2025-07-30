import React, { createContext, useContext, useState } from 'react';

const UserDepartmentContext = createContext(null);

export const DepartmentContextProvider = ({ children }) => {
  const [currentDepartmentInfo, setCurrentDepartmentInfo] = useState({});

  return (
    <UserDepartmentContext.Provider value={{ currentDepartmentInfo, setCurrentDepartmentInfo }}>
      {children}
    </UserDepartmentContext.Provider>
  );
};

export const UserDepartment = () => useContext(UserDepartmentContext);
