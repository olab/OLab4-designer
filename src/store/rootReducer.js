import user from '../app/Login/reducer';
import modals from '../app/Modals/reducer';
import constructor from '../app/Constructor/reducer';
import map from '../app/reducers/map/reducer';
import templates from '../app/reducers/templates/reducer';
import scopedObjects from '../app/reducers/scopedObjects/reducer';
import defaults from '../app/reducers/defaults/reducer';
import scopeLevels from '../app/reducers/scopeLevels/reducer';
import counterGrid from '../app/reducers/counterGrid/reducer';

export default {
  user,
  constructor,
  map,
  modals,
  templates,
  defaults,
  scopedObjects,
  scopeLevels,
  counterGrid,
};
