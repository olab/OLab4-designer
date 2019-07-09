// @flow
import {
  type ModalsActions,
  type Modals as ModalsType,
  UPDATE_MODAL,
} from './types';

import { MODALS_NAMES } from './config';

export const initialModalsState: ModalsType = {
  [MODALS_NAMES.SO_PICKER_MODAL]: {
    isShow: false,
    x: 0,
    y: 0,
  },
  [MODALS_NAMES.LINK_EDITOR_MODAL]: {
    x: 0,
    y: 0,
  },
  [MODALS_NAMES.NODE_EDITOR_MODAL]: {
    x: 0,
    y: 0,
  },
};

const modals = (state: ModalsType = initialModalsState, action: ModalsActions) => {
  switch (action.type) {
    case UPDATE_MODAL: {
      const { modalName, modalValue } = action;

      return {
        ...state,
        [modalName]: modalValue,
      };
    }
    default:
      return state;
  }
};

export default modals;
