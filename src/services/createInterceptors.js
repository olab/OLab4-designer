import store from '../store/store';
import { ACTION_USER_AUTH_LOGOUT } from '../app/Login/action';

const addInterceptors = (instance) => {
  instance.interceptors.response.use(response => response, (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      store.dispatch(ACTION_USER_AUTH_LOGOUT());
    }

    throw error;
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token != null) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => { throw error; });

  return instance;
};

export default addInterceptors;
