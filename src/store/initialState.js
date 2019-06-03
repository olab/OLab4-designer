// @flow
import { initialUserState } from '../app/Login/reducer';
import { initialModalsState } from '../app/Modals/reducer';
import { initialConstructorState } from '../app/Constructor/reducer';
import { initialMapState } from '../app/reducers/map/reducer';
import { initialTemplatesState } from '../app/reducers/templates/reducer';

import type { User as UserType } from '../app/Login/types';
import type { Modals as ModalsType } from '../app/Modals/types';
import type { Constructor as ConstructorType } from '../app/Constructor/types';
import type { Map as MapType } from '../app/reducers/map/types';
import type { Templates as TemplatesType } from '../app/reducers/templates/types';

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
  map: MapType,
  maps: Array<MapType>,
  templates: TemplatesType,
  app: App,
  scopedObjects: ScopedObjects,
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
  scopedObjects: [],
  modals: initialModalsState,
};

export default initialState;
