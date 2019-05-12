// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  CardHeader, Typography, Card, CardContent, RootRef,
} from '@material-ui/core';


import CardFooter from './CardFooter';
import ActionBar from './HeaderActionBar';
import HeaderTitle from './HeaderTitle';

import type { INodeState, INodeProps } from './types';

import { RESIZE_NODE } from '../config';

import styles from './styles';


class Node extends React.Component <INodeProps, INodeState> {
  render() {
    const {
      classes, isCollapsed, resizeRef, isLocked, width, height, type,
    } = this.props;
    const { cardContent, cardContentLocked } = classes;

    const cardContentMain = classNames(
      cardContent,
      { [cardContentLocked]: isLocked },
    );

    const headerWidth = isCollapsed ? width - 10 : '';
    const cardContentHeigth = height - 60;

    return (
      <RootRef rootRef={resizeRef}>
        <Card className={classes.card} tabIndex={0}>
          <CardHeader
            className={classes.cardHeader}
            classes={{ action: classes.action }}
            style={{ width: headerWidth }}
            title={<HeaderTitle isMainNode={type} isLocked={isLocked} classes={classes} />}
            disableTypography
            action={<ActionBar classes={classes} />}
          />

          {!isCollapsed && (
          <>
            <CardContent style={{ width, height: cardContentHeigth }} data-active="true" data-action={RESIZE_NODE} className={cardContentMain}>
              <Typography component="p" className={classes.cardContentText}>
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
