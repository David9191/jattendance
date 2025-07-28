import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import IsSigned from './components/IsSigned';
import PrivateRoute from './components/PrivateRoute';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/signin',
    element: (
      <IsSigned>
        <SignIn />
      </IsSigned>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);
