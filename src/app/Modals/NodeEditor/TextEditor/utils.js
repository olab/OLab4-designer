import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const createEditorState = (text) => {
  const blocksFromHTML = htmlToDraft(text);
  const contentState = ContentState.createFromBlockArray(blocksFromHTML);
  return EditorState.createWithContent(contentState);
};

export default {
  createEditorState,
};
