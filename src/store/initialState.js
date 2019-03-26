// @flow
import { initialUserState } from '../app/Login/reducer';
import { initialConstructorState } from '../app/Constructor/reducer';

import type { Constructor as ConstructorType } from '../app/Constructor/types';
import type { User as UserType } from '../app/Login/types';

export type Map = {
  id: number | null,
  name: string,
  abstract: string,
  keywords: string,
  enabled: boolean,
};

export type App = {
  loadingState: Array<{
    id: string,
    isLoading: boolean,
  }>,
};

export type ScopedObjects = Array<{
  id: number,
  name: string,
  type: string,
}>;

export type Store = {
  user: UserType,
  constructor: ConstructorType,
  maps: Array<Map>,
  map: Map,
  app: App,
  scopedObjects: ScopedObjects,
};

const initialState: Store = {
  user: initialUserState,
  constructor: initialConstructorState,
  maps: [],
  map: {
    id: null,
    name: '',
    abstract: '',
    keywords: '',
    enabled: false,
  },
  app: {
    loadingState: [],
  },
  scopedObjects: [],
};

export default initialState;
