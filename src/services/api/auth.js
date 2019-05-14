import createInstance from '../createCustomInstance';

const API = createInstance();

export const postUser = userLoginData => API
  .post(
    '/auth/client',
    userLoginData,
  )
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export default {
  postUser,
};
