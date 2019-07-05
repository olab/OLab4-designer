import createInstance from '../createCustomInstance';
import {
  mapFromServer, nodeFromServer, edgeFromServer,
} from '../../helpers/applyAPIMapping';

const API = createInstance();

export const getMap = mapId => API
  .get(`/olab/maps/${mapId}`)
  .then(({ data: { data: { map } } }) => mapFromServer(map))
  .catch((error) => {
    throw error;
  });

export const createMap = templateId => API
  .post('/olab/maps', {
    data: {
      ...(templateId && { templateId }),
    },
  })
  .then(({ data: { data: map } }) => mapFromServer(map))
  .catch((error) => {
    throw error;
  });

export const extendMap = (mapId, templateId) => API
  .post(`/olab/maps/${mapId}`, {
    data: {
      templateId,
    },
  })
  .then(({ data: { data: { nodes, links } } }) => ({
    extendedNodes: nodes.map(node => nodeFromServer(node)),
    extendedEdges: links.map(edge => edgeFromServer(edge)),
  }))
  .catch((error) => {
    throw error;
  });

export default {
  getMap,
  createMap,
  extendMap,
};
