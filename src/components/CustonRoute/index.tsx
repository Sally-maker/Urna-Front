import React from 'react';

import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from '~/hooks/auth';

interface CustonRouteProps extends RouteProps {
  role: 'standard' | 'admin';
}

const CustonRoute: React.FC<CustonRouteProps> = ({ role, ...rest }) => {
  const { user } = useAuth();

  if (user && role === 'admin') {
    return <Route {...rest} />;
  }

  if (user && role === 'standard') {
    return <Route {...rest} />;
  }

  return <Redirect to="/" />;
};

export default CustonRoute;
