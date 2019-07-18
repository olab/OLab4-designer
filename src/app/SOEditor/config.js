import { SCOPED_OBJECTS } from '../config';

import Constants from './Constants';
import Counters from './Counters';

export const EDITORS_FIELDS = {
  NAME: 'Name',
  DESCRIPTION: 'Description',
  TEXT: 'Text',
  SCOPE_LEVEL: 'Scope Level',
  PARENT: 'Parent',
  STARTING_VALUE: 'Starting value (optional)',
  VISIBLE: 'Visible',
  COUNTER_STATUS: 'Counter status',
};

export const SCOPED_OBJECTS_MAPPING = {
  [SCOPED_OBJECTS.CONSTANT.toLowerCase()]: Constants,
  [SCOPED_OBJECTS.COUNTER.toLowerCase()]: Counters,
};
