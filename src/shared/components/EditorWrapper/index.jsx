// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CssBaseline, Paper, Grid, Typography,
} from '@material-ui/core';

import type { IEditorWrapperProps } from './types';

import styles from './styles';

const EditorWrapper = ({ classes, children, scopedObject }: IEditorWrapperProps) => (
  <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={1} md={1} className={classes.leftPanel} />
    <Grid item xs={12} sm={11} md={11} component={Paper} className={classes.rightPanel}>
      <div className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          {`ADD NEW ${scopedObject}`}
        </Typography>
        {children}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save
        </Button>
      </div>
    </Grid>
  </Grid>
);

export default withStyles(styles)(EditorWrapper);
