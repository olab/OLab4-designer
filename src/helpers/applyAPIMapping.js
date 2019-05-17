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
export const nodeFromServer = nodeData => nodeData;

export const mapToServer = mapData => mapData;
export const mapFromServer = nodeData => nodeData;

export default {
  edgeToServer,
  edgeFromServer,
  nodeToServer,
  nodeFromServer,
  mapToServer,
  mapFromServer,
};