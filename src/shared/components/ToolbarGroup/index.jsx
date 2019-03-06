// @flow
import React, { Component } from 'react';

import type { ToolbarGroup as ToolbarGroupType } from '../../../store/initialState';
import ToolbarItem from '../ToolbarItem';

import './toolbarGroup.scss';


type Props = {
  group: ToolbarGroupType,
};

type State = {
  expand: string,
};

class ToolbarGroup extends Component<Props, State> {
  render() {
    const { group } = this.props;

    return (
      <div key={group.id} className="toolbar-group">
        {group.itemList.map(item => <ToolbarItem key={item.id} item={item} />)}
      </div>
    );
  }
}

export default ToolbarGroup;
