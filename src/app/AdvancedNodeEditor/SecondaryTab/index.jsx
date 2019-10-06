// @flow
import React from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TextEditor from '../TextEditor';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import CopyToClipboard from '../../Modals/SOPicker/CopyToClipboard';

import { NODE_PRIORITIES } from './config';
import { LINK_STYLES } from '../../config';

import type { SecondaryTabProps as IProps } from './types';

import styles, {
  Title, TextEditorBlock, BlockCheckbox, CheckBoxContainer, TextFieldContainer,
} from './styles';

const SecondaryTab = ({
  classes, info = '', nodeId = 0, annotation = '', linkStyle = 1, priorityId = 1,
  handleStyleChange, handleEditorChange, handlePrioritiesChange,
}: IProps) => {
  const keyword = `[[INFO:${nodeId}]]`;

  return (
    <TextEditorBlock>
      <div>
        <Title>Supporting information</Title>
        <TextEditor
          editorId="info"
          width={800}
          height={200}
          text={info}
          handleEditorChange={handleEditorChange}
        />
        <TextFieldContainer>
          <TextField
            label="Supporting information keyword:"
            margin="normal"
            className={classes.textField}
            value={keyword}
          />
          <CopyToClipboard className={classes.copyToClipboard} text={keyword} />
        </TextFieldContainer>
      </div>
      <div>
        <Title>Annotation</Title>
        <TextEditor
          editorId="annotation"
          width={800}
          height={200}
          text={annotation}
          handleEditorChange={handleEditorChange}
        />
        <BlockCheckbox>
          <CheckBoxContainer>
            <OutlinedSelect
              label="Node priorities"
              name="probability"
              labelWidth={110}
              value={NODE_PRIORITIES[priorityId - 1]}
              values={NODE_PRIORITIES}
              onChange={handlePrioritiesChange}
              fullWidth
            />
          </CheckBoxContainer>
          <OutlinedSelect
            label="Links Style"
            name="linkStyle"
            labelWidth={80}
            value={LINK_STYLES[linkStyle - 1]}
            values={LINK_STYLES}
            onChange={handleStyleChange}
            fullWidth
          />
        </BlockCheckbox>
      </div>
    </TextEditorBlock>
  );
};

export default withStyles(styles)(SecondaryTab);
