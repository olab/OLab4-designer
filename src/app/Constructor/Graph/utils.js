// @flow
import randomColor from 'randomcolor';
import generateTmpId from '../../../helpers/generateTmpId';

import {
  SALT as NODE_SALT,
  DEFAULT_WIDTH as DEFAULT_NODE_WIDTH,
  DEFAULT_HEIGHT as DEFAULT_NODE_HEIGHT,
  DEFAULT_TITLE as DEFAULT_NODE_TITLE,
  DEFAULT_TEXT as DEFAULT_NODE_TEXT,
  DEFAULT_IS_COLLAPSED as DEFAULT_NODE_IS_COLLAPSED,
  DEFAULT_IS_LOCKED as DEFAULT_NODE_IS_LOCKED,
  TYPE_DEFAULT as NODE_TYPE_DEFAULT,
} from './Node/config';

import {
  SALT as EDGE_SALT,
  DEFAULT_COLOR as DEFAULT_EDGE_COLOR,
  DEFAULT_THICKNESS as DEFAULT_EDGE_THICKNESS,
  DEFAULT_LABEL as DEFAULT_EDGE_LABEL,
  DEFAULT_VARIANT as DEFAULT_EDGE_VARIANT,
  DEFAULT_IS_HIDDEN as DEFAULT_EDGE_IS_HIDDEN,
} from './Edge/config';

export const createNewNode = (mapId: number, x: number, y: number) => {
  const newNodeId = generateTmpId(NODE_SALT);

  return {
    isSelected: false,
    data: {
      id: newNodeId,
      map_id: mapId,
      title: DEFAULT_NODE_TITLE,
      type_id: NODE_TYPE_DEFAULT,
      color: randomColor(),
      text: DEFAULT_NODE_TEXT,
      links: [],
      destination_id: mapId,
      style_id: mapId,
      x,
      y,
      width: DEFAULT_NODE_WIDTH,
      height: DEFAULT_NODE_HEIGHT,
      isCollapsed: DEFAULT_NODE_IS_COLLAPSED,
      isLocked: DEFAULT_NODE_IS_LOCKED,
    },
  };
};

export const createNewEdge = (sourceId: number, targetId: number) => {
  const newEdgeId = generateTmpId(EDGE_SALT);

  return {
    isSelected: false,
    data: {
      id: newEdgeId,
      label: DEFAULT_EDGE_LABEL,
      source: sourceId,
      target: targetId,
      color: DEFAULT_EDGE_COLOR,
      variant: DEFAULT_EDGE_VARIANT,
      thickness: DEFAULT_EDGE_THICKNESS,
      isHidden: DEFAULT_EDGE_IS_HIDDEN,
    },
  };
};
