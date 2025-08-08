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
      <div className="">
        <header className="admin-layout__header">
          <h1 className="admin-layout__title">{currentDepartmentInfo?.name ?? '관리자'}</h1>
        </header>
        <main className="admin-layout__main">
          <section className="admin-layout__content">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminMainPage;
