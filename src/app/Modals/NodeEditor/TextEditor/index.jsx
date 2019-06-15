// @flow
import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import type { ITextEditorProps, ITextEditorState } from './types';

import {
  BASIC_TEXT_EDITOR_OPTIONS, LIST_OPTION, INLINE_OPTION,
} from './config';

import {
  wrapperStyle, toolbarStyle, editorStyle, EditorContainer,
} from './styles';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextEditor extends Component<ITextEditorProps, ITextEditorState> {
  constructor(props: ITextEditorProps) {
    super(props);
    let editorState;

    if (props.text) {
      const contentState = stateFromHTML(props.text);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };
  }

  onEditorStateChange = (editorState: any): void => {
    const { onChange } = this.props;
    const currentContent = editorState.getCurrentContent();

    const contentHTML = stateToHTML(currentContent);

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
