// @flow
import type { ModalPosition as ModalPositionType } from '../types';

export type ISOPickerProps = {
  ...ModalPositionType,
  ACTION_CLOSE_MODAL: Function;
  ACTION_SET_POSITION_MODAL: Function;
  connectDragSource: Function;
  connectDragPreview: Function;
  isDragging: boolean;
};
