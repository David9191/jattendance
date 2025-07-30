import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';

import { router } from './router.jsx';
import { RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './common/contexts/AuthContext';
import { DepartmentContextProvider } from './common/contexts/DepartmentContext';
import { UserProfileContextProvider } from './common/contexts/UserProfileContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DepartmentContextProvider>
      <UserProfileContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </UserProfileContextProvider>
    </DepartmentContextProvider>
  </StrictMode>,
);
