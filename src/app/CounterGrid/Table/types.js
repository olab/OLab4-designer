// @flow
import type { CounterGridNode, Counter, CounterActions } from '../../reducers/counterGrid/types';

export type CounterGridTableProps = {
  classes: {
    [props: string]: any,
  },
  nodes: Array<CounterGridNode>,
  counters: Array<Counter>,
  actions: Array<CounterActions>,
};

export type CounterGridTableState = {
  countersValues: Array<Array<Counter>>,
};
