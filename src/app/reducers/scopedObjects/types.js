// @flow
export type ScopedObjectDetails = {
  description: string,
  scopeLevel: string,
  value: string,
  prefix: string,
  suffix: string,
  startValue: string,
  outOf: number,
};

export type ScopedObject = {
  id: number,
  name: string,
  description: string,
  scopeLevel: string,
  wiki: string,
  acl: string,
  isShowEyeIcon: boolean,
  isDetailsFetching: boolean,
  details: null | ScopedObjectDetails,
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

const SCOPED_OBJECT_DETAILS_REQUESTED = 'SCOPED_OBJECT_DETAILS_REQUESTED';
type ScopedObjectsDetailsRequested = {
  type: 'SCOPED_OBJECT_DETAILS_REQUESTED',
  scopedObjectId: number,
  scopedObjectType: string,
  scopedObjects: Array<ScopedObject>,
};

const SCOPED_OBJECT_DETAILS_SUCCEEDED = 'SCOPED_OBJECT_DETAILS_SUCCEEDED';
type ScopedObjectsDetailsSucceeded = {
  type: 'SCOPED_OBJECT_DETAILS_SUCCEEDED',
  scopedObjectType: string,
  scopedObjects: Array<ScopedObject>,
};

const SCOPED_OBJECT_DETAILS_FAILED = 'SCOPED_OBJECT_DETAILS_FAILED';
type ScopedObjectsDetailsFailed = {
  type: 'SCOPED_OBJECT_DETAILS_FAILED',
  scopedObjectType: string,
  scopedObjects: Array<ScopedObject>,
};

export type ScopedObjectsActions = ScopedObjectsSucceeded |
  ScopedObjectsRequested | ScopedObjectsFailed |
  ScopedObjectsDetailsRequested | ScopedObjectsDetailsSucceeded |
  ScopedObjectsDetailsFailed;

export {
  SCOPED_OBJECTS_FAILED,
  SCOPED_OBJECTS_SUCCEEDED,
  SCOPED_OBJECTS_REQUESTED,
  SCOPED_OBJECT_DETAILS_FAILED,
  SCOPED_OBJECT_DETAILS_SUCCEEDED,
  SCOPED_OBJECT_DETAILS_REQUESTED,
};
