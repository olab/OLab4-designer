// @flow
import React from 'react';

export type IAppProps = {
  nodeIdFromURL: number,
  history: any;
  isANE: boolean,
  isAuth: boolean,
  isDataFetching: boolean,
  notifications: Array<any>,
};

export type IProtectedRouteProps = {
  component: React.Node,
  path: string,
  isAuth: boolean,
  exact?: boolean,
  scopedObject?: string,
};
