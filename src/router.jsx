import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './common/pages/SignUp';
import SignIn from './common/pages/SignIn';
import CommonDashboard from './common/pages/Dashboard'; // 이름 변경
import PrivateRoute from './common/components/PrivateRoute';
import SelectDepartment from './common/pages/SelectDepartment';
import AdminMainPage from './admin/pages/AdminMainPage';
import AdminDashboard from './admin/features/dashboard/pages/Dashboard'; // 이름 변경
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
        <CommonDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/select-department',
    element: <SelectDepartment />,
  },
  {
    path: '/admin/:departmentSlug',
    element: <AdminMainPage />,
    children: [{ index: true, element: <AdminDashboard /> }, ...manageList],
  },
]);
