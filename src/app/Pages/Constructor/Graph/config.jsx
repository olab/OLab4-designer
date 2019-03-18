// @flow
/*
  Example config for GraphView component
*/
import React from 'react';

// These keys are arbitrary (but must match the config)
// However, GraphView renders text differently for empty types
// so this has to be passed in if that behavior is desired.
export const EMPTY_TYPE = 'empty';
export const CHOICE_TYPE = 'Choice';
export const TASK_TYPE = 'Task';
export const PASS_TYPE = 'Pass';
export const WAIT_TYPE = 'Wait';
export const TERMINATOR_TYPE = 'Terminator';
export const SPECIAL_CHILD_SUBTYPE = 'specialChild';
export const EMPTY_EDGE_TYPE = 'emptyEdge';
export const SPECIAL_EDGE_TYPE = 'specialEdge';

export const nodeTypes = [
  EMPTY_TYPE,
  CHOICE_TYPE,
  TASK_TYPE,
  PASS_TYPE,
  WAIT_TYPE,
  TERMINATOR_TYPE,
];
export const edgeTypes = [EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE];

const EmptyShape = (
  <symbol viewBox="0 0 100 100" id="empty">
    <circle cx="50" cy="50" r="45" />
  </symbol>
);

const ChoiceShape = (
  <symbol viewBox="0 0 100 100" id="choice">
    <rect transform="translate(50, 5) rotate(45)" width="65" height="65" />
  </symbol>
);

const TaskShape = (
  <symbol viewBox="0 0 100 100" id="task">
    <rect width="80" height="80" rx="15" ry="15" transform="translate(10, 10)" />
  </symbol>
);

const PassShape = (
  <symbol viewBox="0 0 100 100" id="pass">
    <rect transform="translate(7.5, 10)" width="85" height="85" />
  </symbol>
);

const WaitShape = (
  <symbol viewBox="0 0 100 100" id="wait">
    <circle cx="50" cy="50" r="45" transform="translate(0, 2)" />
  </symbol>
);

const TerminatorShape = (
  <symbol viewBox="0 0 100 100" id="terminator">
    <rect width="80" height="80" rx="15" ry="15" transform="translate(10, 10)" />
  </symbol>
);

const SpecialChildShape = (
  <symbol viewBox="0 0 100 100" id="specialChild">
    <rect x="2.5" y="0" width="95" height="97.5" />
  </symbol>
);

const EmptyEdgeShape = (
  <symbol width="24" height="24" viewBox="0 0 24 24" id="emptyEdge">
    <circle r="12" transform="matrix(1 0 0 -1 12 12)" fill="#D3DAE1" />

    <g transform="translate(18, 11) rotate(90)">
      <path d="M1 13L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </symbol>
);

const SpecialEdgeShape = (
  <symbol viewBox="0 0 50 50" id="specialEdge">
    <rect transform="rotate(45)" x="27.5" y="-7.5" width="15" height="15" fill="currentColor" />
  </symbol>
);

export default {
  EdgeTypes: {
    emptyEdge: {
      shape: EmptyEdgeShape,
      shapeId: '#emptyEdge',
    },
    specialEdge: {
      shape: SpecialEdgeShape,
      shapeId: '#specialEdge',
    },
  },
  NodeSubtypes: {
    specialChild: {
      shape: SpecialChildShape,
      shapeId: '#specialChild',
    },
  },
  NodeTypes: {
    Choice: {
      shape: ChoiceShape,
      shapeId: '#choice',
      typeText: 'Choice',
    },
    emptyNode: {
      shape: EmptyShape,
      shapeId: '#empty',
      typeText: 'None',
    },
    Pass: {
      shape: PassShape,
      shapeId: '#pass',
      typeText: 'Pass',
    },
    Task: {
      shape: TaskShape,
      shapeId: '#task',
      typeText: 'Task',
    },
    Terminator: {
      shape: TerminatorShape,
      shapeId: '#terminator',
      typeText: 'Terminator',
    },
    Wait: {
      shape: WaitShape,
      shapeId: '#wait',
      typeText: 'Wait',
    },
  },
};
