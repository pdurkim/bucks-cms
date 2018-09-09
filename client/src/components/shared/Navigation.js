import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
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

  render() {
    const { classes } = this.props;

    if (this.state.authenticated === null) return null;
    const authNav = this.state.authenticated ? (
      <div className="auth-nav">
        <Button href="" color="inherit" onClick={() => this.props.auth.logout()} className={classes.button}>
          Logout
        </Button>
        <Button component={Link} to="/profile" color="inherit" className={classes.button}>
          Profile
        </Button>
      </div>
    ) : (
      <div className="auth-nav">
        <Button href="" color="inherit" onClick={() => this.props.auth.login()} className={classes.button}>
          Login
        </Button>
        <Button component={Link} to="/register" color="inherit" className={classes.button}>
          Register
        </Button>
      </div>
    );
    return (
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.grow}>
          Bucks County Presbyterian Church
        </Typography>
        {authNav}
        <Button component={Link} to="/" color="inherit" className={classes.button}>
          Home
        </Button>
      </Toolbar>
    );
  }
}

export default withAuth(withStyles(styles)(Navigation));
