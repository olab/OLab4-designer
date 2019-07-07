// @flow
import store from '../../../store/store';

import {
  type ScopedObjects as ScopedObjectsType,
  type ScopedObjectDetails as ScopedObjectDetailsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
  SCOPED_OBJECT_DETAILS_FULFILLED,
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
  const clonedScopedObject = { ...scopedObjectsList[scopedObjectIndex] };

  clonedScopedObject.isDetailsFetching = false;
  clonedScopedObject.details = scopedObjectDetails;

  return {
    type: SCOPED_OBJECT_DETAILS_FULFILLED,
    scopedObjectType,
    scopedObjectIndex,
    scopedObject: clonedScopedObject,
  };
};
