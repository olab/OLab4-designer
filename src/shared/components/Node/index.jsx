// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  CardHeader, Icon, Fab, Typography, Card, CardContent,
} from '@material-ui/core';
import classNames from 'classnames';

import {
  LockIcon, DragableIcon, MoreActionsIcon, StarIcon, MinimizeIcon,
} from './icons';
import CardFooter from './CardFooter';
import type { State, Props } from './types';
import styles from './styles';


class Node extends React.Component <Props, State> {
  state = {
    isCardContentVisible: true,
    isMainNode: false,
  };

  toggleCardContent = (): void => {
    const { isCardContentVisible } = this.state;
    this.setState({ isCardContentVisible: !isCardContentVisible });
  };

  render() {
    const { classes } = this.props;
    const { isCardContentVisible, isMainNode } = this.state;

    const { cardHeader, cardHeaderRegular } = classes;
    const cardHeaderClassName = classNames(
      cardHeader,
      { [cardHeaderRegular]: !isMainNode },
    );

    const ActionBar = (
      <div>
        <Fab className={classes.actionBarButton} onClick={this.toggleCardContent}>
          <MinimizeIcon />
        </Fab>
        <Fab className={classes.actionBarButton}>
          <LockIcon />
        </Fab>
        <Fab className={classes.actionBarButton}>
          <MoreActionsIcon />
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
          className={cardHeaderClassName}
          classes={{ action: classes.action }}
          title={title}
          disableTypography
          action={ActionBar}
        />
        {isCardContentVisible && (
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
