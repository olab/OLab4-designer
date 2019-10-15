// @flow
import type { Counter, CounterActions } from '../../../reducers/counterGrid/types';

export type TableHeadRowProps = {
  classes: {
    [props: string]: any,
  },
  counters: Array<Counter>,
  actions: Array<CounterActions>,
  handleColumnCheck: Function,
  handleColumnCheckReverse: Function,
};
