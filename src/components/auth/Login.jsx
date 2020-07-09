import React, { useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import jwtDecode from 'jwt-decode';
import Loader from 'react-loader-spinner';
import { ActionsContext } from '../../contexts/ActionsContext';
import { useForm } from '../../hooks/useForm';
import Logo from '../../assets/EmergencyElectricLogo.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  notice: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  reset: {
    margin: theme.spacing(1, 0, 2),
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: theme.spacing(1),
  },
  title: {
    textAlign: 'center',
  },
}));

function Login({ register, history: { push } }) {
  const { errors, isLoading, token } = useSelector((state) => state.auth);
  const classes = useStyles();
  const actions = useContext(ActionsContext);
  const [values, change, submit, reset] = useForm(
    {
      username: '',
      password: '',
      confirmPassword: '',
    },
    doLogin,
  );

  useEffect(() => {
    const checkToken = JSON.parse(localStorage.getItem('ee_token'));
    if (checkToken) {
      const decodedToken = jwtDecode(checkToken);
      const currentDate = Date.now() / 1000;
      if (decodedToken.exp > currentDate) {
        actions.auth.welcomeBack(checkToken);
      } else {
        actions.auth.logout();
      }
    }
  }, [actions.auth]);

  useEffect(() => {
    if (token !== null) {
      push('/dashboard');
    }
  }, [token, push]);

  function doLogin() {
    const { username, password } = values;
    register
      ? actions.auth.register(values)
      : actions.auth.login({ username, password });
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <img
          src={Logo}
          alt="Emergency Electric Logo"
          className={classes.image}
        />
        <Paper className={classes.notice}>
          <Typography color="primary" className={classes.title}>
            Please Login or Register to Continue...
          </Typography>
        </Paper>

        <Avatar className={classes.avatar}>
          <AccountCircleSharpIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {register ? 'Register' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <TextField
            error={Boolean(errors && errors.data && errors.data.username)}
            helperText={errors && errors.data && errors.data.username}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={values.username}
            onChange={change}
            autoFocus
          />
          <TextField
            error={Boolean(errors && errors.data && errors.data.password)}
            helperText={errors && errors.data && errors.data.password}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={values.password}
            onChange={change}
          />
          {register && (
            <TextField
              error={Boolean(
                errors && errors.data && errors.data.confirmPassword,
              )}
              helperText={errors && errors.data && errors.data.confirmPassword}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={change}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submit}
          >
            {isLoading ? (
              <Loader type="ThreeDots" color="#670300" height={20} width={20} />
            ) : register ? (
              'Sign Up'
            ) : (
              'Sign In'
            )}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="inherit"
            onClick={reset}
            className={classes.reset}
          >
            Reset
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link
              component={RouterLink}
              to={register ? '/login' : '/register'}
              variant="body2"
            >
              {register
                ? `Have an account?  Click here to Login`
                : `Don't have an account? Click here to register.`}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
