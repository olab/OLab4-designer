// @flow
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import type { ITextEditorProps, ITextEditorState } from './types';

import { createEditorState } from './utils';
import {
  BASIC_TEXT_EDITOR_OPTIONS, LIST_OPTION, INLINE_OPTION, IMAGE_OPTION,
} from './config';

import {
  wrapperStyle, toolbarStyle, editorStyle, EditorContainer,
} from './styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextEditor extends Component<ITextEditorProps, ITextEditorState> {
  constructor(props: ITextEditorProps) {
    super(props);

    const editorState = createEditorState(props.text);

    this.state = {
      editorState,
    };
  }

  updateComponent = (text: string) => {
    const editorState = createEditorState(text);
    this.setState({ editorState });
  }

  onEditorStateChange = (editorState: any): void => {
    const { onChange } = this.props;
    const currentContent = editorState.getCurrentContent();

    const contentHTML = draftToHtml(convertToRaw(currentContent));

    onChange(contentHTML);
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;

    return (
      <EditorContainer>
        <Editor
          toolbar={{
            options: BASIC_TEXT_EDITOR_OPTIONS,
            inline: INLINE_OPTION,
            list: LIST_OPTION,
            image: IMAGE_OPTION,
          }}
          editorState={editorState}
          wrapperStyle={wrapperStyle}
          toolbarStyle={toolbarStyle}
          editorStyle={editorStyle}
          onEditorStateChange={this.onEditorStateChange}
        />
      </EditorContainer>
    );
  }
}

export default TextEditor;
