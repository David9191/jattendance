import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';

import { AuthContextProvider } from './contexts/AuthContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
);
