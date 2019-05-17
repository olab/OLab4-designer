// @flow
import randomColor from 'randomcolor';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from './Node/config';

export const createNewNode = (x: number, y: number) => {
  const newNodeId = Date.now();
  const newNodeMapId = Number(newNodeId.toString().slice(0, 6));
  return {
    id: newNodeId,
    isSelected: true,
    expand: false,
    data: {
      id: newNodeId,
      map_id: newNodeMapId,
      title: `New Node - (${newNodeId})`,
      type_id: newNodeMapId,
      color: randomColor(),
      text: 'Dummy Text',
      links: [],
      destination_id: newNodeMapId,
      style_id: newNodeMapId,
      x,
      y,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      isCollapsed: false,
      isLocked: false,
    },
  };
};

export const createNewEdge = (sourceNodeID: number, targetNodeID: number) => {
  const newEdgeId = Date.now();
  return {
    isSelected: true,
    data: {
      id: newEdgeId,
      label: `Arrow-${newEdgeId}`,
      source: sourceNodeID,
      target: targetNodeID,
      color: '#D3DAE1',
      variant: 'Standard',
      thickness: 5,
      isHidden: false,
    },
  };
};
