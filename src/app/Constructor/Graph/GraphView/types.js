// @flow
import type { INode } from '../Node/types';
import type { IEdge } from '../Edge/types';

export type IViewTransform = {
  k: number,
  x: number,
  y: number
};

export type INodeMapNode = {
  node: INode;
  originalArrIndex: number;
  incomingEdges: Array<IEdge>;
  outgoingEdges: Array<IEdge>;
  parents: Array<INode>;
  children: Array<INode>;
};

export type IGraphViewState = {
  viewTransform?: IViewTransform;
  hoveredNode: boolean;
  nodesMap: any;
  edgesMap: any;
  nodes: any[];
  edges: any[];
  selectingNode: boolean;
  hoveredNodeData: INode | null;
  edgeEndNode: INode | null;
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
  onCreateEdge: (sourceNode: INode, targetNode: INode) => void;
  onCreateNode: (x: number, y: number, value: string) => void;
  onCreateNodeWithEdge: (x: number, y: number, sourceNode: INode) => void;
  onDeleteEdge: (selectedEdge: IEdge, edges: Array<IEdge>) => void;
  onDeleteNode: (selected: any, nodeId: string, nodes: any[]) => void;
  onPasteSelected?: () => void;
  onSelectEdge: (selectedEdge: IEdge) => void;
  onSelectNode: (node: INode | null) => void;
  onCollapseNode: (id: number) => void;
  onLockNode: (id: number) => void;
  onSwapEdge: (sourceNode: INode, targetNode: INode, edge: IEdge) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onUpdateNode: (node: INode) => void;
  renderBackground?: (gridSize?: number) => any;
  renderDefs?: () => any;
  afterRenderEdge?: (
    id: string,
    element: any,
    edge: IEdge,
    edgeContainer: any,
    isEdgeSelected: boolean,
  ) => void;
  zoomControlsRef: {
    current: HTMLDivElement | null,
  };
  ACTION_SAVE_GRAPH_TO_UNDO: () => void;
};
