// @flow
import {
  type ScopedObjectsActions,
  type ScopedObjectsState as ScopedObjectsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_FULFILLED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
  SCOPED_OBJECT_CREATE_REQUESTED,
  SCOPED_OBJECT_CREATE_SUCCEEDED,
  SCOPED_OBJECT_CREATE_FAILED,
} from './types';

export const initialScopedObjectsState: ScopedObjectsType = {
  data: {
    questions: [],
    constants: [],
    counters: [],
    files: [],
  },
  isFetching: false,
  isCreating: false,
};

const scopedObjects = (
  state: ScopedObjectsType = initialScopedObjectsState,
  action: ScopedObjectsActions,
) => {
  switch (action.type) {
    case SCOPED_OBJECTS_SUCCEEDED: {
      const { data, ...restState } = state;
      const { scopedObjectsData } = action;

      return {
        ...restState,
        data: {
          ...data,
          ...scopedObjectsData,
        },
        isFetching: false,
      };
    }
    case SCOPED_OBJECTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case SCOPED_OBJECTS_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case SCOPED_OBJECT_DETAILS_FULFILLED:
    case SCOPED_OBJECT_DETAILS_REQUESTED: {
      const { data, ...restState } = state;
      const { scopedObjectType, scopedObjectIndex, scopedObject } = action;

      return {
        ...restState,
        data: {
          ...data,
          [scopedObjectType]: [
            ...data[scopedObjectType].slice(0, scopedObjectIndex),
            ...data[scopedObjectType].slice(scopedObjectIndex + 1),
            scopedObject,
          ],
        },
        isFetching: false,
      };
    }
    case SCOPED_OBJECT_CREATE_REQUESTED:
      return {
        ...state,
        isCreating: true,
      };
    case SCOPED_OBJECT_CREATE_SUCCEEDED: {
      const { data, ...restState } = state;
      const { scopedObjectId, scopedObjectType, scopedObjectData } = action;

      return {
        ...restState,
        data: {
          ...data,
          [scopedObjectType]: [
            ...data[scopedObjectType],
            {
              id: scopedObjectId,
              ...scopedObjectData,
            },
          ],
        },
        isCreating: false,
      };
    }
    case SCOPED_OBJECT_CREATE_FAILED:
      return {
        ...state,
        isCreating: false,
      };
    default:
      return state;
  }
};

export default scopedObjects;
