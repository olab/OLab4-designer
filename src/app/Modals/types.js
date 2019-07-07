// @flow
export type ModalPosition = {
  x: number,
  y: number,
};

export type LinkEditorModal = {
  ...ModalPosition,
};

export type NodeEditorModal = {
  ...ModalPosition,
};

export type SOPickerModal = {
  ...ModalPosition,
  isShow: boolean,
};

export type Modals = {
  [modalName: string]: SOPickerModal |
    LinkEditorModal | NodeEditorModal,
};

export const UPDATE_MODAL = 'UPDATE_MODAL';
type UpdateModal = {
  type: 'UPDATE_MODAL',
  modalName: string,
  modalValue: SOPickerModal
    | NodeEditorModal | LinkEditorModal,
};

export type ModalsActions = UpdateModal;

export default {
  UPDATE_MODAL,
};
