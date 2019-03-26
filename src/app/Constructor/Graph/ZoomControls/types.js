// @flow
export type IGraphControlProps = {
  maxZoom?: number;
  minZoom?: number;
  zoomLevel: number;
  zoomToFit: (event: SyntheticMouseEvent<HTMLButtonElement>) => number;
  modifyZoom: (delta: number) => number;
}

export type IGraphControlState = {
  open: boolean;
}
