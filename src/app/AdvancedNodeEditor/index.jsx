// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Tabs, Tab, Button,
} from '@material-ui/core';

import MainTab from './MainTab';
import SecondaryTab from './SecondaryTab';

import type { AdvancedNodeEditorProps as IProps } from './types';

import styles, {
  TabContainer, Container, ScrollingContainer, Title, Header,
} from './styles';

class AdvancedNodeEditor extends PureComponent<IProps> {
  tabNumber: number = 0;

  handleChangeTabs = (event: Event, value: number): void => {
    this.tabNumber = value;
    this.forceUpdate();
  };

  render() {
    const { classes, match: { params: { nodeId } } } = this.props;

    return (
      <Container>
        <ScrollingContainer>
          <Header>
            <Title>Advanced Node Editor</Title>
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
              value={this.tabNumber}
              onChange={this.handleChangeTabs}
            >
              <Tab label="Main" />
              <Tab label="Secondary" />
            </Tabs>
          </Paper>
          <TabContainer>
            {this.tabNumber === 0 && (
              <MainTab />
            )}
            {this.tabNumber === 1 && (
              <SecondaryTab nodeId={nodeId} />
            )}
          </TabContainer>
        </ScrollingContainer>
      </Container>
    );
  }
}

export default withStyles(styles)(AdvancedNodeEditor);
