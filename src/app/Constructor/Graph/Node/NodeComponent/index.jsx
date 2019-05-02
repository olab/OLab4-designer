// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CardHeader, Icon, Fab, Typography, Card, CardContent,
} from '@material-ui/core';
// import classNames from 'classnames';

import {
  LockIcon, DragableIcon, StarIcon, MinimizeIcon,
} from './icons';
import CardFooter from './CardFooter';
import type { State, Props } from './types';
import styles from './styles';


class Node extends React.Component <Props, State> {
  state = {
    isMainNode: false,
    isCollapsed: false,
  };


  render() {
    const { classes } = this.props;
    const { isCollapsed, isMainNode } = this.state;

    const { cardHeader } = classes;

    const ActionBar = (
      <div>
        <Fab className={classes.actionBarButton}>
          <MinimizeIcon />
        </Fab>
        <Fab className={classes.actionBarButton}>
          <LockIcon />
        </Fab>
      </div>
    );

    const title = (
      <div className={classes.titleContainer}>
        <Icon>
          <DragableIcon />
        </Icon>
        {isMainNode && <StarIcon />}
        <p className={classes.title}>Node name</p>
      </div>
    );

    return (
      <Card className={classes.card}>
        <CardHeader
          className={cardHeader}
          classes={{ action: classes.action }}
          title={title}
          disableTypography
          action={ActionBar}
        />
        {!isCollapsed && (
          <>
            <CardContent className={classes.cardContent}>
              <Typography component="p">
                This impressive paella is a perfect party dish
                and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardFooter />
          </>
        )}
      </Card>
    );
  }
}


export default withStyles(styles)(Node);
