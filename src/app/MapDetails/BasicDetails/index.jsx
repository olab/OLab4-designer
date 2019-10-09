// @flow
import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TextEditor from '../../../shared/components/TextEditor';
import CopyToClipboard from '../../Modals/SOPicker/CopyToClipboard';
import OutlinedInput from '../../../shared/components/OutlinedInput';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';

import { CREATOR } from './config';

import { BasicDetailsProps as IProps } from './types';

import styles, { TextFieldContainer } from './styles';
import { ContainerTab, ContentTitle } from '../styles';

const BasicDetails = ({
  classes, text, handleEditorChange, nodeId, handleSelectChange,
}: IProps) => (
  <ContainerTab>
    <OutlinedInput
      name="title"
      label="Title"
      fullWidth
    />
    <ContentTitle>Description</ContentTitle>
    <TextEditor
      editorId="text"
      height={300}
      width={800}
      text={text}
      handleEditorChange={handleEditorChange}
    />
    <TextFieldContainer>
      <TextField
        label="Keywords"
        margin="normal"
        className={classes.textField}
        value={`[[INFO:${nodeId}]]`}
        fullWidth
      />
      <CopyToClipboard medium />
    </TextFieldContainer>
    <OutlinedSelect
      label="Creator"
      name="creator"
      labelWidth={80}
      value={CREATOR[0]}
      values={CREATOR}
      onChange={handleSelectChange}
      fullWidth
    />
  </ContainerTab>
);

export default withStyles(styles)(BasicDetails);
