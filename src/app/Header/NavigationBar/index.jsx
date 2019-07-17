// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, Menu, Button } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import type { INavigationProps, INavigationState } from './types';

import styles from './styles';

class NavigationBar extends PureComponent<INavigationProps, INavigationState> {
  constructor(props: INavigationProps) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleClick = (event: Event): void => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = (): void => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Button
          aria-controls="menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.button}
        >
          Objects
          <ExpandMoreIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          className={classes.menu}
        >
          <MenuItem
            onClick={this.handleClose}
            className={classes.menuItem}
            component={Link}
            to="/scopedObject/constant"
          >
            Constants
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(NavigationBar);
