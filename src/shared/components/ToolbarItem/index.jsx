// @flow
import React, { Component } from 'react';

import type { ToolbarItem as ToolbarItemType } from '../../../store/initialState';

import './toolbarItem.scss';


type Props = {
  item: ToolbarItemType,
};

type State = {
  expand: string,
};


class ToolbarItem extends Component<Props, State> {
  render() {
    const { item } = this.props;

    return (
      <div key={item.id} className="toolbar-item" onClick={item.onClick} aria-hidden="true">
        <img alt={item.label} src={item.icon} />
      </div>
    );
  }
}

export default ToolbarItem;
