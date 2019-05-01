// @flow
// eslint-disable-next-line no-unused-vars
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { GithubPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import { Switch, FormControlLabel, TextField } from '@material-ui/core';

import ScaleIcon from '../../../shared/assets/icons/cross.svg';

import * as modalActions from '../action';
import * as graphActions from '../../Constructor/action';
import type { EdgeData as EdgeDataType } from '../../Constructor/types';
import type {
  IColorType,
  ILinkEditorProps,
  ILinkEditorState,
} from './types';
import { DndContexts, ModalsNames } from '../config';

import styles, {
  LinkEditorWrapper,
  LinkEditorHeader,
  LinkEditorBody,
  LinkEditorFooter,
  ActionButton,
  LinkColorItem,
  ColorPickerWrapper,
  GithubPickerWrapper,
} from './styles';

class LinkEditor extends PureComponent<ILinkEditorProps, ILinkEditorState> {
  constructor(props: ILinkEditorProps) {
    super(props);

    const { link } = this.props;
    this.state = {
      ...link,
      isShowColorPicker: false,
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

  handleHide = (e: Event): void => {
    const { checked } = (e.target: window.HTMLInputElement);
    this.setState({
      isHidden: checked,
    });
  }

  handleColorChange = (color: IColorType): void => {
    const { hex } = color;

    this.setState({
      color: hex,
      isShowColorPicker: false,
    });
  }

  toggleColorPicker = (): void => {
    this.setState(({ isShowColorPicker }) => ({
      isShowColorPicker: !isShowColorPicker,
    }));
  }

  closeColorPicker = (e: Event): void => {
    if (!e.target.closest('.color-picker')) {
      this.setState({
        isShowColorPicker: false,
      });
    }
  }

  handleLabelChange = (e: Event): void => {
    const { value } = (e.target: window.HTMLInputElement);

    this.setState({
      label: value,
    });
  }

  handleApplyChanges = (): void => {
    const { ACTION_UPDATE_EDGE, link } = this.props;
    const { isShowColorPicker, ...rest } = this.state;

    ACTION_UPDATE_EDGE({
      id: link.id,
      ...rest,
    });
  }

  render() {
    const {
      label, color, isHidden, isShowColorPicker,
    } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview, classes,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      <LinkEditorWrapper
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        onClick={this.closeColorPicker}
        ref={instance => connectDragPreview(instance)}
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
            <TextField
              type="text"
              label="Label"
              value={label}
              onChange={this.handleLabelChange}
              margin="none"
              variant="outlined"
              fullWidth
            />
          </article>
          <ColorPickerWrapper>
            <span>Link color</span>
            <div className="color-picker">
              <LinkColorItem
                color={color}
                onClick={this.toggleColorPicker}
              />
              {isShowColorPicker && (
                <GithubPickerWrapper>
                  <GithubPicker
                    color={color}
                    onChange={this.handleColorChange}
                  />
                </GithubPickerWrapper>
              )}
            </div>
          </ColorPickerWrapper>
          <article>
            <FormControlLabel
              label="Hidden"
              labelPlacement="start"
              classes={{
                root: classes.formControlRoot,
              }}
              control={(
                <Switch
                  classes={{
                    switchBase: classes.iOSSwitchBase,
                    bar: classes.iOSBar,
                    icon: classes.iOSIcon,
                    iconChecked: classes.iOSIconChecked,
                    checked: classes.iOSChecked,
                  }}
                  disableRipple
                  checked={isHidden}
                  onChange={this.handleHide}
                />
              )}
            />
          </article>
        </LinkEditorBody>
        <LinkEditorFooter>
          <ActionButton
            onClick={this.handleCloseModal}
          >
            Close
          </ActionButton>
          <ActionButton
            blue
            onClick={this.handleApplyChanges}
          >
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
  withStyles(styles)(
    DragSource(
      DndContexts.VIEWPORT,
      spec,
      collect,
    )(LinkEditor),
  ),
);
