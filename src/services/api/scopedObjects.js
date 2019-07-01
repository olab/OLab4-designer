import createInstance from '../createCustomInstance';

const API = createInstance();

export const getScopedObjects = mapId => API
  .get(`/olab/scopedObjects/${mapId}`)
  .then(({ data: { data: scopedObjects } }) => scopedObjects)
  .catch((error) => {
    throw error;
  });

export default {
  getScopedObjects,
};
