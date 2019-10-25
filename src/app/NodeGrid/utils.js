// @flow
import { ORDER } from './Table/config';
import { isString } from '../../helpers/dataTypes';
import removeHTMLTags from '../../helpers/removeHTMLTags';

import type { NodeGridState, Node as NodeType } from './types';
import type { Node as FullNode } from '../Constructor/Graph/Node/types';

export const getNodesReduced = (propsNodes: Array<FullNode>): NodeGridState => ({
  nodes: propsNodes.map(({
    id, title, text, x, y,
  }: NodeType): NodeType => ({
    x: parseInt(x, 10),
    y: parseInt(y, 10),
    id,
    title,
    text,
  })),
});

export const withoutTags = (field: string | number): string | number => (
  isString(field)
    ? removeHTMLTags(field)
    : field
);

export const sortNodesByField = (
  field: string,
  status: string,
): Function => (a: NodeType, b: NodeType): number => {
  switch (status) {
    case ORDER.DESC:
      return withoutTags(a[field] > withoutTags(b[field]) ? 1 : -1);
    case ORDER.ASC:
      return withoutTags(a[field] < withoutTags(b[field]) ? 1 : -1);
    default: return 0;
  }
};
