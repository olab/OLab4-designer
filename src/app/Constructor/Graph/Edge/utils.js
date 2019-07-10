// @flow
import { COLLAPSED_HEIGHT } from '../Node/config';
import { VARIANT, EDGE_HANDLE_SIZE } from './config';

import type { ITargetPosition } from './types';
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

export const getEdgeHandleOffsetTranslation = (): string => {
  const offset = -EDGE_HANDLE_SIZE / 2;

  return `translate(${offset}, ${offset})`;
};

export const getOffset = (
  sourceNodeXY: ITargetPosition,
  targetNodeXY: ITargetPosition,
  offset: number,
): Array<number> => {
  const { x: sourceX, y: sourceY } = sourceNodeXY;
  const { x: targetX, y: targetY } = targetNodeXY;

  const lineLength = Math.sqrt(((targetX - sourceX) ** 2) + ((targetY - sourceY) ** 2));
  const k = offset / lineLength;

  return [
    (targetX - sourceX) * k,
    (targetY - sourceY) * k,
  ];
};
