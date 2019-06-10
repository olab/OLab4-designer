import { maps, app } from '../app/reducers';

import user from '../app/Login/reducer';
import modals from '../app/Modals/reducer';
import constructor from '../app/Constructor/reducer';
import map from '../app/reducers/map/reducer';
import templates from '../app/reducers/templates/reducer';
import scopedObjects from '../app/reducers/scopedObjects/reducer';

export default {
  user,
  constructor,
  maps,
  map,
  app,
  scopedObjects,
  modals,
  templates,
};
