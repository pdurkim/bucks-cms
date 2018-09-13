import React from 'react';
import OktaAuth from '@okta/okta-auth-js'; // This is the base library for doing things like signing in using the Okta application you created previously
import { withAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
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

  render () {
    const { classes } = this.props;

    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <span className="error-message">{this.state.error}</span>
    ) : null;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form onSubmit={this.handleSubmit}>
              {errorMessage}
              <FormControl margin="normal" required fullWidth>
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
                Sign in
              </Button>
              <Button
                component={Link}
                to='/register'
                fullWidth
                variant="raised"
                color="secondary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withAuth(withStyles(styles)(LoginForm));
