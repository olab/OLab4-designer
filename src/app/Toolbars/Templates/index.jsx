// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { AppBar } from '@material-ui/core';

import type { Props, State } from './types';

import ToolbarGroup from '../../../shared/components/ToolbarGroup';

import moveIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-move.png';
import selectIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-select.png';
import addNewIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-addnew.png';
import templateIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-template.png';
import flagIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-flag.png';
import undoIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-undo.png';
import redoIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-redo.png';
import previewIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-preview.png';
import dropdownIcon
  from '../../../shared/assets/icons/toolbar/templates/toolbar-arrow-dropdown.png';
import scaleIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-scale.png';
import fullscreenIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-fullscreen.png';
import settingsIcon from '../../../shared/assets/icons/toolbar/templates/toolbar-settings.png';
import questionIcon from '../../../shared/assets/icons/toolbar/templates/meta-question.png';
import assetsIcon from '../../../shared/assets/icons/toolbar/templates/meta-assets.png';
import addIcon from '../../../shared/assets/icons/toolbar/templates/meta-add.png';
import counterIcon from '../../../shared/assets/icons/toolbar/templates/meta-counter.png';
import filesIcon from '../../../shared/assets/icons/toolbar/templates/meta-files.png';

import './templates.scss';


class Templates extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { fullscreenHandle } = this.props;

    this.state = {
      expand: '',
      preview: {
        id: 'toolbars',
        order: 10,
        itemList: [
          {
            id: 'preview',
            name: 'preview',
            icon: previewIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'preview',
          },
        ],
      },
      toolbars: {
        id: 'toolbars',
        order: 10,
        itemList: [
          {
            id: 'cursors',
            name: 'cursors',
            icon: moveIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'cursors',
          },
          {
            id: 'select',
            name: 'select',
            icon: selectIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Select area',
          },
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
          },
          {
            id: 'flag',
            name: 'flag',
            icon: flagIcon,
            mouseIcon: 'template_mouse_icon',
            order: 50,
            label: 'flag',
          },
        ],
      },
      history: {
        id: 'history',
        order: 20,
        itemList: [
          {
            id: 'undo',
            name: 'undo',
            icon: undoIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'Undo',
          },
          {
            id: 'redo',
            name: 'redo',
            icon: redoIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Redo',
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
            onClick: fullscreenHandle,
            order: 10,
            label: 'Go to fullscreen',
          },
          {
            id: 'settings',
            name: 'settings',
            icon: settingsIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'settings',
          },
        ],
      },
      meta: {
        id: 'meta',
        order: 10,
        itemList: [
          {
            id: 'question',
            name: 'question',
            icon: questionIcon,
            mouseIcon: 'template_mouse_icon',
            order: 10,
            label: 'Tutorial',
          },
          {
            id: 'assets',
            name: 'assets',
            icon: assetsIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'assets',
          },
          {
            id: 'counter',
            name: 'counter',
            icon: counterIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Counter',
          },
          {
            id: 'files',
            name: 'files',
            icon: filesIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'Manage files',
          },
          {
            id: 'add',
            name: 'add',
            icon: addIcon,
            mouseIcon: 'template_mouse_icon',
            order: 20,
            label: 'add',
          },
        ],
      },
    };
  }

  render() {
    const {
      expand, toolbars, history, right, meta, preview,
    } = this.state;
    const { isFullScreen } = this.props;

    const fullScreenClass = classNames({
      'full-screen': isFullScreen,
    });

    return (
      <div className={`toolbar-templates ${fullScreenClass}`}>
        <AppBar className="appbar-templates" position="fixed">
          <div className="left">
            <ToolbarGroup group={preview} expand={expand} />
            <ToolbarGroup group={toolbars} expand={expand} />
            <ToolbarGroup group={history} expand={expand} />
          </div>
          <div className="right">
            <div className="name">
              <span className="item">Lab name</span>
              <img alt="show" src={dropdownIcon} className="item" />
            </div>
            <div className="scale">
              <span className="separator">|</span>
              <img alt="scale" src={scaleIcon} className="item" />
              <span className="item">100%</span>
              <img alt="show percentage" src={dropdownIcon} className="zoomImg" />
            </div>
            <ToolbarGroup group={right} />
          </div>
        </AppBar>
        <AppBar className={`metabar-templates ${fullScreenClass}`}>
          <ToolbarGroup group={meta} expand={expand} />
        </AppBar>
      </div>
    );
  }
}

export default Templates;
