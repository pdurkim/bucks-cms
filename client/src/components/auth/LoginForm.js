import React from 'react';
import OktaAuth from '@okta/okta-auth-js'; // This is the base library for doing things like signing in using the Okta application you created previously
import { withAuth } from '@okta/okta-react';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

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
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  alignCenter: {
    textAlign: 'center',
  }
});

// Using the withAuth higher-order component from Okta’s React SDK to wrap the entire login form.
// This adds a prop to the component called auth, making it possible to access things like the isAuthenticated and redirect functions on that higher-order component.
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      username: '',
      password: ''
    };

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth
      .signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res =>
        this.setState({
          sessionToken: res.sessionToken
        })
      )
      .catch(err => {
        this.setState({ error: err.message });
        console.log(err.statusCode + ' error', err);
      });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { classes } = this.props;

    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <span className="error-message">{this.state.error}</span>
    ) : null;

    return (
      <form onSubmit={this.handleSubmit}>
        {errorMessage}
        <FormControl fullWidth className={classes.margin}>
          <InputLabel
            FormLabelClasses={{
              root: classes.cssLabel,
              focused: classes.cssFocused,
            }}
            htmlFor="username"
          >
            Username
          </InputLabel>
          <Input
            value={this.state.username}
            onChange={this.handleUsernameChange}
            classes={{
              underline: classes.cssUnderline,
            }}
            type="text"
            id="username"
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin}>
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
        <input
          className={classes.input}
          id="submit"
          type="submit"
          value="Submit"
        />
        <div className={classes.alignCenter}>
          <label htmlFor="submit">
            <Button component="span" className={classes.button}>
              Submit
            </Button>
          </label>
        </div>
      </form>
    );
  }
}

export default withAuth(withStyles(styles)(LoginForm));
