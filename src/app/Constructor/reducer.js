// @flow
import {
  type ConstructorActions,
  type Constructor as ConstructorType,
  SET_CURSOR,
  SET_FULLSCREEN,
  TOGGLE_FULLSCREEN,
  SET_ZOOM_CONTROLS_REF,
} from './types';

export const initialConstructorState: ConstructorType = {
  cursor: 'default',
  layoutEngineType: 'None',
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
  isFullScreen: false,
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
            ...state.zoom.zoomControlsRef,
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
    case TOGGLE_FULLSCREEN: {
      const { isFullScreen, ...restState } = state;

      return {
        ...restState,
        isFullScreen: !isFullScreen,
      };
    }
    case SET_FULLSCREEN: {
      const { isFullScreen } = action;

      return {
        ...state,
        isFullScreen,
      };
    }
    default:
      return state;
  }
};

export default constructor;
