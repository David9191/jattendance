import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';

import { router } from './router.jsx';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { UserProfileContextProvider } from './contexts/UserProfileContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProfileContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </UserProfileContextProvider>
  </StrictMode>,
);
