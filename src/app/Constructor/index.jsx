// @flow
import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';

import Graph from './Graph';
import ToolbarTemplates from './Toolbars';

import type {
  IConstructorProps,
  IConstructorState,
} from './types';

import './styles.scss';

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
          <div className="full-screenable-node">

            <ToolbarTemplates
              fullscreenHandler={this.toggleFullScreen}
              isFullScreen={isFullScreen}
            />

            <Graph
              isFullScreen={isFullScreen}
            />

          </div>
        </Fullscreen>
      </div>
    );
  }
}

export default Constructor;
