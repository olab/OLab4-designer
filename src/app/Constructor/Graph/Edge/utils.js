// @flow
import { COLLAPSED_HEIGHT } from '../Node/config';
import { VARIANT } from './config';

import type { Node as NodeType } from '../Node/types';

export const getVariantValueDOM = (variant: number): string => {
  switch (variant) {
    case VARIANT.STANDARD:
      return VARIANT.STANDARD_DOM;
    case VARIANT.DASHED:
      return VARIANT.DASHED_DOM;
    case VARIANT.DOTTED:
      return VARIANT.DOTTED_DOM;
    default:
      return VARIANT.STANDARD_DOM;
  }
};

export const getMinRadius = (sourceNode: NodeType, targetNode: NodeType): number => {
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
