// @flow
import {
  type ScopedObjectsActions,
  type ScopedObjectsState as ScopedObjectsType,
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
} from './types';

import { questions } from './config';

export const initialScopedObjectsState: ScopedObjectsType = {
  data: {
    Questions: questions,
    Medias: [],
    Counters: [],
    Constants: [],
    Scripts: [],
    Downloads: [],
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
    case SCOPED_OBJECTS_REQUESTED: {
      return {
        data: {
          ...state.data,
        },
        isFetching: true,
      };
    }
    case SCOPED_OBJECTS_FAILED: {
      return {
        data: {
          ...state.data,
        },
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default scopedObjects;