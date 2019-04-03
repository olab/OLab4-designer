// @flow
import React from 'react';

import { shallow } from 'enzyme';

import { NodeText } from '.';

describe('<NodeText />', () => {
  let output = {};
  let nodeData;
  beforeEach(() => {
    nodeData = {
      title: 'Test',
    };
    output = shallow(
      <NodeText
        data={nodeData}
        isSelected={false}
      />,
    );
  });

  describe('render method', () => {
    it('renders', () => {
      expect(output.getElement()).not.toBeNull();
      expect(output.props().className).toEqual('node-text');
      const tspan = output.find('tspan');
      expect(tspan.at(0).text()).toEqual('Test');
      expect(tspan.at(0).props().x).toEqual(0);
      expect(tspan.at(0).props().dy).toEqual(18);
      const title = output.find('title');
      expect(title.at(0).text()).toEqual('Test');
    });

    it('renders as selected', () => {
      output.setProps({
        isSelected: true,
      });
      expect(output.props().className).toEqual('node-text selected');
    });

    it('does not render a title element when there is no title', () => {
      nodeData.title = '';
      output.setProps({
        nodeData,
      });
      const tspan = output.find('tspan');
      const title = output.find('title');
      expect(tspan.length).toEqual(1);
      expect(title.length).toEqual(1);
    });
  });
});
