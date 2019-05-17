import {
  maps,
  app,
  scopedObjects,
} from '../app/reducers';

import user from '../app/Login/reducer';
import modals from '../app/Modals/reducer';
import constructor from '../app/Constructor/reducer';
import map from '../app/reducers/map/reducer';

export default {
  user,
  constructor,
  maps,
  map,
  app,
  scopedObjects,
  modals,
};
