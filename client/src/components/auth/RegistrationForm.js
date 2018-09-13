import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

// Material UI Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PersonAdd from '@material-ui/icons/PersonAdd';

import config from '../../app.config';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

// This component looks a lot like the LoginForm component with the exception that it calls the Node API that will handle doing the registration.
// Once the registration is completed by the Node API, the component logs the newly created user in, and the render method (when it sees a session token in the state) redirects the user to the home page of the application.

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      sessionToken: null
    };
    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      params: {
        activate: true
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(user => {
        this.oktaAuth
          .signIn({
            username: this.state.email,
            password: this.state.password
          })
          .then(res =>
            this.setState({
              sessionToken: res.sessionToken
            })
          );
      })
      .catch(err => console.log);
  }

  render() {
    const { classes } = this.props;

    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAdd />
            </Avatar>
            <Typography variant="headline">Register</Typography>
            <form onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                  htmlFor="email"
                >
                  Email
                </InputLabel>
                <Input
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  type="email"
                  id="email"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                  htmlFor="firstName"
                >
                  First Name
                </InputLabel>
                <Input
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  type="text"
                  id="firstName"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                  htmlFor="lastName"
                >
                  Last Name
                </InputLabel>
                <Input
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  type="text"
                  id="lastName"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel
                  FormLabelClasses={{
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  }}
                  htmlFor="password"
                >
                  Password
                </InputLabel>
                <Input
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  classes={{
                    underline: classes.cssUnderline,
                  }}
                  type="password"
                  id="password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Button
                component={Link}
                to='/login'
                fullWidth
                variant="raised"
                color="secondary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withAuth(withStyles(styles)(RegistrationForm));
