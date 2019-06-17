// @flow
import { COLLAPSED_HEIGHT } from '../Node/config';

import type { NodeData as NodeDataType } from '../Node/types';

export const getStringVariant = (variant: string): string => {
  switch (variant) {
    case 'Standard':
      return 'none';
    case 'Dashed':
      return '15';
    case 'Dotted':
      return '5';
    default: return 'none';
  }
};

export const getMinRadius = (sourceNode: NodeDataType, targetNode: NodeDataType): number => {
  const {
    width: sourceWidth, height: sourceHeight, isCollapsed: isSourceCollapsed,
  } = sourceNode;
  const {
    width: targetWidth = 0, height: targetHeight = 0, isCollapsed: isTargetCollapsed,
  } = targetNode;
  const nodesSizes = [sourceWidth, sourceHeight, targetWidth, targetHeight];
  const isCollapsed = isSourceCollapsed || isTargetCollapsed;

  if (isCollapsed) {
    nodesSizes.push(COLLAPSED_HEIGHT);
  }

  const minRadius = Math.min(...nodesSizes) / 2;

  return minRadius;
};

export default {
  getStringVariant,
  getMinRadius,
};
