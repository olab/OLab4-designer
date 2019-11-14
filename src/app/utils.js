// @flow
export const redirectToPlayer = (
  mapId: number,
  nodeId: number,
): Function => (): void => {
  window.open(`${process.env.HOST_NAME}/player/olab/play#${mapId}:${nodeId}`);
};

export default {
  redirectToPlayer,
};
