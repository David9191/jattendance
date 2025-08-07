import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserDepartment } from '../../common/contexts/DepartmentContext';
import AdminSidebar from '../components/AdminSidebar';

const AdminMainPage = () => {
  const [currentDepartment, setCurrentDepartment] = useState({});
  const { currentDepartmentInfo } = UserDepartment();

  useEffect(() => {
    setCurrentDepartment(currentDepartmentInfo);
  }, [currentDepartmentInfo]);

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
        <AdminSidebar />
      </div>
      <main style={{ flex: 1, padding: '2rem' }}>
        <h1 style={{ marginBottom: '24px' }}>{currentDepartment.name}</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminMainPage;
