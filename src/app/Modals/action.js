// @flow
import store from '../../store/store';
import { UPDATE_MODAL } from './types';

export const ACTION_CLOSE_MODAL = (modalName: string) => {
  const { modals } = store.getState();
  const modalValue = { ...modals[modalName] };
  modalValue.isShow = false;

  return {
    type: UPDATE_MODAL,
    modalName,
    modalValue,
  };
};

export const ACTION_TOGGLE_MODAL = (modalName: string) => {
  const { modals } = store.getState();
  const modalValue = { ...modals[modalName] };
  modalValue.isShow = !modalValue.isShow;

  return {
    type: UPDATE_MODAL,
    modalName,
    modalValue,
  };
};

export const ACTION_SET_POSITION_MODAL = (
  modalName: string,
  x: number,
  y: number,
) => {
  const { modals } = store.getState();
  const modalValue = { ...modals[modalName] };
  modalValue.x = x;
  modalValue.y = y;

  return {
    type: UPDATE_MODAL,
    modalName,
    modalValue,
  };
};
