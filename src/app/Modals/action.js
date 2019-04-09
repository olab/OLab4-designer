// @flow
import {
  CLOSE_META_MODAL,
  TOGGLE_META_MODAL,
  SET_POSITION_META_MODAL,
  SET_INIT_POSITION_META_MODAL,
} from './types';

export const ACTION_CLOSE_META_MODAL = () => ({
  type: CLOSE_META_MODAL,
});

export const ACTION_TOGGLE_META_MODAL = () => ({
  type: TOGGLE_META_MODAL,
});

export const ACTION_SET_POSITION_META_MODAL = (
  x: number,
  y: number,
) => ({
  type: SET_POSITION_META_MODAL,
  x,
  y,
});

export const ACTION_SET_INIT_POSITION_META_MODAL = () => ({
  type: SET_INIT_POSITION_META_MODAL,
});
