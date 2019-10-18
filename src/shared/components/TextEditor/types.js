// @flow
export type EditorOptions = {
  [props: string]: any,
};

export type TextEditorProps = {
  text: string,
  editorId?: string,
  width: number,
  height: number,
  handleEditorChange: Function,
  handleKeyDown: Function,
  editorOptions?: EditorOptions,
};
