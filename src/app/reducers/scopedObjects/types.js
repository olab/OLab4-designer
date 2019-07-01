// @flow
export type ScopedObject = {
  id: number,
  shortCode: string,
  title: string,
  subTitle: string,
};

export type ScopedObjects = {
  [type: string]: Array<ScopedObject>,
};

export type ScopedObjectsState = {
  data: ScopedObjects,
  isFetching: boolean,
};

const SCOPED_OBJECTS_FAILED = 'SCOPED_OBJECTS_FAILED';
type ScopedObjectsFailed = {
  type: 'SCOPED_OBJECTS_FAILED',
};

const SCOPED_OBJECTS_SUCCEEDED = 'SCOPED_OBJECTS_SUCCEEDED';
type ScopedObjectsSucceeded = {
  type: 'SCOPED_OBJECTS_SUCCEEDED',
  scopedObjectsData: ScopedObjects,
};

const SCOPED_OBJECTS_REQUESTED = 'SCOPED_OBJECTS_REQUESTED';
type ScopedObjectsRequested = {
  type: 'SCOPED_OBJECTS_REQUESTED',
};

export type ScopedObjectsActions = ScopedObjectsSucceeded |
  ScopedObjectsRequested | ScopedObjectsFailed;

export {
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
};
