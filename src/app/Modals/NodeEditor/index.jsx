// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import TextEditor from './TextEditor';
import OutlinedInput from '../../../shared/components/OutlinedInput';
import ColorPicker from '../../../shared/components/ColorPicker';
import Switch from '../../../shared/components/Switch';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import ScaleIcon from '../../../shared/assets/icons/cross.svg';

import type { Node as NodeType } from '../../Constructor/Graph/Node/types';
import type { INodeEditorProps, INodeEditorState } from './types';

import * as modalActions from '../action';
import * as mapActions from '../../reducers/map/action';
import { DND_CONTEXTS, MODALS_NAMES, LINK_STYLES } from '../config';

import {
  ModalWrapper, ModalHeader, ModalBody,
  ModalFooter, ArticleItem, ModalHeaderButton,
} from '../styles';
import styles from './styles';

class NodeEditor extends PureComponent<INodeEditorProps, INodeEditorState> {
  textEditorRef: { current: any };

  constructor(props: INodeEditorProps) {
    super(props);

    this.state = {
      ...props.node,
    };

    this.textEditorRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { node } = this.props;
    const { node: prevNode } = prevProps;
    const { current: currentTextEditorRef } = this.textEditorRef;

    if (node.id !== prevNode.id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...node });

      if (currentTextEditorRef) {
        currentTextEditorRef.updateComponent(node.text);
      }
    }
  }

  handleCloseModal = (): void => {
    const { node: { id: nodeId }, ACTION_UNFOCUS_NODE } = this.props;
    ACTION_UNFOCUS_NODE(nodeId);
  }

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  }

  handleTextChange = (text: string): void => {
    this.setState({ text });
  }

  handleStyleChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const index = LINK_STYLES.findIndex(style => style === value);
    this.setState({ [name]: index + 1 });
  }

  handleColorChange = (color: string): void => {
    this.setState({ color });
  }

  handleVisitOnceChange = (e: Event): void => {
    const { checked: isVisitOnce } = (e.target: window.HTMLInputElement);
    this.setState({ isVisitOnce });
  }

  handleModalMove = (x: number, y: number): void => {
    const { ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(x, y);
  }

  toggleScopedObjectModal = (): void => {
    const { ACTION_TOGGLE_SO_PICKER_MODAL } = this.props;
    ACTION_TOGGLE_SO_PICKER_MODAL();
  }

  applyChanges = (): void => {
    const { ACTION_UPDATE_NODE } = this.props;
    ACTION_UPDATE_NODE(this.state, true);
  }

  render() {
    const {
      color, title, isVisitOnce, linkStyle, text,
    } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview, classes,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      <ModalWrapper
        ref={instance => connectDragPreview(instance)}
        x={x}
        y={y}
      >
        <ModalHeader ref={instance => connectDragSource(instance)}>
          <h4>Node Editor</h4>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={this.toggleScopedObjectModal}
          >
            Object Picker
          </Button>
          <ModalHeaderButton
            type="button"
            onClick={this.handleCloseModal}
          >
            <ScaleIcon />
          </ModalHeaderButton>
        </ModalHeader>
        <ModalBody>
          <article>
            <OutlinedInput
              name="title"
              label="Title"
              value={title}
              onChange={this.handleInputChange}
              fullWidth
            />
          </article>
          <ArticleItem>
            <OutlinedSelect
              label="Links Style"
              name="linkStyle"
              labelWidth={80}
              value={LINK_STYLES[linkStyle - 1]}
              values={LINK_STYLES}
              onChange={this.handleStyleChange}
              limitMaxWidth
            />
            <ColorPicker
              label="Color"
              color={color}
              onChange={this.handleColorChange}
            />
            <Switch
              label="Visit Once"
              labelPlacement="start"
              checked={isVisitOnce}
              onChange={this.handleVisitOnceChange}
            />
          </ArticleItem>
          <article>
            <TextEditor
              text={text}
              ref={this.textEditorRef}
              onChange={this.handleTextChange}
            />
          </article>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="contained"
            color="primary"
            onClick={this.applyChanges}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ modals }) => ({ ...modals[MODALS_NAMES.NODE_EDITOR_MODAL] });

const mapDispatchToProps = dispatch => ({
  ACTION_UPDATE_NODE: (nodeData: NodeType, isShowNotification: boolean) => {
    dispatch(mapActions.ACTION_UPDATE_NODE(nodeData, isShowNotification));
  },
  ACTION_UNFOCUS_NODE: (nodeId: number) => {
    dispatch(mapActions.ACTION_UNFOCUS_NODE(nodeId));
  },
  ACTION_SET_POSITION_MODAL: (x: number, y: number) => {
    dispatch(modalActions.ACTION_SET_POSITION_MODAL(
      MODALS_NAMES.NODE_EDITOR_MODAL,
      x,
      y,
    ));
  },
  ACTION_TOGGLE_SO_PICKER_MODAL: () => {
    dispatch(modalActions.ACTION_TOGGLE_MODAL(
      MODALS_NAMES.SO_PICKER_MODAL,
    ));
  },
});

/*
  It describes how the drop target reacts to the drag and drop events.
  See docs here: http://react-dnd.github.io/react-dnd/docs/api/drag-source#parameters
*/
const spec = {
  beginDrag: props => props,
  endDrag: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return;
    }

    const dropResult = monitor.getDropResult();

    if (!dropResult) {
      return;
    }

    const { x: offsetX, y: offsetY } = dropResult;
    const x = offsetX + props.x;
    const y = offsetY + props.y;

    component.handleModalMove(x, y);
  },
};

/*
  It should return a plain object of the props to inject into your component.
  It receives two parameters: connect and monitor.
  See docs here: http://react-dnd.github.io/react-dnd/docs/api/drag-source#parameters
*/
const collect = (conn, monitor) => ({
  connectDragSource: conn.dragSource(),
  connectDragPreview: conn.dragPreview(),
  isDragging: monitor.isDragging(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(
    DragSource(
      DND_CONTEXTS.VIEWPORT,
      spec,
      collect,
    )(NodeEditor),
  ),
);
