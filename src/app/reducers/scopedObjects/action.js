// @flow
import {
  type ScopedObjects as ScopedObjectsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
} from './types';

export const ACTION_SCOPED_OBJECTS_SUCCEEDED = (scopedObjectsData: ScopedObjectsType) => ({
  type: SCOPED_OBJECTS_SUCCEEDED,
  scopedObjectsData,
});

export const ACTION_SCOPED_OBJECTS_FAILED = () => ({
  type: SCOPED_OBJECTS_FAILED,
});

export const ACTION_SCOPED_OBJECTS_REQUESTED = () => ({
  type: SCOPED_OBJECTS_REQUESTED,
});
