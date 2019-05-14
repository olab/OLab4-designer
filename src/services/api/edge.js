import createInstance from '../createCustomInstance';
import { edgeToServer } from '../../helpers/applyAPIMapping';

const API = createInstance();

export const getEdge = ({ mapId, nodeId, edgeId }) => API
  .get(`/olab/maps/${mapId}/nodes/${nodeId}/links/${edgeId}`)
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export const createEdge = (mapId, edgeData) => API
  .post(
    `/olab/maps/${mapId}/nodes/${edgeData.source}/links`,
    edgeToServer(edgeData),
  )
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export const updateEdge = (mapId, updatedEdgeData) => API
  .put(
    `/olab/maps/${mapId}/nodes/${updatedEdgeData.source}/links/${updatedEdgeData.id}`,
    edgeToServer(updatedEdgeData),
  )
  .then(({ data }) => data)
  .catch((error) => {
    throw error;
  });

export default {
  getEdge,
  createEdge,
  updateEdge,
};
