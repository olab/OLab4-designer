// @flow
import React from 'react';
import classNames from 'classnames';
import { sanitize } from 'dompurify';
import {
  Card, CardHeader, CardContent, RootRef,
} from '@material-ui/core';

import CardFooter from './CardFooter';
import ActionBar from './HeaderActionBar';
import HeaderTitle from './HeaderTitle';
import ResizeIcon from '../../../../../shared/assets/icons/resizer.svg';

import {
  ACTION_RESIZE, ACTION_FOCUS, ACTION_SELECT, HEADER_HEIGHT, EXTRA_PADDINGS,
} from '../config';

import type { INodeProps } from './types';

import useStyles from './styles';

const NodeComponent = ({
  isCollapsed,
  isSelected,
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
  const classes = useStyles({ borderColor: color });

  const cardContentMain = classNames(
    classes.cardContent,
    { [classes.cardContentLocked]: isLocked },
  );

  const cardHeader = classNames(
    classes.cardHeader,
    { [classes.cardHeaderCollapsed]: isCollapsed },
  );

  const headerWidth = isCollapsed ? width : '';
  const cardContentHeigth = height - HEADER_HEIGHT;
  const cardTextHeight = cardContentHeigth - EXTRA_PADDINGS;

  return (
    <RootRef rootRef={nodeComponentRef}>
      <Card
        className={classes.card}
        data-selected={isSelected}
      >
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
          data-active="true"
          data-action={ACTION_SELECT}
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
                data-action={ACTION_FOCUS}
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

export default NodeComponent;
