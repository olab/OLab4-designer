// @flow
import React from 'react';

import type { Node as NodeType } from './Constructor/Graph/Node/types';

export type IAppProps = {
  mapId: number,
  history: any,
  isAuth: boolean,
  ACTION_GET_NODE: Function,
  nodes: Array<NodeType>,
};

export type IProtectedRouteProps = {
  component: React.Node,
  path: string,
  isAuth: boolean,
  exact?: boolean,
  scopedObject?: string,
};
