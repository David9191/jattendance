import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserDepartment } from '../../common/contexts/DepartmentContext';
import AdminSidebar from '../components/AdminSidebar';
import '../css/adminMainPage.css';

const AdminMainPage = () => {
  const { currentDepartmentInfo } = UserDepartment();

  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <AdminSidebar />
      </aside>
      <main className="admin-layout__main">
        <header className="admin-layout__header">
          <h1 className="admin-layout__title">{currentDepartmentInfo?.name ?? '관리자'}</h1>
        </header>
        <section className="admin-layout__content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminMainPage;
