// @flow
import {
  type ModalsActions,
  type Modals as ModalsType,
  CLOSE_META_MODAL,
  TOGGLE_META_MODAL,
  SET_POSITION_META_MODAL,
  SET_INIT_POSITION_META_MODAL,
} from './types';

export const initialModalsState: ModalsType = {
  metaModal: {
    isShow: false,
    x: 0,
    y: 0,
  },
};

const modals = (state: ModalsType = initialModalsState, action: ModalsActions) => {
  switch (action.type) {
    case CLOSE_META_MODAL: {
      const { metaModal, ...rest } = state;

      metaModal.isShow = false;

      return {
        ...rest,
        metaModal: {
          ...metaModal,
        },
      };
    }
    case TOGGLE_META_MODAL: {
      const { metaModal, ...rest } = state;

      metaModal.isShow = !metaModal.isShow;

      return {
        ...rest,
        metaModal: {
          ...metaModal,
        },
      };
    }
    case SET_POSITION_META_MODAL: {
      const { metaModal, ...rest } = state;
      const { x, y } = action;

      metaModal.x = x;
      metaModal.y = y;

      return {
        ...rest,
        metaModal: {
          ...metaModal,
        },
      };
    }
    case SET_INIT_POSITION_META_MODAL: {
      const { metaModal, ...rest } = state;

      metaModal.x = 0;
      metaModal.y = 0;

      return {
        ...rest,
        metaModal: {
          ...metaModal,
        },
      };
    }
    default:
      return state;
  }
};

export default modals;
