// @flow
import {
  type ModalsActions,
  type Modals as ModalsType,
  UPDATE_MODAL,
} from './types';

export const initialModalsState: ModalsType = {
  SOPickerModal: {
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
