// @flow
import type { NodeData as NodeDataType } from '../Node/types';

export type EdgeData = {
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
  data: EdgeData;
  edgeTypes: any;
  edgeHandleSize?: number;
  sourceNode: NodeDataType | null;
  targetNode: NodeDataType | ITargetPosition;
  isLinkingStarted: boolean;
  isSelected: boolean;
  hasSibling: boolean;
  viewWrapperElem: HTMLDivElement;
};
