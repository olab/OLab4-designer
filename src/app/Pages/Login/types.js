// @flow
export type UserLoginData = {
  username: string,
  password: string,
};

export type Props = {
  classes: {
    main: {},
    paper: {},
    avatar: {},
    form: {},
    submit: {},
    progress: {},
  },
  handleChange: (e: Event) => void,
  isAuth: boolean,
  errorMessage: string,
  isFetching: boolean,
  values: UserLoginData,
};

export type PropsAuthAction = {
  props: {
    authorize: ({ username: string, password: string }) => void,
  },
};

// reducer types
const USER_AUTH_SUCCEEDED = 'USER_AUTH_SUCCEEDED';
type UserAuthActionSucceeded = {
  type: 'USER_AUTH_SUCCEEDED',
  token: string,
};

const USER_AUTH_FAILED = 'USER_AUTH_FAILED';
type UserAuthActionFailed = {
  type: 'USER_AUTH_FAILED',
  errorMessage: string,
}; // temporary

const USER_AUTH_REQUESTED = 'USER_AUTH_REQUESTED';
type UserAuthActionRequested = {
  type: 'USER_AUTH_REQUESTED'
};

export type UserActions = UserAuthActionSucceeded | UserAuthActionFailed | UserAuthActionRequested;

export { USER_AUTH_FAILED, USER_AUTH_REQUESTED, USER_AUTH_SUCCEEDED };
