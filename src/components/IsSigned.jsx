import React from 'react';
import { UserAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const IsSigned = ({ children }) => {
  const { session } = UserAuth();

  return <>{session ? <Navigate to={'/dashboard'} /> : children}</>;
};

export default IsSigned;
