// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withFormik, Form } from 'formik';
import {
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  Paper,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import authorizeUser from './action';
import type { UserLoginData, Props, PropsAuthAction } from './types';
import styles from './styles';


const Login = ({
  classes, isAuth, values, handleChange, errorMessage, isFetching,
}: Props) => {
  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              name="username"
              type="username"
              id="username"
              value={values.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </Form>
        {errorMessage && <p>{errorMessage}</p>}
      </Paper>
      {isFetching && <CircularProgress className={classes.progress} />}
    </main>
  );
};

const loginFormikWrapper = withFormik({
  mapPropsToValues: ({ username = '', password = '' }: UserLoginData) => ({
    username,
    password,
  }),
  handleSubmit: (values: UserLoginData, { props: { authorize } }: PropsAuthAction) => {
    authorize(values);
  },
})(Login);

const mapDispatchToProps = dispatch => ({
  authorize: (userLoginData: UserLoginData) => {
    dispatch(authorizeUser(userLoginData));
  },
});

const mapStateToProps = ({ user: { isAuth, errorMessage, isFetching } }) => ({
  isAuth,
  errorMessage,
  isFetching,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(loginFormikWrapper));
