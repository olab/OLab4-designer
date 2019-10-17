import { isBoolean, isNumber } from './dataTypes';
import { QUESTION_TYPES } from '../app/SOEditor/Questions/config';

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
  isEnd: Number(nodeData.isEnd),
  linkStyleId: nodeData.linkStyle,
  priorityId: nodeData.priorityId,
  linkTypeId: nodeData.linkType,
  annotation: nodeData.annotation,
  info: nodeData.info,
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
  priorityId: nodeData.priorityId,
  linkType: nodeData.linkTypeId,
  isCollapsed: Boolean(nodeData.collapsed),
  isLocked: Boolean(nodeData.locked),
  isVisitOnce: Boolean(nodeData.visitOnce),
  isEnd: Boolean(nodeData.isEnd),
  isSelected: false,
  isFocused: false,
  annotation: nodeData.annotation,
  info: nodeData.info,
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

export const mapDetailsFromServer = mapData => ({
  id: mapData.id,
  name: mapData.name,
  notes: mapData.notes,
  author: mapData.author,
  themes: mapData.themes,
  themeId: mapData.themeId,
  keywords: mapData.keywords,
  abstract: mapData.abstract,
  description: mapData.description,
  securityType: mapData.securityType,
  isEnabled: Boolean(mapData.enabled),
  isTemplate: Boolean(mapData.isTemplate),
  isLinkLogicVerified: Boolean(mapData.linkLogicVerified),
  isSendXapiStatements: Boolean(mapData.sendXapiStatements),
  isNodeContentVerified: Boolean(mapData.nodeContentVerified),
  isMediaContentComplete: Boolean(mapData.mediaContentComplete),
  isMediaCopyrightVerified: Boolean(mapData.mediaCopyrightVerified),
  isInstructorGuideComplete: Boolean(mapData.instructorGuideComplete),
});

export const mapDetailsToServer = mapData => ({
  id: mapData.id,
  name: mapData.name,
  // TODO: Uncomment when this value is added to the backend
  // notes: mapData.notes,
  author: mapData.author,
  themeId: mapData.themeId,
  keywords: mapData.keywords,
  abstract: mapData.abstract,
  description: mapData.description,
  securityType: mapData.securityType,
  enabled: Number(mapData.isEnabled),
  isTemplate: Number(mapData.isTemplate),
  linkLogicVerified: Number(mapData.isLinkLogicVerified),
  sendXapiStatements: Number(mapData.isSendXapiStatements),
  nodeContentVerified: Number(mapData.isNodeContentVerified),
  mediaContentComplete: Number(mapData.isMediaContentComplete),
  mediaCopyrightVerified: Number(mapData.isMediaCopyrightVerified),
  instructorGuideComplete: Number(mapData.isInstructorGuideComplete),
});

export const mapFromServer = mapData => ({
  nodes: mapData.nodes
    ? mapData.nodes.map(node => nodeFromServer(node))
    : [],
  edges: mapData.links
    ? mapData.links.map(edge => edgeFromServer(edge))
    : [],
});

export const mapFromServerOnCreate = ({ nodes, edges, ...mapDetails }) => ({
  ...mapDetailsFromServer(mapDetails),
  ...mapFromServer({ nodes, edges }),
});

export const templateFromServer = mapFromServer;

export const scopedObjectFromServer = ({ url, ...restSO }) => ({
  ...restSO,
  details: null,
  isShowEyeIcon: Boolean(url),
  isDetailsFetching: false,
});

export const scopedObjectByTypeFromServer = ({
  url, showAnswer, showSubmit, ...restSO
}) => ({
  ...restSO,
  ...(isNumber(showAnswer) && { isShowAnswer: Number(showAnswer) }),
  ...(isNumber(showAnswer) && { isShowSubmit: Number(showAnswer) }),
});

export const scopedObjectToServer = (SO) => {
  if (Number(Object.keys(QUESTION_TYPES)[0]) === SO.questionType) {
    const {
      feedback, layoutType, isShowAnswer, isShowSubmit, ...restSO
    } = SO;

    return {
      ...restSO,
      ...(!SO.placeholder && { placeholder: 'Default Placeholder Value' }),
    };
  }

  const {
    width, height, placeholder, isShowAnswer, isShowSubmit, ...restSO
  } = SO;

  return {
    ...restSO,
    ...(isBoolean(isShowAnswer) && { showAnswer: Number(isShowAnswer) }),
    ...(isBoolean(isShowSubmit) && { showSubmit: Number(isShowSubmit) }),
  };
};

export const scopedObjectDetailsFromServer = ({
  id, name, parentId, url, ...restSODetails
}) => ({
  id,
  name,
  ...(parentId && { parentId }),
  ...restSODetails,
  details: {
    ...restSODetails,
  },
  ...(url && { isShowEyeIcon: Boolean(url) }),
});

export const counterGridActionsFromServer = ({ visible, ...restActions }) => ({
  ...restActions,
  isVisible: Boolean(visible),
});

export const counterGridActionsToServer = ({ isVisible, ...restActions }) => ({
  ...restActions,
  visible: Number(isVisible),
});
