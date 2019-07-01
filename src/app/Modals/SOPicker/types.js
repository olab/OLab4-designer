// @flow
import type { ModalPosition as ModalPositionType } from '../types';
import type {
  ScopedObject as ScopedObjectType,
  ScopedObjects as ScopedObjectsType,
} from '../../reducers/scopedObjects/types';

export type ISOPickerProps = {
  ...ModalPositionType,
  classes: {
    [props: string]: any,
  },
  ACTION_CLOSE_MODAL: Function,
  ACTION_SET_POSITION_MODAL: Function,
  ACTION_SCOPED_OBJECTS_REQUESTED: Function,
  connectDragSource: Function,
  connectDragPreview: Function,
  isDragging: boolean,
  isFetching: boolean,
  scopedObjects: ScopedObjectsType,
};

export type ISOPickerState = {
  type: string,
  level: string,
  scopedObjectsFiltered: Array<ScopedObjectType>,
  isScrollbarVisible: boolean,
};
