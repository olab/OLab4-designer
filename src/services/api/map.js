import createInstance from '../createCustomInstance';
import { mapFromServer } from '../../helpers/applyAPIMapping';

const API = createInstance();

export const createMap = templateId => API
  .post('/olab/maps', {
    template_id: templateId || null,
  })
  .then(({ data: { data: map } }) => mapFromServer(map))
  .catch((error) => {
    throw error;
  });

export default {
  createMap,
};
