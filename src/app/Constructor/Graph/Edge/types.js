// @flow
import type { INode } from '../Node/types';

export type EdgeData = {
  id: number,
  label: string;
  type?: string;
  color: string;
  variant: string;
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
  sourceNode: INode | null;
  targetNode: INode | ITargetPosition;
  isSelected: boolean;
  viewWrapperElem: HTMLDivElement;
};
