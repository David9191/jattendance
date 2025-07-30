import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './common/pages/SignUp';
import SignIn from './common/pages/SignIn';
import Dashboard from './common/pages/Dashboard';
import PrivateRoute from './common/components/PrivateRoute';
import SelectDepartment from './common/pages/SelectDepartment';
import AdminMainPage from './admin/pages/AdminMainPage';
import UserManagement from './admin/features/users/pages/UserManagement';
import DepartmentManagement from './admin/features/departments/pages/DepartmentManagement';
import RoleManagement from './admin/features/roles/pages/RoleManagement';
import WorshipManagement from './admin/features/worships/pages/WorshipManagement';
import PrayRequestManagement from './admin/features/prayer-requests/pages/PrayRequestManagement';
import ExpenseManagement from './admin/features/expenses/pages/ExpenseManagement';
import DonationManagement from './admin/features/donations/pages/DonationManagement';
import AnnouncementManagement from './admin/features/announcements/pages/AnnouncementManagement';
import SnsManagement from './admin/features/sns/pages/SnsManagement';
import PermissionManagement from './admin/features/permissions/pages/PermissionManagement';
import SecurityLogManagement from './admin/features/security-logs/pages/SecurityLogManagement';

const manageList = [
  {
    path: 'manage/user',
    element: <UserManagement />,
  },
  {
    path: 'manage/department',
    element: <DepartmentManagement />,
  },
  {
    path: 'manage/role',
    element: <RoleManagement />,
  },
  {
    path: 'manage/worship',
    element: <WorshipManagement />,
  },
  {
    path: 'manage/pray-request',
    element: <PrayRequestManagement />,
  },
  {
    path: 'manage/expense',
    element: <ExpenseManagement />,
  },
  {
    path: 'manage/donation',
    element: <DonationManagement />,
  },
  {
    path: 'manage/announcement',
    element: <AnnouncementManagement />,
  },
  {
    path: 'manage/sns',
    element: <SnsManagement />,
  },
  {
    path: 'manage/permission',
    element: <PermissionManagement />,
  },
  {
    path: 'manage/security',
    element: <SecurityLogManagement />,
  },
];

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    // Header에 slug 별로 왼쪽에 name 박아두자.
    path: '/select-department',
    element: <SelectDepartment />,
  },
  {
    path: '/admin/',
    children: [
      {
        path: 'infant',
        element: <AdminMainPage />,
        children: manageList,
      },
      {
        path: 'kindergarten',
        element: <AdminMainPage />,
        children: manageList,
      },
      {
        path: 'elementary',
        element: <AdminMainPage />,
        children: manageList,
      },
      {
        path: 'children',
        element: <AdminMainPage />,
        children: manageList,
      },
      {
        path: 'middle-school',
        element: <AdminMainPage />,
        children: manageList,
      },
      {
        path: 'high-school',
        element: <AdminMainPage />,
        children: manageList,
      },
      {
        path: 'youth',
        element: <AdminMainPage />,
        children: manageList,
      },
    ],
  },
]);
