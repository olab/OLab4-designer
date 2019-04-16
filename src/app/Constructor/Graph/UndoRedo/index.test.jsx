// @flow

import React from 'react';

import { mount } from 'enzyme';
import { GraphUndoRedoButtons } from '.';

describe('<GraphUndoRedoButtons />', () => {
  const classes = {};
  let wrapper;
  let ACTION_UNDO_GRAPH;
  let ACTION_REDO_GRAPH;

  beforeEach(() => {
    ACTION_UNDO_GRAPH = jest.fn();
    ACTION_REDO_GRAPH = jest.fn();
    wrapper = mount(<GraphUndoRedoButtons
      classes={classes}
      ACTION_UNDO_GRAPH={ACTION_UNDO_GRAPH}
      ACTION_REDO_GRAPH={ACTION_REDO_GRAPH}
      isUndoAvailable
      isRedoAvailable
    />);
  });

  it('renders successfully', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('have two child components', () => {
    expect(wrapper.find('svg')).toHaveLength(2);
  });

  it('call ACTION_UNDO_GRAPH on click', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(ACTION_UNDO_GRAPH).toBeCalled();
  });

  it('call ACTION_REDO_GRAPH on click', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(ACTION_REDO_GRAPH).toBeCalled();
  });

  it('not call ACTION_UNDO_GRAPH and ACTION_REDO_GRAPH when Undo and Redo buttons are disabled', () => {
    wrapper.setProps({
      isUndoAvailable: false,
      isRedoAvailable: false,
    });
    wrapper.find('button').at(0).simulate('click');
    wrapper.find('button').at(1).simulate('click');
    expect(ACTION_UNDO_GRAPH).not.toBeCalled();
    expect(ACTION_REDO_GRAPH).not.toBeCalled();
  });
});
