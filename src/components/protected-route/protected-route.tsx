import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!userState.isInit || userState.isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userState.user) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  if (onlyUnAuth && userState.user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
