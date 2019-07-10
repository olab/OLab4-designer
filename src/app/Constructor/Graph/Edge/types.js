// @flow
import type { Node as NodeType } from '../Node/types';
import type { DefaultEdge as DefaultEdgeType } from '../../../reducers/defaults/types';

export type Edge = {
  id: number,
  label: string,
  color: string,
  variant: number,
  thickness: number,
  linkStyle: number,
  source: number,
  target: number,
  isHidden: boolean,
  isFollowOnce: boolean,
};

export type ITargetPosition = {
  x: number,
  y: number,
};

export type IEdgeProps = {
  data: Edge,
  edgeTypes: any,
  sourceNode: NodeType | null,
  targetNode: NodeType | ITargetPosition,
  isLinkingStarted: boolean,
  isSelected: boolean,
  hasSibling: boolean,
  viewWrapperElem: HTMLDivElement,
  edgeDefaults: DefaultEdgeType,
};
