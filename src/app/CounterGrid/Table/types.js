// @flow
import type { CounterGridNode, Counter, CounterAction } from '../../reducers/counterGrid/types';

export type CounterValue = {
  expression: string | null,
  isVisible: boolean,
};

export type CounterGridTableProps = {
  classes: {
    [props: string]: any,
  },
  nodes: Array<CounterGridNode>,
  counters: Array<Counter>,
  actions: Array<CounterAction>,
};

export type CounterGridTableState = {
  countersValues: Array<Array<CounterValue>>,
};
