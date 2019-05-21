import createInstance from '../createCustomInstance';

const API = createInstance();

export const getTemplates = () => API
  .get('/templates')
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export const createTemplate = templateData => API
  .post(
    '/createTemplate',
    templateData,
  )
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export default {
  getTemplates,
  createTemplate,
};
