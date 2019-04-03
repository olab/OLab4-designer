// @flow
import React from 'react';
import { shallow } from 'enzyme';

import ToolbarGroup from '.';

describe('<ToolbarGroup />', () => {
  let output = {};
  let group;
  beforeEach(() => {
    group = {
      id: 'id',
      order: 0,
      itemList: [{
        id: 'itemId',
        name: 'itemName',
        icon: 'itemIcon',
        mouseIcon: 'itemMouseIcon',
        order: 0,
        label: 'itemLabel',
      }],
    };
    output = shallow(
      <ToolbarGroup
        group={group}
      />,
    );
  });

  it('renders successfully', () => {
    expect(output.getElement()).not.toBeNull();
    expect(output.props().className).toEqual('toolbar-group');
  });
});
