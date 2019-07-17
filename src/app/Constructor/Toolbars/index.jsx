// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ToolbarGroup from '../../../shared/components/ToolbarGroup';
import GraphUndoRedoButtons from '../Graph/UndoRedo';
import MapTitle from './MapTitle';

import type { IToolbarsProps, IToolbarsState } from './types';

import { CONFIRMATION_MODALS } from '../config';
import { MODALS_NAMES } from '../../Modals/config';

import addNewIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-addnew.png';
import templateIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-template.png';
import fullscreenIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-fullscreen.png';
import questionIcon from '../../../shared/assets/icons/toolbar/templates/meta-question.png';
import createTemplateFromMapIcon from '../../../shared/assets/icons/create_template.png';

import * as constructorActions from '../action';
import * as mapActions from '../../reducers/map/action';
import * as modalActions from '../../Modals/action';

import styles, { Block, LabTitleItem } from './styles';

export class Toolbars extends Component<IToolbarsProps, IToolbarsState> {
  constructor(props: IToolbarsProps) {
    super(props);

    const { ACTION_TOGGLE_FULLSCREEN, showModal } = props;

    this.state = {
      toolbars: {
        id: 'toolbars',
        order: 10,
        itemList: [
          {
            id: 'addNew',
            name: 'add_new',
            icon: addNewIcon,
            mouseIcon: 'template_mouse_icon',
            order: 30,
            label: 'Add New',
          },
          {
            id: 'template',
            name: 'template',
            icon: templateIcon,
            mouseIcon: 'template_mouse_icon',
            order: 40,
            label: 'Choose template',
            onClick: () => showModal(CONFIRMATION_MODALS.PRE_BUILT_TEMPLATES),
          },
          {
            id: 'createTemplateFromMap',
            name: 'createTemplateFromMap',
            icon: createTemplateFromMapIcon,
            mouseIcon: 'template_mouse_icon',
            order: 60,
            label: 'Create Template From Map',
            onClick: () => showModal(CONFIRMATION_MODALS.CREATE_TEMPLATE),
          },
          {
            id: 'question',
            name: 'question',
            icon: questionIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'Tutorial',
            onClick: this.toggleShowSOPickerModal,
          },
        ],
      },
      right: {
        id: 'right',
        order: 20,
        itemList: [
          {
            id: 'fullscreen',
            name: 'fullscreen',
            icon: fullscreenIcon,
            mouseIcon: 'template_mouse_icon',
            onClick: ACTION_TOGGLE_FULLSCREEN,
            order: 10,
            label: 'Go to fullscreen',
          },
        ],
      },
    };

    this.zoomControlsRef = React.createRef();
  }

  componentDidMount() {
    const { ACTION_SET_ZOOM_CONTROLS_REF } = this.props;
    ACTION_SET_ZOOM_CONTROLS_REF(this.zoomControlsRef.current);
  }

  toggleShowSOPickerModal = () => {
    const { ACTION_TOGGLE_MODAL } = this.props;

    ACTION_TOGGLE_MODAL();
  }

  onUndo = () => {
    const { ACTION_UNDO_MAP, isUndoAvailable } = this.props;

    if (!isUndoAvailable) {
      return;
    }

    ACTION_UNDO_MAP();
  }

  onRedo = () => {
    const { ACTION_REDO_MAP, isRedoAvailable } = this.props;

    if (!isRedoAvailable) {
      return;
    }

    ACTION_REDO_MAP();
  }

  zoomControlsRef: { current: null | HTMLDivElement };

  render() {
    const { expand, toolbars, right } = this.state;
    const { isUndoAvailable, isRedoAvailable, classes } = this.props;

    return (
      <>
        <AppBar className={classes.positionRelative} position="fixed">
          <Block>
            <ToolbarGroup
              group={toolbars}
              expand={expand}
            />
            <GraphUndoRedoButtons
              isUndoAvailable={isUndoAvailable}
              isRedoAvailable={isRedoAvailable}
              onUndo={this.onUndo}
              onRedo={this.onRedo}
            />
          </Block>
          <Block>
            <LabTitleItem>
              <MapTitle />
            </LabTitleItem>
            <div ref={this.zoomControlsRef} />
            <ToolbarGroup group={right} />
          </Block>
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = ({ map: { undo, redo } }) => ({
  isUndoAvailable: !!undo.length,
  isRedoAvailable: !!redo.length,
});

const mapDispatchToProps = dispatch => ({
  ACTION_TOGGLE_FULLSCREEN: () => {
    dispatch(constructorActions.ACTION_TOGGLE_FULLSCREEN());
  },
  ACTION_SET_ZOOM_CONTROLS_REF: (ref: null | HTMLDivElement) => {
    dispatch(constructorActions.ACTION_SET_ZOOM_CONTROLS_REF(ref));
  },
  ACTION_UNDO_MAP: () => {
    dispatch(mapActions.ACTION_UNDO_MAP());
  },
  ACTION_REDO_MAP: () => {
    dispatch(mapActions.ACTION_REDO_MAP());
  },
  ACTION_TOGGLE_MODAL: () => {
    dispatch(modalActions.ACTION_TOGGLE_MODAL(
      MODALS_NAMES.SO_PICKER_MODAL,
    ));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(Toolbars),
);
