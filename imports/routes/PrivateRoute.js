import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

export default createContainer(() => ({
  isAuthenticated: !!Meteor.userId()
}), PrivateRoute);
