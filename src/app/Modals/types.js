// @flow
export type MetaModal = {
  isShow: boolean,
  x: number,
  y: number,
};

export type LinkEditorModal = {
  x: number,
  y: number,
};

export type Modals = {
  metaModal: MetaModal,
  linkEditorModal: LinkEditorModal,
};

const CLOSE_MODAL = 'CLOSE_MODAL';
type CloseModal = {
  type: 'CLOSE_MODAL',
  name: string,
};

const OPEN_MODAL = 'OPEN_MODAL';
type OpenModal = {
  type: 'OPEN_MODAL',
  name: string,
};

const TOGGLE_MODAL = 'TOGGLE_MODAL';
type ToggleModal = {
  type: 'TOGGLE_MODAL',
  name: string,
};

const SET_POSITION_MODAL = 'SET_POSITION_MODAL';
type SetPosModal = {
  type: 'SET_POSITION_MODAL',
  name: string,
  x: number,
  y: number,
};

export type ModalsActions = OpenModal | CloseModal
  | ToggleModal | SetPosModal;

export {
  OPEN_MODAL,
  CLOSE_MODAL,
  TOGGLE_MODAL,
  SET_POSITION_MODAL,
};
