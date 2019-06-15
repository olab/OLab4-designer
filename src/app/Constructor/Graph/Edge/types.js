// @flow
import type { Node as NodeType } from '../Node/types';

export type Edge = {
  id: number,
  label: string;
  color: string;
  variant: number;
  thickness: number;
  source: number;
  target: number;
  isHidden: boolean;
};

export type ITargetPosition = {
  x: number;
  y: number;
};

export type IEdgeProps = {
  data: Edge;
  edgeTypes: any;
  edgeHandleSize?: number;
  sourceNode: NodeType | null;
  targetNode: NodeType | ITargetPosition;
  isLinkingStarted: boolean;
  isSelected: boolean;
  hasSibling: boolean;
  viewWrapperElem: HTMLDivElement;
};
