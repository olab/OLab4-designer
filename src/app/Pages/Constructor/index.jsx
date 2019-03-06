// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fullscreen from 'react-full-screen';

import ToolbarTemplates from '../../Toolbars';
import Graph from './Graph';

import './constructor.scss';


type Props = {};

type State = {
  isFullScreen: boolean,
};

class Constructor extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
    };
  }

  changeIsFullScreen = (isFullScreen: boolean) => {
    this.setState({ isFullScreen });
  };

  toggleFullscreen = () => {
    const { isFullScreen } = this.state;
    this.setState({ isFullScreen: !isFullScreen });
  };

  render() {
    const { isFullScreen } = this.state;

    return (
      <div className="constructor">
        <Fullscreen
          enabled={isFullScreen}
          onChange={isFull => this.changeIsFullScreen(isFull)}
        >
          <div className="full-screenable-node">
            <ToolbarTemplates
              fullscreenHandle={this.toggleFullscreen}
              isFullScreen={isFullScreen}
            />
            <Graph isFullScreen={isFullScreen} />
          </div>
        </Fullscreen>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  constructor: state.constructor,
});

export default connect(mapStateToProps)(Constructor);
