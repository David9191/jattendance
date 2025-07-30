import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import SelectDepartment from './pages/SelectDepartment';
import AdminMainPage from './admin/pages/AdminMainPage';
import UserManagement from './admin/components/UserManagement';
import DepartmentManagement from './admin/components/DepartmentManagement';
import RoleManagement from './admin/components/RoleManagement';
import WorshipManagement from './admin/components/WorshipManagement';
import PrayRequestManagement from './admin/components/PrayRequestManagement';
import ExpenseManagement from './admin/components/ExpenseManagement';
import DonationManagement from './admin/components/DonationManagement';
import AnnouncementManagement from './admin/components/AnnouncementManagement';
import SnsManagement from './admin/components/SnsManagement';
import PermissionManagement from './admin/components/PermissionManagement';
import SecurityLogManagement from './admin/components/SecurityLogManagement';

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
