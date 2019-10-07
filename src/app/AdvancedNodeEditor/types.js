// @flow
import type { Node } from '../Constructor/Graph/Node/types';

export type AdvancedNodeEditorProps = {
  classes: {
    [prop: string]: any,
  },
  node: Node,
  match: any,
  ACTION_UPDATE_NODE: Function,
  ACTION_GET_NODE: Function,
};
