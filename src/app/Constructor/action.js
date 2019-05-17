// @flow
import {
  SET_ZOOM_CONTROLS_REF,
} from './types';

export const ACTION_SET_ZOOM_CONTROLS_REF = (ref: { current: null | HTMLDivElement }) => ({
  type: SET_ZOOM_CONTROLS_REF,
  ref,
});

export default {
  ACTION_SET_ZOOM_CONTROLS_REF,
};
