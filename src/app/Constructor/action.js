// @flow
import {
  SET_ZOOM_CONTROLS_REF,
  SET_CURSOR,
} from './types';

export const ACTION_SET_ZOOM_CONTROLS_REF = (ref: { current: null | HTMLDivElement }) => ({
  type: SET_ZOOM_CONTROLS_REF,
  ref,
});

export const ACTION_SET_CURSOR = (cursor: string) => ({
  type: SET_CURSOR,
  cursor,
});

export default {
  ACTION_SET_ZOOM_CONTROLS_REF,
};
