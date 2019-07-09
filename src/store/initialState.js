// @flow
import { initialUserState } from '../app/Login/reducer';
import { initialModalsState } from '../app/Modals/reducer';
import { initialConstructorState } from '../app/Constructor/reducer';
import { initialMapState } from '../app/reducers/map/reducer';
import { initialDefaultsState } from '../app/reducers/defaults/reducer';
import { initialTemplatesState } from '../app/reducers/templates/reducer';
import { initialScopedObjectsState } from '../app/reducers/scopedObjects/reducer';

import type { User as UserType } from '../app/Login/types';
import type { Modals as ModalsType } from '../app/Modals/types';
import type { Constructor as ConstructorType } from '../app/Constructor/types';
import type { Map as MapType } from '../app/reducers/map/types';
import type { Defaults as DefaultsType } from '../app/reducers/defaults/types';
import type { Templates as TemplatesType } from '../app/reducers/templates/types';
import type { ScopedObjectsState as ScopedObjectsType } from '../app/reducers/scopedObjects/types';

export type Store = {
  user: UserType,
  constructor: ConstructorType,
  map: MapType,
  templates: TemplatesType,
  scopedObjects: ScopedObjectsType,
  modals: ModalsType,
  defaults: DefaultsType,
};

const initialState: Store = {
  user: initialUserState,
  constructor: initialConstructorState,
  map: initialMapState,
  templates: initialTemplatesState,
  scopedObjects: initialScopedObjectsState,
  modals: initialModalsState,
  defaults: initialDefaultsState,
};

export default initialState;
