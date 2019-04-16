// @flow
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import UndoRedoIcon from '../../../../shared/assets/icons/toolbar/templates/undo-redo-icon';

import * as actions from '../../action';
import type { IUndoRedoButtonsProps } from './types';
import styles, { Wrapper, Container } from './styles';

export const GraphUndoRedoButtons = ({
  classes, isUndoAvailable, isRedoAvailable, ACTION_REDO_GRAPH, ACTION_UNDO_GRAPH,
}: IUndoRedoButtonsProps) => (
  <Wrapper>
    <Container>
      <IconButton
        aria-label="Undo Button"
        onClick={ACTION_UNDO_GRAPH}
        disabled={!isUndoAvailable}
        className={classes.undoRedo}
      >
        <UndoRedoIcon undo />
      </IconButton>
      <IconButton
        aria-label="Redo Button"
        onClick={ACTION_REDO_GRAPH}
        disabled={!isRedoAvailable}
        className={classes.undoRedo}
      >
        <UndoRedoIcon redo />
      </IconButton>
    </Container>
  </Wrapper>
);

const mapStateToProps = ({ constructor: { graph } }) => ({
  isUndoAvailable: !!graph.undo.length,
  isRedoAvailable: !!graph.redo.length,
});

const mapDispatchToProps = dispatch => ({
  ACTION_REDO_GRAPH: () => {
    dispatch(actions.ACTION_REDO_GRAPH());
  },
  ACTION_UNDO_GRAPH: () => {
    dispatch(actions.ACTION_UNDO_GRAPH());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(memo(GraphUndoRedoButtons)));
