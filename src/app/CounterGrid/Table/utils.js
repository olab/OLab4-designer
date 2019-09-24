// @flow
import type { CounterActions as Actions } from '../../reducers/counterGrid/types';

export const getAction = (
  nodeId: number,
  counterId: number,
  actions: Array<Actions>,
): Actions => ({
  ...actions.find(
    item => item.nodeId === nodeId && item.counterId === counterId,
  ),
});

export const getColumnVisibilityValues = (i: number, actions: Array<Actions>): boolean => (
  actions.every(item => item[i].isVisible)
);
