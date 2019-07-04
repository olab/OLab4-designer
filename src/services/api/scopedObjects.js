import createInstance from '../createCustomInstance';
import {
  scopedObjectFromServer, scopedObjectDetailsFromServer,
} from '../../helpers/applyAPIMapping';

const API = createInstance();

export const getScopedObjects = mapId => API
  .get(`/olab/maps/${mapId}/scopedobjects`)
  .then(({ data: { data: scopedObjects } }) => Object.keys(scopedObjects)
    .reduce((scopedObjectsNew, key) => {
      scopedObjectsNew[key] = scopedObjects[key]
        .map(SO => scopedObjectFromServer(SO));

      return scopedObjectsNew;
    }, {}))
  .catch((error) => {
    throw error;
  });

export const getScopedObjectDetails = (scopedObjectId, scopedObjectType) => API
  .get(`/olab/${scopedObjectType}/${scopedObjectId}`)
  .then(({
    data: { data: scopedObjectDetails },
  }) => scopedObjectDetailsFromServer(scopedObjectDetails))
  .catch((error) => {
    throw error;
  });

export const createScopedObject = (mapId, scopedObjectType, scopedObjectData) => API
  .post(`/olab/${scopedObjectType}`, {
    data: {
      ...scopedObjectData,
      parentId: mapId,
    },
  })
  .then(({ data: { data: { id: scopedObjectId } } }) => scopedObjectId)
  .catch((error) => {
    throw error;
  });

export const editScopedObject = (scopedObjectId, scopedObjectType, editedScopedObjectData) => API
  .put(`/olab/${scopedObjectType}/${scopedObjectId}`, {
    data: {
      ...editedScopedObjectData,
    },
  })
  .catch((error) => {
    throw error;
  });

export const deleteScopedObject = (scopedObjectId, scopedObjectType) => API
  .delete(`/olab/${scopedObjectType}/${scopedObjectId}`)
  .catch((error) => {
    throw error;
  });
