// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CssBaseline, Paper, Grid, Typography, IconButton,
} from '@material-ui/core';
import { ArrowBackRounded as ArrowBackIcon } from '@material-ui/icons';

import type { IEditorWrapperProps } from './types';

import styles, { HeadingWrapper } from './styles';

const EditorWrapper = ({
  classes, children, history, scopedObject, onSubmit, isEditMode, isDisabled,
}: IEditorWrapperProps) => (
  <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={1} md={1} className={classes.leftPanel} />
    <Grid item xs={12} sm={11} md={11} component={Paper} className={classes.rightPanel}>
      <div className={classes.paper}>
        <HeadingWrapper>
          <IconButton
            aria-label="Back To Object List"
            title="Back To Object List"
            onClick={() => history.push(`/scopedObject/${scopedObject.toLowerCase()}`)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            {`${isEditMode ? 'EDIT' : 'ADD NEW'} ${scopedObject.toUpperCase()}`}
          </Typography>
        </HeadingWrapper>
        {children}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
          disabled={isDisabled}
        >
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(styles)(
  withRouter(EditorWrapper),
);
