import createInstance from '../createCustomInstance';
import { mapFromServer } from '../../helpers/applyAPIMapping';

const createAPI = createInstance();

export const createMap = templateId => createAPI
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
