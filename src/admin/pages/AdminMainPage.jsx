import React, { useState, useEffect } from 'react';

import Sidebar from '../features/layout/components/Sidebar';
import Dashboard from '../features/dashboard/pages/Dashboard';
import { UserDepartment } from '../../common/contexts/DepartmentContext';

const AdminMainPage = () => {
  const [currentDepartment, setCurrentDepartment] = useState({});
  const { currentDepartmentInfo } = UserDepartment();

  useEffect(() => {
    setCurrentDepartment(currentDepartmentInfo);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', fontSize: '1.4rem' }}>
      <div
        style={{
          width: '240px',
          minWidth: '200px',
          background: '#f5f5f5',
          height: '100vh',
          boxShadow: '2px 0 8px rgba(0,0,0,0.03)',
        }}
      >
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ marginBottom: '24px' }}>{currentDepartment.name}</h1>
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminMainPage;
