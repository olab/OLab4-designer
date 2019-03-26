// @flow
export type IDefsProps = {
  gridSpacing?: number;
  gridDotSize?: number;
  edgeArrowSize?: number;
  renderDefs?: () => any | null;
};

export type IDefsState = {
  graphConfigDefs: any;
};
