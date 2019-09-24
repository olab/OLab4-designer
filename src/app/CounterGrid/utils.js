// @flow
import type { CounterActions as Actions } from '../reducers/counterGrid/types';

export const parseSendingData = (
  countersValues: Array<Array<Actions>>,
): Array<Actions> => (
  countersValues.reduce(
    (arr: Array<Actions>, val: Actions): Array<Actions> => arr.concat(val),
    [],
  )
);

export default {
  parseSendingData,
};
