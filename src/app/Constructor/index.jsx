// @flow
import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';

import ToolbarTemplates from './Toolbars';
import Graph from './Graph';

import './styles.scss';

type Props = {};

type State = {
  isFullScreen: boolean;
};

class Constructor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFullScreen: false,
    };
  }

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
              fullscreenHandle={this.toggleFullScreen}
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
