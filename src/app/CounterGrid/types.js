// @flow
import type { Counter, CounterActions } from '../reducers/counterGrid/types';

export type CounterGridProps = {
  classes: {
    [props: string]: any,
  },
  mapId: string,
  match: any,
  nodes: Array<Node>,
  counters: Array<Counter>,
  actions: Array<CounterActions>,
  isFetching: boolean,
  ACTION_UPDATE_COUNTER_GRID_REQUESTED: Function,
  ACTION_GET_COUNTER_GRID_REQUESTED: Function,
  ACTION_CLEAR: Function,
};
