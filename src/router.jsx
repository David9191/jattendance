import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import IsSigned from './components/IsSigned';
import PrivateRoute from './components/PrivateRoute';
import SelectDepartment from './pages/SelectDepartment';
import CreateDepartment from './pages/CreateDepartment';

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
    path: '/select-department',
    element: <SelectDepartment />,
  },
  {
    path: '/create-department',
    element: <CreateDepartment />,
  },
]);
