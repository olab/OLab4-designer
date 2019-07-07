// @flow
export type UserLoginData = {
  username: string,
  password: string,
};

export type UserData = {
  id: number | null,
  name: string,
  username: string,
};

export type AuthData = {
  token: string,
};

export type User = {
  isAuth: boolean,
  data: UserData,
  authData: AuthData,
  isFetching: boolean,
};

export type ILoginProps = {
  classes: {
    [props: string]: any,
  },
  handleChange: (e: Event) => void,
  isAuth: boolean,
  isFetching: boolean,
  values: UserLoginData,
};

export type PropsAuthAction = {
  props: {
    ACTION_USER_AUTH_REQUESTED: ({ username: string, password: string }) => void,
  },
};

const USER_AUTH_SUCCEEDED = 'USER_AUTH_SUCCEEDED';
type UserAuthActionSucceeded = {
  type: 'USER_AUTH_SUCCEEDED',
  token: string,
};

const USER_AUTH_FAILED = 'USER_AUTH_FAILED';
type UserAuthActionFailed = {
  type: 'USER_AUTH_FAILED',
};

const USER_AUTH_REQUESTED = 'USER_AUTH_REQUESTED';
type UserAuthActionRequested = {
  type: 'USER_AUTH_REQUESTED'
};

const USER_AUTH_LOGOUT = 'USER_AUTH_LOGOUT';
type UserAuthLogout = {
  type: 'USER_AUTH_LOGOUT',
}

export type UserActions = UserAuthActionSucceeded |
  UserAuthActionFailed | UserAuthActionRequested | UserAuthLogout;

export {
  USER_AUTH_FAILED,
  USER_AUTH_REQUESTED,
  USER_AUTH_SUCCEEDED,
  USER_AUTH_LOGOUT,
};
