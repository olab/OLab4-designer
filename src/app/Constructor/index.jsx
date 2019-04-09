// @flow
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Fullscreen from 'react-full-screen';

import Graph from './Graph';
import ToolbarTemplates from './Toolbars';

import type {
  IConstructorProps,
  IConstructorState,
} from './types';

export class Constructor extends Component<IConstructorProps, IConstructorState> {
  state = {
    isFullScreen: false,
  };

  changeIfFullScreen = (isFullScreen: boolean) => {
    this.setState({ isFullScreen });
  };

  toggleFullScreen = () => {
    this.setState(({ isFullScreen }) => ({ isFullScreen: !isFullScreen }));
  };

  render() {
    const { isFullScreen } = this.state;

    return (
      <div className="constructor">
        <Fullscreen
          enabled={isFullScreen}
          onChange={this.changeIfFullScreen}
        >
          <ToolbarTemplates
            fullscreenHandler={this.toggleFullScreen}
            isFullScreen={isFullScreen}
          />

          <Graph
            isFullScreen={isFullScreen}
          />
        </Fullscreen>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Constructor);
