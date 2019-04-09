// @flow
export type MetaModal = {
  isShow: boolean,
  x: number,
  y: number,
};

export type Modals = {
  metaModal: MetaModal,
};

const CLOSE_META_MODAL = 'CLOSE_META_MODAL';
type CloseMetaModal = {
  type: 'CLOSE_META_MODAL',
};

const TOGGLE_META_MODAL = 'TOGGLE_META_MODAL';
type ToggleMetaModal = {
  type: 'TOGGLE_META_MODAL',
};

const SET_POSITION_META_MODAL = 'SET_POSITION_META_MODAL';
type SetPosMetaModal = {
  type: 'SET_POSITION_META_MODAL',
  x: number,
  y: number,
};

const SET_INIT_POSITION_META_MODAL = 'SET_INIT_POSITION_META_MODAL';
type SetInitPosMetaModal = {
  type: 'SET_INIT_POSITION_META_MODAL',
};

export type ModalsActions = CloseMetaModal | ToggleMetaModal
  | SetPosMetaModal | SetInitPosMetaModal;

export {
  CLOSE_META_MODAL,
  TOGGLE_META_MODAL,
  SET_POSITION_META_MODAL,
  SET_INIT_POSITION_META_MODAL,
};
