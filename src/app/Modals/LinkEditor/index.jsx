// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import Slider from './Slider';
import Switch from './Switch';
import ColorPicker from './ColorPicker';
import OutlinedInput from './OutlinedInput';
import OutlinedSelect from './OutlinedSelect';
import ScaleIcon from '../../../shared/assets/icons/cross.svg';

import type {
  EdgeData as EdgeDataType,
} from '../../Constructor/Graph/Edge/types';
import type {
  ILinkEditorProps,
  ILinkEditorState,
} from './types';

import * as modalActions from '../action';
import * as graphActions from '../../Constructor/action';
import { DndContexts, ModalsNames } from '../config';

import {
  LinkEditorWrapper,
  LinkEditorHeader,
  LinkEditorBody,
  LinkEditorFooter,
  ActionButton,
} from './styles';

class LinkEditor extends Component<ILinkEditorProps, ILinkEditorState> {
  linkVariants: Array<string> = [
    'Standard',
    'Dashed',
    'Dotted',
  ];

  constructor(props: ILinkEditorProps) {
    super(props);

    const { link } = this.props;
    this.state = {
      ...link,
    };
  }

  static getDerivedStateFromProps(nextProps: ILinkEditorProps, state: ILinkEditorState) {
    const { link } = nextProps;

    if (link.id !== state.id) {
      return {
        ...state,
        ...link,
      };
    }

    return null;
  }

  handleCloseModal = (): void => {
    const { ACTION_DESELECT_ITEM } = this.props;
    ACTION_DESELECT_ITEM();
  }

  handleModalMove = (x: number, y: number): void => {
    const { ACTION_SET_POSITION_LINK_EDITOR_MODAL } = this.props;
    ACTION_SET_POSITION_LINK_EDITOR_MODAL(x, y);
  }

  handleHiddenChange = (e: Event): void => {
    const { checked: isHidden } = (e.target: window.HTMLInputElement);
    this.setState({ isHidden });
  }

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    this.setState({ [name]: value });
  }

  handleSliderChange = (e: Event, thickness: number): void => {
    this.setState({ thickness });
  };

  handleColorChange = (color: string): void => {
    this.setState({ color });
  }

  applyChanges = (): void => {
    const { ACTION_UPDATE_EDGE } = this.props;
    ACTION_UPDATE_EDGE(this.state);
  }

  render() {
    const {
      label, color, variant, thickness, isHidden,
    } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      <LinkEditorWrapper
        ref={instance => connectDragPreview(instance)}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        <LinkEditorHeader ref={instance => connectDragSource(instance)}>
          <h4>Link Editor</h4>
          <button
            type="button"
            onClick={this.handleCloseModal}
          >
            <ScaleIcon />
          </button>
        </LinkEditorHeader>
        <LinkEditorBody>
          <article>
            <OutlinedInput
              name="label"
              label="Label"
              value={label}
              onChange={this.handleInputChange}
              fullWidth
            />
          </article>
          <article>
            <OutlinedSelect
              label="Variant"
              name="variant"
              labelWidth={55}
              value={variant}
              values={this.linkVariants}
              onChange={this.handleInputChange}
            />
          </article>
          <article>
            <Slider
              label="Thickness"
              value={thickness}
              min={1}
              max={15}
              onChange={this.handleSliderChange}
            />
          </article>
          <article>
            <ColorPicker
              label="Color"
              color={color}
              onChange={this.handleColorChange}
            />
          </article>
          <article>
            <Switch
              label="Hidden"
              labelPlacement="start"
              checked={isHidden}
              onChange={this.handleHiddenChange}
            />
          </article>
        </LinkEditorBody>
        <LinkEditorFooter>
          <ActionButton onClick={this.handleCloseModal}>
            Close
          </ActionButton>
          <ActionButton onClick={this.applyChanges} blue>
            Apply
          </ActionButton>
        </LinkEditorFooter>
      </LinkEditorWrapper>
    );
  }
}

const mapStateToProps = ({ modals: { linkEditorModal } }) => ({ ...linkEditorModal });

const mapDispatchToProps = dispatch => ({
  ACTION_UPDATE_EDGE: (edgeData: EdgeDataType) => {
    dispatch(graphActions.ACTION_UPDATE_EDGE(edgeData));
  },
  ACTION_DESELECT_ITEM: () => {
    dispatch(graphActions.ACTION_SELECT_ITEM(null));
  },
  ACTION_SET_POSITION_LINK_EDITOR_MODAL: (x: number, y: number) => {
    dispatch(modalActions.ACTION_SET_POSITION_MODAL(
      ModalsNames.LINK_EDITOR_MODAL,
      x,
      y,
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
  DragSource(
    DndContexts.VIEWPORT,
    spec,
    collect,
  )(LinkEditor),
);
