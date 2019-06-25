// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, InputLabel } from '@material-ui/core';
import { SwapVertRounded as ReverseIcon } from '@material-ui/icons';

import Slider from './Slider';
import Switch from './Switch';
import ColorPicker from './ColorPicker';
import OutlinedInput from '../../../shared/components/OutlinedInput';
import OutlinedSelect from '../../../shared/components/OutlinedSelect';
import ScaleIcon from '../../../shared/assets/icons/cross.svg';

import type { EdgeData as LinkDataType } from '../../Constructor/Graph/Edge/types';
import type { ILinkEditorProps, ILinkEditorState } from './types';

import * as modalActions from '../action';
import * as graphActions from '../../reducers/map/action';
import { DndContexts, ModalsNames } from '../config';
import {
  LINK_VARIANTS,
  THICKNESS_MIN,
  THICKNESS_MAX,
  THICKNESS_STEP,
} from './config';

import styles, {
  LinkEditorBody,
  LinkEditorFooter,
  ActionButton,
  ChangeDirectionWrapper,
} from './styles';
import { ModalWrapper, ModalHeader } from '../styles';

class LinkEditor extends PureComponent<ILinkEditorProps, ILinkEditorState> {
  defaultLinkProps: LinkDataType | null;

  isLinkHasSibling: boolean = false;

  constructor(props: ILinkEditorProps) {
    super(props);

    this.state = {
      ...props.link,
      shouldUpdateVisual: false,
    };

    this.defaultLinkProps = {
      ...props.link,
    };

    this.isLinkHasSibling = this.checkIfLinkHasSibling(props.link);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: ILinkEditorProps) {
    const { link } = nextProps;
    const { id: linkId } = this.state;
    const { ACTION_UPDATE_EDGE_VISUAL } = this.props;

    if (link.id !== linkId) {
      ACTION_UPDATE_EDGE_VISUAL(this.defaultLinkProps);

      this.isLinkHasSibling = this.checkIfLinkHasSibling(link);

      this.defaultLinkProps = {
        ...link,
      };

      this.setState({
        ...link,
      });
    }
  }

  componentDidUpdate() {
    const { shouldUpdateVisual, ...link } = this.state;
    const { ACTION_UPDATE_EDGE_VISUAL } = this.props;

    if (shouldUpdateVisual) {
      ACTION_UPDATE_EDGE_VISUAL(link);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ shouldUpdateVisual: false });
    }
  }

  handleCloseModal = (): void => {
    const { ACTION_DESELECT_ITEM, ACTION_UPDATE_EDGE_VISUAL } = this.props;

    ACTION_UPDATE_EDGE_VISUAL(this.defaultLinkProps);
    ACTION_DESELECT_ITEM();
  }

  handleModalMove = (x: number, y: number): void => {
    const { ACTION_SET_POSITION_MODAL } = this.props;
    ACTION_SET_POSITION_MODAL(x, y);
  }

  handleSwitchChange = (e: Event, checked: boolean, name: string): void => {
    this.setState({
      [name]: checked,
      shouldUpdateVisual: true,
    });
  }

  handleInputChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);

    this.setState({
      [name]: value,
      shouldUpdateVisual: true,
    });
  }

  handleVariantChange = (e: Event): void => {
    const { value, name } = (e.target: window.HTMLInputElement);
    const index = LINK_VARIANTS.findIndex(variant => variant === value);

    this.setState({
      [name]: index + 1,
      shouldUpdateVisual: true,
    });
  }

  handleSliderChange = (e: Event, thickness: number): void => {
    this.setState({
      thickness,
      shouldUpdateVisual: true,
    });
  };

  handleColorChange = (color: string): void => {
    this.setState({
      color,
      shouldUpdateVisual: true,
    });
  }

  handleDirectionChange = (): void => {
    const { source, target } = this.state;

    this.setState({
      source: target,
      target: source,
      shouldUpdateVisual: true,
    });
  }

  applyChanges = (): void => {
    const { shouldUpdateVisual, ...link } = this.state;
    const { ACTION_UPDATE_EDGE } = this.props;

    ACTION_UPDATE_EDGE(link);

    this.defaultLinkProps = {
      ...link,
    };
  }

  checkIfLinkHasSibling = ({ source: linkSource, target: linkTarget }: LinkDataType) => {
    const { links } = this.props;

    return links
      .some(({ data: { source, target } }) => source === linkTarget && target === linkSource);
  }

  render() {
    const {
      label, color, variant, thickness, isHidden,
    } = this.state;
    const {
      x, y, isDragging, connectDragSource, connectDragPreview, layoutEngineType, classes,
    } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      <ModalWrapper
        x={x}
        y={y}
        ref={instance => connectDragPreview(instance)}
      >
        <ModalHeader ref={instance => connectDragSource(instance)}>
          <h4>Link Editor</h4>
          <button
            type="button"
            onClick={this.handleCloseModal}
          >
            <ScaleIcon />
          </button>
        </ModalHeader>
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
              label="Style"
              name="variant"
              labelWidth={40}
              value={LINK_VARIANTS[variant - 1]}
              values={LINK_VARIANTS}
              onChange={this.handleVariantChange}
            />
          </article>
          <article>
            <Slider
              label="Thickness"
              value={thickness}
              min={THICKNESS_MIN}
              max={THICKNESS_MAX}
              step={THICKNESS_STEP}
              onChange={this.handleSliderChange}
            />
          </article>
          <article>
            <Switch
              name="isHidden"
              label="Hidden"
              labelPlacement="start"
              checked={isHidden}
              onChange={this.handleSwitchChange}
            />
            {layoutEngineType !== 'VerticalTree' && !this.isLinkHasSibling && (
              <ChangeDirectionWrapper>
                <InputLabel>Change Direction</InputLabel>
                <IconButton
                  aria-label="Change Link Direction"
                  title="Change Link Direction"
                  size="small"
                  classes={{ root: classes.reverseIcon }}
                  onClick={this.handleDirectionChange}
                >
                  <ReverseIcon />
                </IconButton>
              </ChangeDirectionWrapper>
            )}
          </article>
          <article>
            <ColorPicker
              label="Color"
              color={color}
              onChange={this.handleColorChange}
            />
          </article>
        </LinkEditorBody>
        <LinkEditorFooter>
          <ActionButton onClick={this.applyChanges}>
            Save
          </ActionButton>
        </LinkEditorFooter>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ map, modals, constructor }) => ({
  ...modals.linkEditorModal,
  links: map.edges,
  layoutEngineType: constructor.layoutEngineType,
});

const mapDispatchToProps = dispatch => ({
  ACTION_UPDATE_EDGE: (edgeData: LinkDataType) => {
    dispatch(graphActions.ACTION_UPDATE_EDGE(edgeData));
  },
  ACTION_UPDATE_EDGE_VISUAL: (edgeData: LinkDataType) => {
    dispatch(graphActions.ACTION_UPDATE_EDGE_VISUAL(edgeData));
  },
  ACTION_DESELECT_ITEM: () => {
    dispatch(graphActions.ACTION_SELECT_ITEM(null));
  },
  ACTION_SET_POSITION_MODAL: (x: number, y: number) => {
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
