// @flow
import type { Counter, CounterAction } from '../../../reducers/counterGrid/types';

export type TableHeadRowProps = {
  classes: {
    [props: string]: any,
  },
  counters: Array<Counter>,
  actions: Array<CounterAction>,
  handleColumnCheck: Function,
  handleColumnCheckReverse: Function,
};
