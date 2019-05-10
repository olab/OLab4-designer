// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  CardHeader, Fab, Typography, Card, CardContent, RootRef,
} from '@material-ui/core';

import {
  LockIcon, DragableIcon, StarIcon, MinimizeIcon, NodeLockedIcon,
} from './icons';
import CardFooter from './CardFooter';

import type { INodeState, INodeProps } from './types';

import { COLLAPSE_NODE, RESIZE_NODE, LOCK_NODE } from '../config';

import styles from './styles';


class Node extends React.Component <INodeProps, INodeState> {
  state = {
    isMainNode: false,
  };

  render() {
    const {
      classes, isCollapsed, resizeRef, isLocked,
    } = this.props;
    const { isMainNode } = this.state;

    const { cardContent, cardContentLocked } = classes;

    const cardContentMain = classNames(
      cardContent,
      { [cardContentLocked]: isLocked },
    );

    const ActionBar = (
      <>
        <Fab data-active="true" data-action={COLLAPSE_NODE} className={classes.actionBarButton}>
          <MinimizeIcon />
        </Fab>
        <Fab data-active="true" data-action={LOCK_NODE} className={classes.actionBarButton}>
          <LockIcon />
        </Fab>
      </>
    );

    const title = (
      <div className={classes.titleContainer}>
        <DragableIcon />
        {isMainNode && <StarIcon />}
        {isLocked && <NodeLockedIcon />}
        <p className={classes.title}>Node name</p>
      </div>
    );

    return (
      <RootRef rootRef={resizeRef}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            classes={{ action: classes.action }}
            title={title}
            disableTypography
            action={ActionBar}
          />

          {!isCollapsed && (
          <>
            <CardContent data-active="true" data-action={RESIZE_NODE} className={cardContentMain}>
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
      </RootRef>
    );
  }
}


export default withStyles(styles)(Node);
