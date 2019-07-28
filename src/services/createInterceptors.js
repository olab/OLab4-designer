import store from '../store/store';
import { ACTION_USER_AUTH_LOGOUT } from '../app/Login/action';

/**
 * Handle the 401 Auth error
 * Remove stored token from local storage
 *
 * @param {Error} error
 * @throws error
 */
const authResponseRejectInterceptor = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    store.dispatch(ACTION_USER_AUTH_LOGOUT());
  }

  throw error;
};

/**
 * Handle response specific errors, when HTTP status returns 200
 *
 * @param {Object} response
 * @returns {Object}
 * @throws Error
 */
const errorSpecificResponseInterceptor = (response) => {
  const { data: { error_code: errorCode, message } } = response;
  if (errorCode > 400) {
    throw new Error(message);
  }

  return response;
};

/**
 * Set bearer token to headers
 *
 * @param {Object} config
 * @returns {Object}
 */
const setAuthTokenRequestInterceptor = (config) => {
  const token = localStorage.getItem('token');
  if (token != null) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
};

const addInterceptors = (instance) => {
  /**
   * Request Interceptors
   */
  instance.interceptors.request.use(setAuthTokenRequestInterceptor, (error) => { throw error; });

  /**
   * Response Interceptors
   */
  instance.interceptors.response.use(
    errorSpecificResponseInterceptor,
    authResponseRejectInterceptor,
  );

  return instance;
};

export default addInterceptors;
