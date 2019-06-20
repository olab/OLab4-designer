// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper, Typography, List, ListItem, ListItemIcon, Divider,
} from '@material-ui/core';
import { Inbox } from '@material-ui/icons';

import type { IObjectsListProps } from './types';

import styles from './styles';

const ObjectsList = ({ classes, scopedObject, location }: IObjectsListProps) => (
  <Grid container component="main" className={classes.root}>
    <Grid item xs={false} sm={1} md={1} className={classes.leftPanel} />
    <Grid item xs={12} sm={11} md={11} component={Paper} className={classes.rightPanel}>
      <Typography variant="h4" className={classes.title}>
        {scopedObject}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        component={Link}
        to={`${location.pathname}/add`}
      >
        {`Add New ${scopedObject}`}
      </Button>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <Typography variant="h5" gutterBottom>
            Text Constant 1
          </Typography>
        </ListItem>
      </List>
    </Grid>
  </Grid>
);

export default withStyles(styles)(ObjectsList);
