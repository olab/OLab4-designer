import createInstance from '../createCustomInstance';

const API = createInstance();

export const getScopedObjects = () => API
  .get('/olab/scopedObjects')
  .then(({ data: { data: scopedObjects } }) => scopedObjects)
  .catch((error) => {
    throw error;
  });

export default {
  getScopedObjects,
};
