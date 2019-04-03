// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { Toolbars } from '.';

describe('<Toolbars />', () => {
  let output = {};
  let fullscreenHandler;
  let isFullScreen;
  let isUndoAvailable;
  let isRedoAvailable;
  let ACTION_UNDO_GRAPH;
  let ACTION_REDO_GRAPH;
  let ACTION_SET_ZOOM_CONTROLS_REF;
  beforeEach(() => {
    isFullScreen = false;
    isUndoAvailable = false;
    isRedoAvailable = false;
    fullscreenHandler = jest.fn();
    ACTION_UNDO_GRAPH = jest.fn();
    ACTION_REDO_GRAPH = jest.fn();
    ACTION_SET_ZOOM_CONTROLS_REF = jest.fn();

    output = shallow(
      <Toolbars
        fullscreenHandler={fullscreenHandler}
        isFullScreen={isFullScreen}
        isUndoAvailable={isUndoAvailable}
        isRedoAvailable={isRedoAvailable}
        ACTION_UNDO_GRAPH={ACTION_UNDO_GRAPH}
        ACTION_REDO_GRAPH={ACTION_REDO_GRAPH}
        ACTION_SET_ZOOM_CONTROLS_REF={ACTION_SET_ZOOM_CONTROLS_REF}
      />,
    );
  });

  describe('render method', () => {
    it('renders', () => {
      expect(output.getElement()).not.toBeNull();
    });
  });

  describe('onRedo method', () => {
    it('should reject undo graph cause of it is not available', () => {
      output.instance().onUndo();
      expect(ACTION_UNDO_GRAPH).not.toHaveBeenCalled();
    });

    it('should make undo of current graph state', () => {
      output.setProps({
        isUndoAvailable: true,
      });
      output.instance().onUndo();
      expect(ACTION_UNDO_GRAPH).toHaveBeenCalled();
    });
  });

  describe('onRedo method', () => {
    it('should reject redo graph cause of it is not available', () => {
      output.instance().onRedo();
      expect(ACTION_REDO_GRAPH).not.toHaveBeenCalled();
    });

    it('should fire redo of previous graph state', () => {
      output.setProps({
        isRedoAvailable: true,
      });
      output.instance().onRedo();
      expect(ACTION_REDO_GRAPH).toHaveBeenCalled();
    });
  });
});
