// @flow
import React from 'react';
import classNames from 'classnames';
import { sanitize } from 'dompurify';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardContent, RootRef,
} from '@material-ui/core';

import CardFooter from './CardFooter';
import ActionBar from './HeaderActionBar';
import HeaderTitle from './HeaderTitle';
import ResizeIcon from '../../../../../shared/assets/icons/resizer.svg';

import {
  ACTION_RESIZE, ACTION_EDITOR, COLLAPSED_HEIGHT, EXTRA_PADDINGS,
} from '../config';

import type { INodeProps } from './types';

import styles from './styles';

const NodeComponent = ({
  classes,
  isCollapsed,
  nodeComponentRef,
  isLocked,
  width,
  height,
  type,
  text,
  title,
  color,
  isLinked,
}: INodeProps) => {
  const cardContentMain = classNames(
    classes.cardContent,
    { [classes.cardContentLocked]: isLocked },
  );

  const cardHeader = classNames(
    classes.cardHeader,
    { [classes.cardHeaderCollapsed]: isCollapsed },
  );

  const headerWidth = isCollapsed ? width : '';
  const cardContentHeigth = height - COLLAPSED_HEIGHT;
  const cardTextHeight = cardContentHeigth - EXTRA_PADDINGS;

  return (
    <RootRef rootRef={nodeComponentRef}>
      <Card className={classes.card} tabIndex={0}>
        <CardHeader
          className={cardHeader}
          classes={{
            action: classes.action,
            content: classes.title,
          }}
          style={{
            width: headerWidth,
            backgroundColor: color,
          }}
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
              <div
                data-active="true"
                data-action={ACTION_EDITOR}
                style={{ minHeight: cardTextHeight }}
                className={classes.cardContentText}
                dangerouslySetInnerHTML={{ __html: sanitize(text) }}
              />
            </CardContent>
            <div className={classes.resizer}>
              <ResizeIcon />
            </div>
          </>
        )}
        <CardFooter isLinked={isLinked} />
      </Card>
    </RootRef>
  );
};

export default withStyles(styles)(NodeComponent);
