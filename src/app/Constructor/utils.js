// @flow
import type { Node as NodeType } from './Graph/Node/types';
import type { Edge as EdgeType } from './Graph/Edge/types';

export const getFocusedNode = (nodes: Array<NodeType>): NodeType | null => {
  const focusedNode = nodes.find(({ isFocused }) => isFocused);

  if (focusedNode) {
    return focusedNode;
  }

  return null;
};

export const getSelectedEdge = (edges: Array<EdgeType>): EdgeType | null => {
  const selectedLink = edges.find(({ isSelected }) => isSelected);

  if (selectedLink) {
    return selectedLink;
  }

  return null;
};
