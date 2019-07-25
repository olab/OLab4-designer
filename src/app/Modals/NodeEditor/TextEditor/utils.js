import { EditorState, ContentState, convertFromHTML } from 'draft-js';

export const createEditorState = (text) => {
  const blocksFromHTML = convertFromHTML(text);
  const contentState = ContentState.createFromBlockArray(blocksFromHTML);
  return EditorState.createWithContent(contentState);
};

export default {
  createEditorState,
};
