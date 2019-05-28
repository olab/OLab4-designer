import createInstance from '../createCustomInstance';
import { mapFromServer } from '../../helpers/applyAPIMapping';

const createAPI = token => createInstance({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createMap = (token, templateId) => createAPI(token)
  .post('/olab/maps', {
    map_id: templateId || null,
  })
  .then(({ data: { data: map } }) => mapFromServer(map))
  .catch((error) => {
    throw error;
  });

export default {
  createMap,
};
