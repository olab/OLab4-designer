// @flow
import type { ModalPosition as ModalPositionType } from '../types';
import type {
  ScopedObject as ScopedObjectType,
  ScopedObjectsState as ScopedObjectsStateType,
} from '../../reducers/scopedObjects/types';

export type ISOPickerProps = {
  ...ModalPositionType,
  ACTION_CLOSE_MODAL: Function,
  ACTION_SET_POSITION_MODAL: Function,
  ACTION_SCOPED_OBJECTS_REQUESTED: Function,
  connectDragSource: Function,
  connectDragPreview: Function,
  isDragging: boolean,
  scopedObjects: ScopedObjectsStateType,
};

export type ISOPickerState = {
  type: string,
  level: string,
  scopedObjectsFiltered: Array<ScopedObjectType>,
  isScrollbarVisible: boolean,
};
