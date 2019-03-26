// @flow
import initialState, {
  type Store as StoreType,
} from '../../store/initialState';

type FooAction = { type: 'FOO', foo: boolean };
type BarAction = { type: 'BAR', bar: boolean };

type Action = FooAction | BarAction;

export const maps = (state: StoreType = initialState, action: Action): StoreType => {
  switch (action.type) {
    default:
      return state;
  }
};

export const map = (state: StoreType = initialState, action: Action): StoreType => {
  switch (action.type) {
    default:
      return state;
  }
};

export const app = (state: StoreType = initialState, action: Action): StoreType => {
  switch (action.type) {
    default:
      return state;
  }
};

export const scopedObjects = (state: StoreType = initialState, action: Action): StoreType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default {
  maps,
  map,
  app,
  scopedObjects,
};
