import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';

export const createEditorState = (text) => {
  const contentState = stateFromHTML(text);
  return EditorState.createWithContent(contentState);
};

export default {
  createEditorState,
};
