// @flow
import store from '../../../store/store';

import {
  type ScopedObject as ScopedObjectType,
  type ScopedObjects as ScopedObjectsType,
  type ScopedObjectBase as ScopedObjectBaseType,
  type ScopedObjectDetails as ScopedObjectDetailsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
  SCOPED_OBJECT_DETAILS_FULFILLED,
  SCOPED_OBJECT_CREATE_REQUESTED,
  SCOPED_OBJECT_CREATE_SUCCEEDED,
  SCOPED_OBJECT_CREATE_FAILED,
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

export const ACTION_SCOPED_OBJECT_DETAILS_REQUESTED = (
  scopedObjectId: number,
  scopedObjectType: string,
) => {
  const { scopedObjects: { data: scopedObjects } } = store.getState();
  const scopedObjectsList = scopedObjects[scopedObjectType];
  const scopedObjectIndex = scopedObjectsList.findIndex(({ id }) => id === scopedObjectId);
  const clonedScopedObject = { ...scopedObjectsList[scopedObjectIndex] };

  clonedScopedObject.isDetailsFetching = true;

  return {
    type: SCOPED_OBJECT_DETAILS_REQUESTED,
    scopedObjectId,
    scopedObjectType,
    scopedObjectIndex,
    scopedObject: clonedScopedObject,
  };
};

export const ACTION_SCOPED_OBJECT_DETAILS_FAILED = (
  scopedObjectId: number,
  scopedObjectType: string,
) => {
  const { scopedObjects: { data: scopedObjects } } = store.getState();
  const scopedObjectsList = scopedObjects[scopedObjectType];
  const scopedObjectIndex = scopedObjectsList.findIndex(({ id }) => id === scopedObjectId);
  const clonedScopedObject = { ...scopedObjectsList[scopedObjectIndex] };

  clonedScopedObject.isDetailsFetching = false;

  return {
    type: SCOPED_OBJECT_DETAILS_FULFILLED,
    scopedObjectType,
    scopedObjectIndex,
    scopedObject: clonedScopedObject,
  };
};

export const ACTION_SCOPED_OBJECT_DETAILS_SUCCEEDED = (
  scopedObjectId: number,
  scopedObjectType: string,
  scopedObjectDetails: ScopedObjectDetailsType,
) => {
  const { scopedObjects: { data: scopedObjects } } = store.getState();
  const scopedObjectsList = scopedObjects[scopedObjectType];
  const scopedObjectIndex = scopedObjectsList.findIndex(({ id }) => id === scopedObjectId);
  const clonedScopedObject = {
    ...scopedObjectsList[scopedObjectIndex],
    scopedObjectDetails,
  };

  return {
    type: SCOPED_OBJECT_DETAILS_FULFILLED,
    scopedObjectType,
    scopedObjectIndex,
    scopedObject: clonedScopedObject,
  };
};

export const ACTION_SCOPED_OBJECT_CREATE_REQUESTED = (
  scopedObjectType: string,
  scopedObjectData: ScopedObjectBaseType,
) => ({
  type: SCOPED_OBJECT_CREATE_REQUESTED,
  scopedObjectType,
  scopedObjectData,
});

export const ACTION_SCOPED_OBJECT_CREATE_SUCCEEDED = (
  scopedObjectId: number,
  scopedObjectType: string,
  scopedObjectData: ScopedObjectType,
) => ({
  type: SCOPED_OBJECT_CREATE_SUCCEEDED,
  scopedObjectId,
  scopedObjectType,
  scopedObjectData,
});

export const ACTION_SCOPED_OBJECT_CREATE_FAILED = () => ({
  type: SCOPED_OBJECT_CREATE_FAILED,
});
