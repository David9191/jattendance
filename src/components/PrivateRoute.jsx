import React from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session == undefined) {
    return (
      <>
        <p>Loading...</p>
        <Navigate to={'/signin'} />
      </>
    );
  }

  return <>{session ? { children } : <Navigate to={'/signin'} />}</>;
};

export default PrivateRoute;
