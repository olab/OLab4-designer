export const edgeToServer = (edgeData) => {
  const BEMapping = {
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
  };

  return BEMapping;
};

export const edgeFromServer = (edgeData) => {
  const FEMapping = {
    id: edgeData.id,
    label: edgeData.text,
    color: edgeData.color,
    variant: edgeData.line_type,
    thickness: edgeData.thickness,
    source: edgeData.source_id,
    target: edgeData.destination_id,
    isHidden: Boolean(edgeData.hidden),
  };

  return FEMapping;
};

export const nodeToServer = nodeData => nodeData;
export const nodeFromServer = (nodeData) => {
  const FEMapping = {
    isSelected: false,
    data: {
      id: nodeData.id,
      map_id: nodeData.map_id,
      title: nodeData.title,
      type_id: nodeData.type_id,
      x: nodeData.x,
      y: nodeData.y,
      width: nodeData.width,
      height: nodeData.height,
      color: nodeData.color || nodeData.rgb,
      type: nodeData.type_id,
      text: nodeData.text,
      isCollapsed: Boolean(nodeData.collapsed),
      isLocked: Boolean(nodeData.locked),
    },
  };

  return FEMapping;
};

export const mapToServer = mapData => mapData;
export const mapFromServer = (mapData) => {
  const FEMapping = {
    id: mapData.id,
    name: mapData.name,
    abstract: mapData.abstract,
    keywords: mapData.keywords,
    enabled: Boolean(mapData.enabled),
    isFetching: false,
    nodes: mapData.nodes
      ? mapData.nodes.map(node => nodeFromServer(node))
      : [],
    edges: mapData.edges
      ? mapData.edges.map(edge => edgeFromServer(edge))
      : [],
    undo: [],
    redo: [],
  };

  return FEMapping;
};

export default {
  edgeToServer,
  edgeFromServer,
  nodeToServer,
  nodeFromServer,
  mapToServer,
  mapFromServer,
};
