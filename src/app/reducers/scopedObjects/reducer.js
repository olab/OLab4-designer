// @flow
import {
  type ScopedObjectsActions,
  type ScopedObjectsState as ScopedObjectsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_FAILED,
  SCOPED_OBJECT_DETAILS_SUCCEEDED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
} from './types';

export const initialScopedObjectsState: ScopedObjectsType = {
  data: {
    questions: [],
    constants: [],
    counters: [],
    files: [],
  },
  isFetching: false,
};

const scopedObjects = (
  state: ScopedObjectsType = initialScopedObjectsState,
  action: ScopedObjectsActions,
) => {
  switch (action.type) {
    case SCOPED_OBJECTS_SUCCEEDED: {
      const { scopedObjectsData } = action;

      return {
        data: {
          ...state.data,
          ...scopedObjectsData,
        },
        isFetching: false,
      };
    }
    case SCOPED_OBJECTS_REQUESTED:
      return {
        data: {
          ...state.data,
        },
        isFetching: true,
      };
    case SCOPED_OBJECTS_FAILED:
      return {
        data: {
          ...state.data,
        },
        isFetching: false,
      };
    case SCOPED_OBJECT_DETAILS_FAILED:
    case SCOPED_OBJECT_DETAILS_SUCCEEDED:
    case SCOPED_OBJECT_DETAILS_REQUESTED: {
      const { scopedObjects: scopedObjectsList, scopedObjectType } = action;

      return {
        data: {
          ...state.data,
          [scopedObjectType]: scopedObjectsList,
        },
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default scopedObjects;
