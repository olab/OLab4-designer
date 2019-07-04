// @flow
import type { ScopedObject as ScopedObjectType } from '../../reducers/scopedObjects/types';

export type IConstantsProps = {
  classes: {
    [props: string]: any,
  },
  history: any,
  constants: Array<ScopedObjectType>,
  isConstantCreating: boolean,
  ACTION_SCOPED_OBJECT_CREATE_REQUESTED: Function,
};

export type IConstantsState = {
  name: string,
  description: string,
  value: string,
  scopeLevel: string,
};
