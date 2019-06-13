// @flow
import {
  type ConstructorActions,
  type Constructor as ConstructorType,
  SET_ZOOM_CONTROLS_REF,
  SET_CURSOR,
} from './types';

export const initialConstructorState: ConstructorType = {
  cursor: 'default',
  layoutEngineType: 'VerticalTree',
  zoom: {
    index: 50,
    zoomStep: 1,
    maxZoom: 150,
    minZoom: 15,
    zoomControlsRef: {
      current: null,
    },
  },
  autoSave: {
    enabled: true,
    interval: 30000,
  },
};

const constructor = (
  state: ConstructorType = initialConstructorState,
  action: ConstructorActions,
) => {
  switch (action.type) {
    case SET_ZOOM_CONTROLS_REF: {
      const { ref } = action;

      return {
        ...state,
        zoom: {
          ...state.zoom,
          zoomControlsRef: {
            current: ref.current,
          },
        },
      };
    }
    case SET_CURSOR: {
      const { cursor } = action;

      return {
        ...state,
        cursor,
      };
    }
    default:
      return state;
  }
};

export default constructor;
