// @flow
import { initialUserState } from '../app/Login/reducer';
import { initialModalsState } from '../app/Modals/reducer';
import { initialConstructorState } from '../app/Constructor/reducer';
import { initialMapState } from '../app/reducers/map/reducer';
import { initialTemplatesState } from '../app/reducers/templates/reducer';
import { initialScopedObjectsState } from '../app/reducers/scopedObjects/reducer';

import type { User as UserType } from '../app/Login/types';
import type { Modals as ModalsType } from '../app/Modals/types';
import type { Constructor as ConstructorType } from '../app/Constructor/types';
import type { Map as MapType } from '../app/reducers/map/types';
import type { Templates as TemplatesType } from '../app/reducers/templates/types';
import type { ScopedObjectsState as ScopedObjectsType } from '../app/reducers/scopedObjects/types';

export type App = {
  loadingState: Array<{
    id: string,
    isLoading: boolean,
  }>,
};

export type Store = {
  user: UserType,
  constructor: ConstructorType,
  map: MapType,
  maps: Array<MapType>,
  templates: TemplatesType,
  app: App,
  scopedObjects: ScopedObjectsType,
  modals: ModalsType,
};

const initialState: Store = {
  user: initialUserState,
  constructor: initialConstructorState,
  map: initialMapState,
  maps: [],
  templates: initialTemplatesState,
  app: {
    loadingState: [],
  },
  scopedObjects: initialScopedObjectsState,
  modals: initialModalsState,
};

export default initialState;
