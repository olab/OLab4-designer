// @flow
import type { ScopedObjectListItem as ScopedObjectListItemType } from '../../reducers/scopedObjects/types';

export type ISOListProps = {
  classes: {
    [props: string]: any,
  },
  match: any,
  history: any,
  location: any,
  scopedObjects: Array<ScopedObjectListItemType>,
  isScopedObjectsFetching: boolean,
  ACTION_SCOPED_OBJECTS_TYPED_REQUESTED: (scopedObjectType: string) => void,
  ACTION_SCOPED_OBJECT_DELETE_REQUESTED: (scopedObjectId: number, scopedObjectType: string) => void,
};

export type ISOListState = {
  scopedObjectsFiltered: Array<ScopedObjectListItemType>,
};
