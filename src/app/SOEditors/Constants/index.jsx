// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import OutlinedInput from '../../../shared/components/OutlinedInput';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import EditorWrapper from '../../../shared/components/EditorWrapper';

import type { IEditorProps } from './types';

import { EDITORS_FIELDS } from '../config';
import { SCOPE_LEVELS, SCOPED_OBJECTS } from '../../config';

import styles, { FieldLabel } from './styles';

const Constants = ({ classes }: IEditorProps) => (
  <EditorWrapper scopedObject={SCOPED_OBJECTS.CONSTANT}>
    <FieldLabel>
      {EDITORS_FIELDS.NAME}
      <OutlinedInput
        name="name"
        placeholder="Name"
        value=""
        fullWidth
      />
    </FieldLabel>
    <FieldLabel>
      {EDITORS_FIELDS.DESCRIPTION}
      <TextField
        multiline
        rows="3"
        placeholder="Description"
        className={classes.textField}
        fullWidth
        margin="normal"
        variant="outlined"
      />
    </FieldLabel>
    <FieldLabel>
      {EDITORS_FIELDS.TEXT}
      <TextField
        multiline
        rows="6"
        placeholder="Text"
        className={classes.textField}
        fullWidth
        margin="normal"
        variant="outlined"
      />
    </FieldLabel>
    <FieldLabel>
      {EDITORS_FIELDS.SCOPE_LEVEL}
    </FieldLabel>
    <OutlinedSelect
      name="variant"
      value={SCOPE_LEVELS[0]}
      values={SCOPE_LEVELS}
    />
  </EditorWrapper>
);

export default withStyles(styles)(Constants);
