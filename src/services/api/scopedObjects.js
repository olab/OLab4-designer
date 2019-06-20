import createInstance from '../createCustomInstance';

const API = createInstance();

export const getScopedObjects = mapId => API
  .get(`/olab/maps/${mapId}/scopedobjects`)
  .then(({ data: { data: scopedObjects } }) => scopedObjects)
  .catch((error) => {
    throw error;
  });

export default {
  getScopedObjects,
};
