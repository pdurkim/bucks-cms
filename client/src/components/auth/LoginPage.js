import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react'; // used to get isAuthenticated from Okta

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);

    // This method is executed in the constructor and in the componentDidUpdate lifecycle method to ensure that
    // when the component is created it is checked and every subsequent change to the component checks again
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  // When isAuthenticated returns true, then it is set in the component’s state.
  // It is then checked in the render method to decide whether to show the LoginForm component,
  // or to redirect to the user’s profile page, a component you’ll create next.
  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ? <Redirect to={{ pathname: '/profile' }} /> : <LoginForm baseUrl={this.props.baseUrl} />;
  }
};

export default withAuth(Login);
