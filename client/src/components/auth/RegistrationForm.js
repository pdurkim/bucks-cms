import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import config from '../../app.config';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    display: 'none',
  },
  alignCenter: {
    justifyContent: 'right',
  }
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
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
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
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <input
            className={classes.input}
            id="submit"
            type="submit"
            value="Register"
          />
          <label htmlFor="submit">
            <Button component="span" className={classes.button}>
              Register
            </Button>
          </label>
        </div>
      </form>
    );
  }
}

export default withAuth(withStyles(styles)(RegistrationForm));
