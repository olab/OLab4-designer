// @flow
import React from 'react';
import cloneDeep from 'lodash.clonedeep';
import { shallow } from 'enzyme';

import { Toolbars } from '.';
import { initialModalsState } from '../../Modals/reducer';

describe('<Toolbars />', () => {
  let output = {};
  let metaModal;
  let fullscreenHandler;
  let isFullScreen;
  let isUndoAvailable;
  let isRedoAvailable;
  let ACTION_UNDO_MAP;
  let ACTION_REDO_MAP;
  let ACTION_SET_ZOOM_CONTROLS_REF;
  let ACTION_TOGGLE_META_MODAL;
  let ACTION_SET_POSITION_META_MODAL;
  beforeEach(() => {
    metaModal = initialModalsState;
    isFullScreen = false;
    isUndoAvailable = false;
    isRedoAvailable = false;
    fullscreenHandler = jest.fn();
    ACTION_UNDO_MAP = jest.fn();
    ACTION_REDO_MAP = jest.fn();
    ACTION_SET_ZOOM_CONTROLS_REF = jest.fn();
    ACTION_TOGGLE_META_MODAL = jest.fn();
    ACTION_SET_POSITION_META_MODAL = jest.fn();

    output = shallow(
      <Toolbars
        classes={{}}
        fullscreenHandler={fullscreenHandler}
        metaModal={metaModal}
        isFullScreen={isFullScreen}
        isUndoAvailable={isUndoAvailable}
        isRedoAvailable={isRedoAvailable}
        ACTION_UNDO_MAP={ACTION_UNDO_MAP}
        ACTION_REDO_MAP={ACTION_REDO_MAP}
        ACTION_SET_ZOOM_CONTROLS_REF={ACTION_SET_ZOOM_CONTROLS_REF}
        ACTION_TOGGLE_META_MODAL={ACTION_TOGGLE_META_MODAL}
        ACTION_SET_POSITION_META_MODAL={ACTION_SET_POSITION_META_MODAL}
      />,
    );
  });

  describe('render method', () => {
    it('renders', () => {
      expect(output.getElement()).not.toBeNull();
    });
  });

  describe('toggleShowMetaModal method', () => {
    let e;
    beforeEach(() => {
      e = {
        target: {
          closest: jest.fn().mockReturnValue({
            getClientRects: jest.fn().mockReturnValue([{
              x: 50,
              y: 50,
              width: 100,
              height: 100,
            }]),
          }),
        },
      };
    });

    it('should fire ACTION_SET_POSITION_META_MODAL redux action', () => {
      output.instance().toggleShowMetaModal(e);
      expect(ACTION_SET_POSITION_META_MODAL).toHaveBeenCalled();
      expect(ACTION_TOGGLE_META_MODAL).toHaveBeenCalled();
    });

    it('should not fire ACTION_SET_POSITION_META_MODAL redux action', () => {
      const metaM = cloneDeep(initialModalsState);
      metaM.isShow = true;
      output.setProps({
        metaModal: metaM,
      });
      output.instance().toggleShowMetaModal(e);
      expect(ACTION_SET_POSITION_META_MODAL).not.toHaveBeenCalled();
      expect(ACTION_TOGGLE_META_MODAL).toHaveBeenCalled();
    });
  });

  describe('onRedo method', () => {
    it('should reject undo graph cause of it is not available', () => {
      output.instance().onUndo();
      expect(ACTION_UNDO_MAP).not.toHaveBeenCalled();
    });

    it('should make undo of current graph state', () => {
      output.setProps({
        isUndoAvailable: true,
      });
      output.instance().onUndo();
      expect(ACTION_UNDO_MAP).toHaveBeenCalled();
    });
  });

  describe('onRedo method', () => {
    it('should reject redo graph cause of it is not available', () => {
      output.instance().onRedo();
      expect(ACTION_REDO_MAP).not.toHaveBeenCalled();
    });

    it('should fire redo of previous graph state', () => {
      output.setProps({
        isRedoAvailable: true,
      });
      output.instance().onRedo();
      expect(ACTION_REDO_MAP).toHaveBeenCalled();
    });
  });
});
