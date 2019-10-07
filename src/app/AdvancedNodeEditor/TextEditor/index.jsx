// @flow
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { BASIC_TEXT_EDITOR_OPTIONS, EDITOR_API_KEY, EDITOR_VERSION } from './config';

import type { TextEditorProps as IProps } from './types';

const TextEditor = ({
  height = 200, width = 800, text = '', editorId = '', handleEditorChange,
}: IProps) => (
  <Editor
    apiKey={EDITOR_API_KEY}
    id={editorId}
    cloudChannel={EDITOR_VERSION}
    initialValue={text}
    value={text}
    init={{
      width,
      height,
      selector: `textarea#${editorId}`,
      ...BASIC_TEXT_EDITOR_OPTIONS,
    }}
    onEditorChange={handleEditorChange}
  />
);

export default TextEditor;
