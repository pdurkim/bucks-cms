import React from 'react';
import { withAuth } from '@okta/okta-react';
import {
  Typography,
} from '@material-ui/core';
import Layout from '../shared/Layout';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async getCurrentUser() {
    this.props.auth.getUser().then(user => this.setState({ user }));
  }

  // The withAuth component here gives me access to the getUser function.
  // Here, it’s been called from componentDidMount which is a common place for pulling data that will be used in the render method
  componentDidMount() {
    this.getCurrentUser();
  }

  // The only odd thing you might see is the first line of the render method that renders nothing until there is actually a user returned from the getUser asynchronous call.
  // Once there is a user in the state, it then renders the profile content, which in this case is just displaying the currently logged in user’s name.
  render() {
    if (!this.state.user) return null;
    return (
      <Layout>
        <section className="user-profile">
          <div>
            <Typography variant="display1">
              You're signed in as {this.state.user.name}
            </Typography>
          </div>
        </section>
      </Layout>
    );
  }
}

export default withAuth(ProfilePage);
