// @flow
import React from 'react';

export type IAppProps = {
  history: any;
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
