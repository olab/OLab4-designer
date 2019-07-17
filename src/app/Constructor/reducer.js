// @flow
import {
  type ConstructorActions,
  type Constructor as ConstructorType,
  SET_CURSOR,
  SET_FULLSCREEN,
  TOGGLE_FULLSCREEN,
  SET_ZOOM_CONTROLS_REF,
} from './types';

import { LAYOUT_ENGINE } from './config';

export const initialConstructorState: ConstructorType = {
  cursor: 'default',
  layoutEngineType: LAYOUT_ENGINE.NONE,
  zoom: {
    index: 50,
    zoomStep: 1,
    maxZoom: 150,
    minZoom: 15,
    zoomControlsRef: null,
  },
  autoSave: {
    isEnabled: false,
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
      const { zoom, ...restState } = state;
      const { ref: zoomControlsRef } = action;

      return {
        ...restState,
        zoom: {
          ...zoom,
          zoomControlsRef,
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
