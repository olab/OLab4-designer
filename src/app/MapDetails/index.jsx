// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Tabs, Tab, Button,
} from '@material-ui/core';

import Appearance from './Appearance';
import BasicDetails from './BasicDetails';
import ContentDetails from './ContentDetails';
import AdvancedDetails from './AdvancedDetails';

import { MapDetailsProps as IProps } from './types';

import styles, {
  TabContainer, Container, ScrollingContainer, Title, Header,
} from './styles';

class AdvancedNodeEditor extends PureComponent<IProps> {
  numberTab: number = 0;

  handleChangeTabs = (event: Event, value: number): void => {
    this.numberTab = value;
    this.forceUpdate();
  };

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <Header>
          <Title>Map Details</Title>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Save
          </Button>
        </Header>
        <Paper className={classes.paper}>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={this.numberTab}
            onChange={this.handleChangeTabs}
          >
            <Tab label="Basic Details" />
            <Tab label="Appearance" />
            <Tab label="Content Details" />
            <Tab label="Advanced Details" />
          </Tabs>
        </Paper>
        <ScrollingContainer>
          <TabContainer>
            {this.numberTab === 0 && (
              <BasicDetails />
            )}
            {this.numberTab === 1 && (
              <Appearance />
            )}
            {this.numberTab === 2 && (
              <ContentDetails />
            )}
            {this.numberTab === 3 && (
              <AdvancedDetails />
            )}
          </TabContainer>
        </ScrollingContainer>
      </Container>
    );
  }
}

export default withStyles(styles)(AdvancedNodeEditor);
