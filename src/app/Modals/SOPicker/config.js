import { SCOPE_LEVELS } from '../../config';

export const SO_TYPES = [
  'Questions', 'Constants', 'Counters', 'Files',
];

export const SO_LEVELS = [
  'All', ...SCOPE_LEVELS,
];

export const SO_ITEMS_LIMIT = 20;

export default {
  SO_TYPES,
  SO_LEVELS,
  SO_ITEMS_LIMIT,
};
