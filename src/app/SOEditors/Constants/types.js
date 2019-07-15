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
  history: any,
  constants: Array<ScopedObjectType>,
  scopeLevels: ScopeLevelsType,
  isConstantCreating: boolean,
  ACTION_SCOPED_OBJECT_CREATE_REQUESTED: Function,
  ACTION_SCOPE_LEVELS_REQUESTED: Function,
  ACTION_SCOPE_LEVELS_CLEAR: Function,
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
