import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface PublicRouteProps extends RouteProps {
  children: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children, ...rest }) => {
  const token = useSelector<RootState, string>(state => state.auth.token);

  return (
    <Route {...rest} >
      {token ? (
        <Redirect to='/posts' />
      ) : (
          children

        )}
    </Route>
  );
};

export default PublicRoute;