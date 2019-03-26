// @flow
export type IUndoRedoButtonsProps = {
  classes: any;
  isUndoAvailable: boolean;
  isRedoAvailable: boolean;
  ACTION_REDO_GRAPH: () => void;
  ACTION_UNDO_GRAPH: () => void;
};
