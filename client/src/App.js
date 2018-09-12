import React from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';
import ProfilePage from './components/auth/ProfilePage';
import Layout from './components/shared/Layout';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Layout>
    <CssBaseline />
    <main className={classes.main}>
      <Route path="/" exact component={HomePage} />
      <Route
        path="/login"
        render={() => <LoginPage baseUrl={config.url} />}
      />
      <Route path="/implicit/callback" component={ImplicitCallback} />
      <Route path="/register" component={RegistrationForm} />
      <SecureRoute path="/profile" component={ProfilePage} />
    </main>
  </Layout>
);

export default withStyles(styles)(App);
