// @flow
import type { INode } from '../Node/types';

export type IEdge = {
  source: string;
  target: string;
  type?: string;
  handleText?: string;
  label_from?: string;
  label_to?: string;
  [key: string]: any;
};

export type ITargetPosition = {
  x: number;
  y: number;
};

export type IEdgeProps = {
  data: IEdge;
  edgeTypes: any;
  edgeHandleSize?: number;
  sourceNode: INode | null;
  targetNode: INode | ITargetPosition;
  isSelected: boolean;
  viewWrapperElem: HTMLDivElement;
};
