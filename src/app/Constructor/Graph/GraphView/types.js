// @flow
import type { NodeData as NodeDataType } from '../Node/types';
import type { EdgeData as EdgeDataType } from '../Edge/types';

export type IViewTransform = {
  k: number,
  x: number,
  y: number
};

export type INodeMapNode = {
  node: NodeDataType;
  originalArrIndex: number;
  incomingEdges: Array<EdgeDataType>;
  outgoingEdges: Array<EdgeDataType>;
  parents: Array<NodeDataType>;
  children: Array<NodeDataType>;
};

export type IGraphViewState = {
  viewTransform?: IViewTransform;
  hoveredNode: boolean;
  nodesMap: any;
  edgesMap: any;
  nodes: any[];
  edges: any[];
  selectingNode: boolean;
  hoveredNodeData: NodeDataType | null;
  edgeEndNode: NodeDataType | null;
  draggingEdge: boolean;
  draggedEdge: any;
  componentUpToDate: boolean;
  selectedEdgeObj: any;
  selectedNodeObj: any;
  documentClicked: boolean;
  svgClicked: boolean;
  focused: boolean;
};

export type IGraphViewProps = {
  backgroundFillId?: string;
  edges: any[];
  edgeArrowSize?: number;
  edgeHandleSize?: number;
  edgeTypes: any;
  gridDotSize?: number;
  gridSize?: number;
  gridSpacing?: number;
  layoutEngineType?: string;
  maxTitleChars?: number;
  maxZoom?: number;
  minZoom?: number;
  nodes: any[];
  readOnly?: boolean;
  selected: any;
  zoomDelay?: number;
  zoomDur?: number;
  canCreateEdge?: Function;
  canDeleteEdge?: Function;
  canDeleteNode?: Function;
  onCopySelected?: () => void;
  onCreateEdge: (sourceNode: NodeDataType, targetNode: NodeDataType) => void;
  onCreateNodeWithEdge: (x: number, y: number, sourceNode: NodeDataType) => void;
  onDeleteEdge: (selectedEdge: EdgeDataType, edges: Array<EdgeDataType>) => void;
  onCreateNode: (x: number, y: number) => void;
  onDeleteNode: (selected: any, nodeId: string, nodes: any[]) => void;
  onPasteSelected?: () => void;
  onSelectEdge: (selectedEdge: EdgeDataType, clientX: number, clientY: number) => void;
  onSelectNode: (node: NodeDataType | null, x: number, y: number) => void;
  onCollapseNode: (id: number) => void;
  onResizeNode: (id: number, width: number, height: number) => void;
  onLockNode: (id: number) => void;
  onSwapEdge: (sourceNode: NodeDataType, targetNode: NodeDataType, edge: EdgeDataType) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onUpdateNode: (node: NodeDataType) => void;
  renderBackground?: (gridSize?: number) => any;
  renderDefs?: () => any;
  afterRenderEdge?: (
    id: string,
    element: any,
    edge: EdgeDataType,
    edgeContainer: any,
    isEdgeSelected: boolean,
  ) => void;
  zoomControlsRef: {
    current: HTMLDivElement | null,
  };
  ACTION_SAVE_MAP_TO_UNDO: Function;
};
