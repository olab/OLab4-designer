export const edgeToServer = edgeData => ({
  id: edgeData.id,
  text: edgeData.label,
  linkStyleId: edgeData.linkStyle,
  thickness: edgeData.thickness,
  color: edgeData.color,
  lineType: edgeData.variant,
  sourceId: edgeData.source,
  destinationId: edgeData.target,
  hidden: Number(edgeData.isHidden),
  followOnce: Number(edgeData.isFollowOnce),
});

export const edgeFromServer = edgeData => ({
  id: edgeData.id,
  label: edgeData.text || '',
  color: edgeData.color,
  variant: edgeData.lineType,
  linkStyle: edgeData.linkStyleId,
  thickness: edgeData.thickness,
  source: edgeData.sourceId,
  target: edgeData.destinationId,
  isHidden: Boolean(edgeData.hidden),
  isFollowOnce: Boolean(edgeData.followOnce),
  isSelected: false,
});

export const edgeDefaultsFromServer = edgeDefault => ({
  label: edgeDefault.text,
  color: edgeDefault.color,
  variant: edgeDefault.lineType,
  linkStyle: edgeDefault.linkStyleId,
  thickness: edgeDefault.thickness,
  isHidden: Boolean(edgeDefault.hidden),
  isFollowOnce: Boolean(edgeDefault.followOnce),
});

export const nodeToServer = nodeData => ({
  id: nodeData.id,
  mapId: nodeData.mapId,
  title: nodeData.title,
  text: nodeData.text,
  typeId: nodeData.type,
  x: nodeData.x,
  y: nodeData.y,
  height: nodeData.height,
  width: nodeData.width,
  locked: Number(nodeData.isLocked),
  collapsed: Number(nodeData.isCollapsed),
  color: nodeData.color,
  visitOnce: Number(nodeData.isVisitOnce),
  linkStyleId: nodeData.linkStyle,
  linkTypeId: nodeData.linkType,
});

export const nodeFromServer = nodeData => ({
  id: nodeData.id,
  mapId: nodeData.mapId,
  title: nodeData.title,
  x: nodeData.x,
  y: nodeData.y,
  width: nodeData.width || 0,
  height: nodeData.height || 0,
  color: nodeData.color,
  type: nodeData.typeId,
  text: nodeData.text,
  linkStyle: nodeData.linkStyleId,
  linkType: nodeData.linkTypeId,
  isCollapsed: Boolean(nodeData.collapsed),
  isLocked: Boolean(nodeData.locked),
  isVisitOnce: Boolean(nodeData.visitOnce),
  isSelected: false,
});

export const nodeDefaultsFromServer = nodeDefault => ({
  title: nodeDefault.title,
  text: nodeDefault.text,
  x: nodeDefault.x,
  y: nodeDefault.y,
  isLocked: Boolean(nodeDefault.locked),
  isCollapsed: Boolean(nodeDefault.collapsed),
  height: nodeDefault.height,
  width: nodeDefault.width,
  linkStyle: nodeDefault.linkStyleId,
  linkType: nodeDefault.linkTypeId,
  type: nodeDefault.typeId,
  color: nodeDefault.color,
});

export const mapFromServer = mapData => ({
  id: mapData.id,
  name: mapData.name,
  abstract: mapData.abstract,
  keywords: mapData.keywords,
  nodes: mapData.nodes
    ? mapData.nodes.map(node => nodeFromServer(node))
    : [],
  edges: mapData.links
    ? mapData.links.map(edge => edgeFromServer(edge))
    : [],
  undo: [],
  redo: [],
  isEnabled: Boolean(mapData.enabled),
  isFetching: false,
});

export const templateFromServer = mapFromServer;

export const scopedObjectFromServer = ({ url, ...restSO }) => ({
  ...restSO,
  isShowEyeIcon: Boolean(url),
  isDetailsFetching: false,
  details: null,
});

export const scopedObjectDetailsFromServer = SODetails => ({
  description: SODetails.description,
  scopeLevel: SODetails.scopeLevel,
  value: SODetails.value,
  prefix: SODetails.prefix,
  suffix: SODetails.suffix,
  startValue: SODetails.startValue,
  outOf: SODetails.outOf,
});
