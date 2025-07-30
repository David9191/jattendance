import React, { useState, useEffect } from 'react';

import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import { UserDepartment } from '../../contexts/DepartmentContext';

const AdminMainPage = () => {
  const [currentDepartment, setCurrentDepartment] = useState({});
  const { currentDepartmentInfo } = UserDepartment();

  useEffect(() => {
    setCurrentDepartment(currentDepartmentInfo);
  }, []);

  return (
    <div>
      <h1>{currentDepartment.name}</h1>
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default AdminMainPage;
