// @flow
import initialState from '../../store/initialState';
import type { Store } from '../../store/initialState';


type FooAction = { type: 'FOO', foo: boolean };
type BarAction = { type: 'BAR', bar: boolean };

type Action = FooAction | BarAction;

export const constructor = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export const maps = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export const map = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export const nodes = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export const node = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export const app = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export const scopedObjects = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
    default:
      return state;
  }
};

export default {
  constructor,
  maps,
  map,
  nodes,
  node,
  app,
  scopedObjects,
};
