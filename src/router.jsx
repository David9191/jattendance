import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import SelectDepartment from './pages/SelectDepartment';

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
    path: '/admin/',
    children: [
      {
        path: 'infant',
        element: <Dashboard />,
      },
      {
        path: 'kindergarten',
        element: <Dashboard />,
      },
      {
        path: 'children',
        element: <Dashboard />,
      },
      {
        path: 'middle-school',
        element: <Dashboard />,
      },
      {
        path: 'high-school',
        element: <Dashboard />,
      },
      {
        path: 'youth',
        element: <Dashboard />,
      },
    ],
  },
]);
