// @flow
import * as React from 'react';
import { GraphUtils } from 'react-digraph';

type ISidebarProps = {
  children: any;
  direction?: 'left' | 'right' | 'up' | 'down';
  size?: number | string;
};

type ISidebarState = {
  sidebarClass?: string | null;
};

const sidebarClassEnum = {
  CLOSED: 'closed',
  OPEN: 'open',
};

const directionOpposites = {
  down: 'up',
  left: 'right',
  right: 'left',
  up: 'down',
};

export default class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
  static defaultProps = {
    direction: 'left',
    size: '130px',
  };

  static state = {
    sidebarClass: sidebarClassEnum.OPEN,
  };

  getContainerClasses = (): string => {
    const { sidebarClass } = this.state;
    const classes = ['sidebar-main-container'];
    classes.push(sidebarClass || '');
    return GraphUtils.classNames(classes);
  };

  getContainerStyle = (size: number | string, direction: string) => {
    if (direction === 'up' || direction === 'down') {
      return { height: `${size}`, maxHeight: `${size}` };
    }
    return { width: `${size}`, maxWidth: `${size}` };
  };

  getArrowIconClasses = (direction: string): string => {
    const classes = ['icon'];
    const { sidebarClass } = this.state;

    if (sidebarClass === sidebarClass.CLOSED) {
      classes.push(`icon_${directionOpposites[direction]}-arrow`);
    } else {
      classes.push(`icon_${direction}-arrow`);
    }
    return GraphUtils.classNames(classes);
  };


  toggleContainer = () => {
    const { sidebarClass } = this.state;

    this.setState({
      sidebarClass: sidebarClass === sidebarClass.CLOSED ? sidebarClass.OPEN : sidebarClass.CLOSED,
    });
  };

  render() {
    const { children, direction, size } = this.props;
    const sidebarClassName = GraphUtils.classNames('sidebar', direction);

    return (
      <div className={sidebarClassName}>
        <div
          className={this.getContainerClasses()}
          style={this.getContainerStyle(size, direction)}
          role="presentation"
        >
          {children}
        </div>
        <div
          className="sidebar-toggle-bar"
          onClick={this.toggleContainer}
          role="presentation"
        >
          <i className={this.getArrowIconClasses(direction)} />
        </div>
      </div>
    );
  }
}
