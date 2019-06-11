export const edgeToServer = edgeData => ({
  id: edgeData.id,
  text: edgeData.label,
  type_id: 1,
  style_id: 5,
  hidden: Number(edgeData.isHidden),
  order: 0,
  probability: 0,
  image_id: 0,
  thickness: edgeData.thickness,
  color: edgeData.color,
  line_type: edgeData.variant,
  source_id: edgeData.source,
  destination_id: edgeData.target,
});
export const edgeFromServer = edgeData => ({
  id: edgeData.id,
  label: edgeData.text,
  color: edgeData.color,
  variant: edgeData.line_type,
  thickness: edgeData.thickness,
  source: edgeData.source_id,
  target: edgeData.destination_id,
  isHidden: Boolean(edgeData.hidden),
});

export const nodeToServer = nodeData => ({
  id: nodeData.id,
  map_id: nodeData.map_id,
  title: nodeData.title,
  text: nodeData.text,
  type_id: nodeData.type_id,
  x: nodeData.x,
  y: nodeData.y,
  height: nodeData.width,
  width: nodeData.height,
  locked: Number(nodeData.isLocked),
  collapsed: Number(nodeData.isCollapsed),
  color: nodeData.color,
});
export const nodeFromServer = nodeData => ({
  isSelected: false,
  data: {
    id: nodeData.id,
    map_id: nodeData.map_id || null,
    title: nodeData.title,
    type_id: nodeData.type_id,
    x: nodeData.x,
    y: nodeData.y,
    width: nodeData.width || 0,
    height: nodeData.height || 0,
    color: nodeData.color || nodeData.rgb,
    type: nodeData.type_id,
    text: nodeData.text,
    isCollapsed: Boolean(nodeData.collapsed),
    isLocked: Boolean(nodeData.locked),
  },
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
  edges: mapData.edges
    ? mapData.edges.map(edge => edgeFromServer(edge))
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
