// @flow
import type { INode } from '../Node/types';

export type EdgeData = {
  id: number,
  type?: string;
  source: number;
  target: number;
  label: string;
  color: string;
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
  sourceNode: INode | null;
  targetNode: INode | ITargetPosition;
  isSelected: boolean;
  viewWrapperElem: HTMLDivElement;
};
