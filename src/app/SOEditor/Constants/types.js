// @flow
import type {
  ScopedObject as ScopedObjectType,
  ScopedObjectBase as ScopedObjectBaseType,
} from '../../reducers/scopedObjects/types';
import type {
  ScopeLevels as ScopeLevelsType,
} from '../../reducers/scopeLevels/types';

export type IConstantsProps = {
  classes: {
    [props: string]: any,
  },
  match: any,
  history: any,
  constants: Array<ScopedObjectType>,
  scopeLevels: ScopeLevelsType,
  isConstantCreating: boolean,
  isConstantUpdating: boolean,
  ACTION_SCOPE_LEVELS_REQUESTED: Function,
  ACTION_CONSTANT_CREATE_REQUESTED: Function,
  ACTION_CONSTANT_DETAILS_REQUESTED: Function,
  ACTION_CONSTANT_UPDATE_REQUESTED: Function,
};

export type Icons = {
  iconEven: any,
  iconOdd: any,
};

export type IConstantsState = {
  ...ScopedObjectBaseType,
  isShowModal: boolean,
  isFieldsDisabled: boolean,
};
