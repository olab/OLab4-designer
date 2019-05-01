// @flow
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_MODAL,
  SET_POSITION_MODAL,
} from './types';

export const ACTION_OPEN_MODAL = (modalName: string) => ({
  type: OPEN_MODAL,
  name: modalName,
});

export const ACTION_CLOSE_MODAL = (modalName: string) => ({
  type: CLOSE_MODAL,
  name: modalName,
});

export const ACTION_TOGGLE_MODAL = (modalName: string) => ({
  type: TOGGLE_MODAL,
  name: modalName,
});

export const ACTION_SET_POSITION_MODAL = (
  modalName: string,
  x: number,
  y: number,
) => ({
  type: SET_POSITION_MODAL,
  name: modalName,
  x,
  y,
});
