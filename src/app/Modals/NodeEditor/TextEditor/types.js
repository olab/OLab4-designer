// @flow
export type ITextEditorState = {
  editorState: any,
};

export type ITextEditorProps = {
  text: string,
  onChange: (text: string) => void,
};
