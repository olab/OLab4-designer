// @flow
import { USER_AUTH_REQUESTED } from './types';
import type { UserLoginData } from './types';


const authorizeUser = (userLoginData: UserLoginData) => ({
  type: USER_AUTH_REQUESTED,
  userLoginData,
});

export default authorizeUser;
