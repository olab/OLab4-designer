// @flow
import cloneDeep from 'lodash.clonedeep';

import {
  type ModalsActions,
  type Modals as ModalsType,
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_MODAL,
  SET_POSITION_MODAL,
} from './types';

export const initialModalsState: ModalsType = {
  metaModal: {
    isShow: false,
    x: 0,
    y: 0,
  },
  linkEditorModal: {
    x: 0,
    y: 0,
  },
  nodeEditorModal: {
    x: 0,
    y: 0,
  },
};

const modals = (state: ModalsType = initialModalsState, action: ModalsActions) => {
  switch (action.type) {
    case OPEN_MODAL: {
      const { name: modalName } = action;
      const clonedState = cloneDeep(state);
      const modal = clonedState[modalName];

      modal.isShow = true;

      return {
        ...clonedState,
      };
    }
    case CLOSE_MODAL: {
      const { name: modalName } = action;
      const clonedState = cloneDeep(state);
      const modal = clonedState[modalName];

      modal.isShow = false;

      return {
        ...clonedState,
      };
    }
    case TOGGLE_MODAL: {
      const { name: modalName } = action;
      const clonedState = cloneDeep(state);
      const modal = clonedState[modalName];

      modal.isShow = !modal.isShow;

      return {
        ...clonedState,
      };
    }
    case SET_POSITION_MODAL: {
      const { name: modalName, x, y } = action;
      const clonedState = cloneDeep(state);
      const modal = clonedState[modalName];

      modal.x = x;
      modal.y = y;

      return {
        ...clonedState,
      };
    }
    default:
      return state;
  }
};

export default modals;
