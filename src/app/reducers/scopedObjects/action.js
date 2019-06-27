// @flow
import cloneDeep from 'lodash.clonedeep';
import store from '../../../store/store';

import {
  type ScopedObjects as ScopedObjectsType,
  type ScopedObjectDetails as ScopedObjectDetailsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
  SCOPED_OBJECT_DETAILS_FAILED,
  SCOPED_OBJECT_DETAILS_SUCCEEDED,
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
  const clonedScopedObjects = cloneDeep(scopedObjects[scopedObjectType]);
  const scopedObject = clonedScopedObjects.find(({ id }) => id === scopedObjectId);

  scopedObject.isDetailsFetching = true;

  return {
    type: SCOPED_OBJECT_DETAILS_REQUESTED,
    scopedObjectId,
    scopedObjectType,
    scopedObjects: clonedScopedObjects,
  };
};

export const ACTION_SCOPED_OBJECT_DETAILS_FAILED = (
  scopedObjectId: number,
  scopedObjectType: string,
) => {
  const { scopedObjects: { data: scopedObjects } } = store.getState();
  const clonedScopedObjects = cloneDeep(scopedObjects[scopedObjectType]);
  const scopedObject = clonedScopedObjects.find(({ id }) => id === scopedObjectId);

  scopedObject.isDetailsFetching = false;

  return {
    type: SCOPED_OBJECT_DETAILS_FAILED,
    scopedObjectType,
    scopedObjects: clonedScopedObjects,
  };
};

export const ACTION_SCOPED_OBJECT_DETAILS_SUCCEEDED = (
  scopedObjectId: number,
  scopedObjectType: string,
  scopedObjectDetails: ScopedObjectDetailsType,
) => {
  const { scopedObjects: { data: scopedObjects } } = store.getState();
  const clonedScopedObjects = cloneDeep(scopedObjects[scopedObjectType]);
  const scopedObject = clonedScopedObjects.find(({ id }) => id === scopedObjectId);

  scopedObject.isDetailsFetching = false;
  scopedObject.details = scopedObjectDetails;

  return {
    type: SCOPED_OBJECT_DETAILS_SUCCEEDED,
    scopedObjectType,
    scopedObjects: clonedScopedObjects,
  };
};
