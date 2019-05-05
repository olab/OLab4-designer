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
import type { State, Props } from './types';
import styles from './styles';

class Node extends React.Component <Props, State> {
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
      <div>
        <Fab data-id="collapse" className={classes.actionBarButton}>
          <MinimizeIcon />
        </Fab>
        <Fab data-id="lock" className={classes.actionBarButton}>
          <LockIcon />
        </Fab>
      </div>
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
            <CardContent data-id="resize" className={cardContentMain}>
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
