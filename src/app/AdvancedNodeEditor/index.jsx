// @flow
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Tabs, Tab, Button,
} from '@material-ui/core';

import MainTab from './MainTab';
import SecondaryTab from './SecondaryTab';

import * as mapActions from '../reducers/map/action';

import { LINK_STYLES } from '../config';
import { NODE_PRIORITIES } from './SecondaryTab/config';
import {
  ROOT_TYPE as ROOT_NODE_TYPE,
  ORDINARY_TYPE as ORDINARY_NODE_TYPE,
} from '../Constructor/Graph/Node/config';

import type { AdvancedNodeEditorProps as IProps } from './types';
import type { Node as NodeType } from '../Constructor/Graph/Node/types';

import styles, {
  TabContainer, Container, ScrollingContainer, Title, Header,
} from './styles';

class AdvancedNodeEditor extends PureComponent<IProps, NodeType> {
  tabNumber: number = 0;

  constructor(props) {
    super(props);
    const { match: { params: { mapId, nodeId } }, ACTION_GET_NODE, node } = this.props;
    ACTION_GET_NODE(mapId, nodeId);

    this.state = { ...node };
  }

  componentDidUpdate(prevProps: IProps) {
    const { match: { params: { nodeId: nodeIdPage } }, node } = this.props;
    const { node: prevNode } = prevProps;
    const isDataChanged = node.id === Number(nodeIdPage) && prevNode !== node;

    if (isDataChanged) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...node });
    }
  }

  applyChanges = (): void => {
    const { match: { params: { mapId } }, ACTION_UPDATE_NODE } = this.props;
    const updatedNode = { ...this.state };

    ACTION_UPDATE_NODE(updatedNode, true, mapId);
  };

  handleCheckBoxChange = (e: Event, checkedVal: boolean, name: string): void => {
    if (name === 'type') {
      this.setState({
        [name]: checkedVal ? ROOT_NODE_TYPE : ORDINARY_NODE_TYPE,
      });

      return;
    }

    this.setState({ [name]: checkedVal });
  };

  handleChangeTabs = (event: Event, value: number): void => {
    this.tabNumber = value;
    this.forceUpdate();
  };

  handleTitleChange = (e: Event): void => {
    const { value: title } = (e.target: window.HTMLInputElement);
    this.setState({ title });
  };

  handleEditorChange = (text: string, { id: editorId }: { editorId: string }): void => {
    this.setState({ [editorId]: text });
  };

  handleSelectChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const selectMenu = name === 'linkStyle' ? LINK_STYLES : NODE_PRIORITIES;
    const index = selectMenu.findIndex(style => style === value);

    this.setState({ [name]: index + 1 });
  };

  render() {
    const {
      isVisitOnce = false, isEnd, type, title, text, linkStyle,
      info, annotation, priorityId,
    } = this.state;
    const { classes, match: { params: { nodeId } } } = this.props;

    return (
      <Container>
        <Header>
          <Title>Advanced Node Editor</Title>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.applyChanges}
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
        <ScrollingContainer>
          <TabContainer>
            {this.tabNumber === 0 && (
              <MainTab
                title={title}
                text={text}
                type={type}
                isEnd={isEnd}
                isVisitOnce={isVisitOnce}
                handleEditorChange={this.handleEditorChange}
                handleCheckBoxChange={this.handleCheckBoxChange}
                handleTitleChange={this.handleTitleChange}
              />
            )}
            {this.tabNumber === 1 && (
              <SecondaryTab
                nodeId={nodeId}
                info={info}
                annotation={annotation}
                linkStyle={linkStyle}
                priorityId={priorityId}
                handleEditorChange={this.handleEditorChange}
                handleSelectChange={this.handleSelectChange}
              />
            )}
          </TabContainer>
        </ScrollingContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ map: { nodes } }) => ({ node: nodes[0] });

const mapDispatchToProps = dispatch => ({
  ACTION_GET_NODE: (mapId: number, nodeId: number) => {
    dispatch(mapActions.ACTION_GET_NODE(mapId, nodeId));
  },
  ACTION_UPDATE_NODE: (
    nodeData: NodeType,
    isShowNotification: boolean,
    mapIdFromURL: number,
  ) => {
    dispatch(mapActions.ACTION_UPDATE_NODE(nodeData, isShowNotification, mapIdFromURL));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(AdvancedNodeEditor)));
