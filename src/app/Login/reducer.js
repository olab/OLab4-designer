// @flow
import {
  type UserActions,
  type User as UserType,
  USER_AUTH_FAILED,
  USER_AUTH_SUCCEEDED,
  USER_AUTH_REQUESTED,
} from './types';

export const initialUserState: UserType = {
  isAuth: false,
  errorMessage: '',
  data: {
    id: null,
    name: '',
    username: '',
  },
  authData: {
    token: '',
  },
  isFetching: false,
};

const user = (state: UserType = initialUserState, action: UserActions) => {
  switch (action.type) {
    case USER_AUTH_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };

    case USER_AUTH_SUCCEEDED:
      return {
        ...state,
        isAuth: true,
        isFetching: false,
        authData: {
          token: action.token,
        },
      };

    case USER_AUTH_FAILED:
      return {
        ...state,
        isAuth: false,
        isFetching: false,
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
};

export default user;
