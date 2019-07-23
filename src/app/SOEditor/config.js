import { SCOPED_OBJECTS } from '../config';

import Constants from './Constants';
import Counters from './Counters';
import Questions from './Questions';

export const EDITORS_FIELDS = {
  NAME: 'Name',
  DESCRIPTION: 'Description',
  TEXT: 'Text',
  SCOPE_LEVEL: 'Scope Level',
  PARENT: 'Parent',
  STARTING_VALUE: 'Starting value (optional)',
  VISIBLE: 'Visible',
  COUNTER_STATUS: 'Counter status',
  STEM: 'Stem',
  QUESTION_TYPES: 'Question Types',
  WIDTH: 'Width',
  HEIGHT: 'Height',
  PLACEHOLDER: 'Placeholder',
  LAYOUT_TYPE: 'Layout Type',
  FEEDBACK: 'Feedback',
  SHOW_ANSWER: 'Show Answer',
  SHOW_SUBMIT: 'Show Submit',
};

export const SCOPED_OBJECTS_MAPPING = {
  [SCOPED_OBJECTS.CONSTANT.toLowerCase()]: Constants,
  [SCOPED_OBJECTS.COUNTER.toLowerCase()]: Counters,
  [SCOPED_OBJECTS.QUESTION.toLowerCase()]: Questions,
};
