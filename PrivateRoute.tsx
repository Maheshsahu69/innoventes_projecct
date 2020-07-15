import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const token = useSelector<RootState, string>(state => state.auth.token);

  return (
    <Route {...rest} >
      {token ? (
        children
      ) : (
          <Redirect to='/login' />
        )}
    </Route>
  );
};

export default PrivateRoute;