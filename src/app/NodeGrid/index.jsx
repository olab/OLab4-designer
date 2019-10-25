// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import NodeGridTable from './Table';
import CircularSpinnerWithText from '../../shared/components/CircularSpinnerWithText';

import * as nodeGridActions from '../reducers/nodeGrid/action';
import * as wholeMapActions from '../../middlewares/app/action';

import { getNodesReduced } from './utils';

import { KEY_S } from '../Modals/NodeEditor/config';

import type { NodeGridProps as IProps, NodeGridState as IState, Node as NodeType } from './types';

import styles, { Wrapper, Header, Label } from '../CounterGrid/styles';

class NodeGrid extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const {
      mapId, mapIdUrl, nodes, ACTION_GET_WHOLE_MAP_REQUESTED,
    } = props;
    const isPageRefreshed = mapIdUrl && !mapId;

    if (isPageRefreshed) {
      ACTION_GET_WHOLE_MAP_REQUESTED(Number(mapIdUrl));
    }

    this.state = getNodesReduced(nodes);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPressed);
  }

  componentDidUpdate(prevProps: IProps) {
    const { nodes: propsNodes } = this.props;
    const { nodes: prevPropsNodes } = prevProps;
    const shouldUpdateState = prevPropsNodes !== propsNodes;

    if (shouldUpdateState) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(getNodesReduced(propsNodes));
    }
  }

  handleChange = (nodeKey: string, index: number): Function => (html: string): void => {
    this.setState(({ nodes }: IState): IState => ({
      nodes: [
        ...nodes.slice(0, index),
        {
          ...nodes[index],
          [nodeKey]: ['x', 'y'].includes(nodeKey)
            ? Number(html)
            : html,
        },
        ...nodes.slice(index + 1),
      ],
    }));
  };

  applyChanges = (): void => {
    const { nodes } = this.state;
    const { ACTION_UPDATE_NODE_GRID_REQUESTED } = this.props;

    ACTION_UPDATE_NODE_GRID_REQUESTED(nodes);
  };

  handleKeyPressed = (e: KeyboardEvent): void => {
    const isSavingCombination = e.keyCode === KEY_S && (e.ctrlKey || e.metaKey);

    if (isSavingCombination) {
      e.preventDefault();
      this.applyChanges();
    }
  };

  handleTableSortChange = (nodes: Array<NodeType>): void => {
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;
    const { classes, isFetching } = this.props;

    return (
      <Wrapper>
        <Header>
          <Label>Node grid</Label>
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={this.applyChanges}
          >
            Save
          </Button>
        </Header>
        <Divider />
        {
          isFetching
            ? <CircularSpinnerWithText large centered />
            : (
              <NodeGridTable
                nodes={nodes}
                onChange={this.handleChange}
                onTableSortChange={this.handleTableSortChange}
              />
            )
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = (
  { map: { nodes, isFetching }, mapDetails: { id: mapId } },
  { match: { params: { mapId: mapIdUrl } } },
) => ({
  mapIdUrl: Number(mapIdUrl),
  nodes,
  isFetching,
  mapId,
});

const mapDispatchToProps = dispatch => ({
  ACTION_GET_WHOLE_MAP_REQUESTED: (mapId: number) => {
    dispatch(wholeMapActions.ACTION_GET_WHOLE_MAP_REQUESTED(mapId));
  },
  ACTION_UPDATE_NODE_GRID_REQUESTED: (nodes: Array<NodeType>) => {
    dispatch(nodeGridActions.ACTION_UPDATE_NODE_GRID_REQUESTED(nodes));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NodeGrid));
