// @flow
import type { UserActions } from './types';
import { USER_AUTH_FAILED, USER_AUTH_SUCCEEDED, USER_AUTH_REQUESTED } from './types';
import type { Store } from '../../../store/initialState';
import initialState from '../../../store/initialState';


const user = (state: Store = initialState, action: UserActions) => {
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
