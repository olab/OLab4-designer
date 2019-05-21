// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  CardHeader, Typography, Card, CardContent, RootRef,
} from '@material-ui/core';


import CardFooter from './CardFooter';
import ActionBar from './HeaderActionBar';
import HeaderTitle from './HeaderTitle';

import type { INodeProps } from './types';

import { ACTION_RESIZE } from '../config';

import styles from './styles';


class NodeComponent extends PureComponent <INodeProps> {
  render() {
    const {
      classes,
      isCollapsed,
      resizeRef,
      isLocked,
      width,
      height,
      type,
      text,
      title,
      color,
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
            style={{ width: headerWidth, backgroundColor: color }}
            title={(
              <HeaderTitle
                type={type}
                isLocked={isLocked}
                title={title}
              />
            )}
            disableTypography
            action={<ActionBar />}
          />

          {!isCollapsed && (
          <>
            <CardContent
              style={{ width, height: cardContentHeigth }}
              data-active="true"
              data-action={ACTION_RESIZE}
              className={cardContentMain}
            >
              <Typography component="p" className={classes.cardContentText}>
                {text}
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


export default withStyles(styles)(NodeComponent);
