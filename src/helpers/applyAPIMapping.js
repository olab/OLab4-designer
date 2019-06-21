export const edgeToServer = edgeData => ({
  id: edgeData.id,
  text: edgeData.label,
  typeId: 1,
  styleId: 5,
  hidden: Number(edgeData.isHidden),
  order: 0,
  probability: 0,
  imageId: 0,
  thickness: edgeData.thickness,
  color: edgeData.color,
  lineType: edgeData.variant,
  sourceId: edgeData.source,
  destinationId: edgeData.target,
});
export const edgeFromServer = edgeData => ({
  isSelected: false,
  data: {
    id: edgeData.id,
    label: edgeData.text || '',
    color: edgeData.color,
    variant: edgeData.lineType,
    thickness: edgeData.thickness,
    source: edgeData.sourceId,
    target: edgeData.destinationId,
    isHidden: Boolean(edgeData.hidden),
  },
});

export const edgeDefaultsFromServer = edgeDefault => ({
  label: edgeDefault.text,
  color: edgeDefault.color,
  variant: edgeDefault.lineType,
  thickness: edgeDefault.thickness,
  isHidden: Boolean(edgeDefault.hidden),
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
  linkStyleId: nodeData.linkStyle,
  linkTypeId: nodeData.linkType,
});
export const nodeFromServer = nodeData => ({
  isSelected: false,
  data: {
    id: nodeData.id,
    mapId: nodeData.mapId || null,
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
  },
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

export const mapToServer = mapData => mapData;
export const mapFromServer = mapData => ({
  id: mapData.id,
  name: mapData.name,
  abstract: mapData.abstract,
  keywords: mapData.keywords,
  enabled: Boolean(mapData.enabled),
  nodes: mapData.nodes
    ? mapData.nodes.map(node => nodeFromServer(node))
    : [],
  edges: mapData.links
    ? mapData.links.map(edge => edgeFromServer(edge))
    : [],
  undo: [],
  redo: [],
});

export default {
  edgeToServer,
  edgeFromServer,
  nodeToServer,
  nodeFromServer,
  mapToServer,
  mapFromServer,
};
