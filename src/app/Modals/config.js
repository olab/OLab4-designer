// @flow
export const DND_CONTEXTS = {
  VIEWPORT: 'viewport',
};

export const MIN_MODAL_WIDTH = 360;
export const MIN_MODAL_HEIGHT = 400;

const AXIS_OFFSET = 20;
export const PICKER_OFFSET_Y = window.innerHeight - MIN_MODAL_HEIGHT - AXIS_OFFSET;
export const PICKER_OFFSET_X = AXIS_OFFSET;

export const MODALS_NAMES = {
  SO_PICKER_MODAL: 'SOPickerModal',
  LINK_EDITOR_MODAL: 'LinkEditorModal',
  NODE_EDITOR_MODAL: 'NodeEditorModal',
};

export const LINK_STYLES = [
  'Hyperlinks',
  'Dropdown',
  'Dropdown + Confidence',
  'Type in text',
  'Buttons',
];
