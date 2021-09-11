import * as React from 'react';
import { RouteProps, Redirect, Route } from 'react-router-dom';
const PrivateRoute = (props: RouteProps) => {
  const accessToken = Boolean(localStorage.getItem('accessToken'));
  console.log(accessToken);
  if (!accessToken) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};
export default PrivateRoute;
