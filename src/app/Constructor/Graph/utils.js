// @flow
import randomColor from 'randomcolor';

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
      collapsed: false,
      locked: false,
    },
  };
};

export const createNewEdge = (sourceNodeID: number, targetNodeID: number) => {
  const newEdgeId = Date.now();
  return {
    isSelected: true,
    data: {
      id: newEdgeId,
      handleText: `Arrow-${newEdgeId}`,
      source: sourceNodeID,
      target: targetNodeID,
    },
  };
};
