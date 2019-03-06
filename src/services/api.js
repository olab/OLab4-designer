import createInstance from './createCustomInstance';


const olabAPI = createInstance();

export const postUser = userLoginData => olabAPI
  .post('/auth/client', userLoginData)
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export default {
  postUser,
};
