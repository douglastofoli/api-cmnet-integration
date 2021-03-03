import React, { ReactElement } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect
            to={{ pathname: '/dashboard', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const Routes: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/" exact component={SignIn} />
        <PublicRoute path="/signup" component={SignUp} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
