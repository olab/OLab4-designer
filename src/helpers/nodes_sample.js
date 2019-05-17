import randomColor from 'randomcolor';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../app/Constructor/Graph/Node/config';

const ids = [...Array(4)].map((_, i) => Date.now() + i);
const mapId = Number(ids[0].toString().slice(0, 6));

const sample = {
  edges: [
    {
      isSelected: false,
      data: {
        id: 1,
        label: `Arrow-${1}`,
        source: ids[0],
        target: ids[1],
        color: '#D3DAE1',
        variant: 'Standard',
        thickness: 3,
        isHidden: false,
      },
    },
    {
      isSelected: false,
      data: {
        id: 2,
        label: `Arrow-${2}`,
        source: ids[0],
        target: ids[2],
        color: '#D3DAE1',
        variant: 'Standard',
        thickness: 3,
        isHidden: false,
      },
    },
    {
      isSelected: false,
      data: {
        id: 3,
        label: `Arrow-${3}`,
        source: ids[0],
        target: ids[3],
        color: '#D3DAE1',
        variant: 'Standard',
        thickness: 3,
        isHidden: false,
      },
    },
    {
      isSelected: false,
      data: {
        id: 4,
        label: `Arrow-${4}`,
        source: ids[3],
        target: ids[0],
        color: 'red',
        variant: 'Dashed',
        thickness: 5,
        isHidden: true,
      },
    },
  ],
  nodes: [
    {
      isSelected: false,
      data: {
        id: ids[0],
        type: 1,
        map_id: mapId,
        title: 'Node A (1)',
        x: 258.3976135253906,
        y: 331.9783248901367,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        color: randomColor(),
        text: 'Node Text',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
        isCollapsed: false,
        isLocked: false,
      },
    },
    {
      isSelected: false,
      data: {
        id: ids[1],
        type: 0,
        map_id: mapId,
        title: 'Node B (2)',
        x: 593.9393920898438,
        y: 260.6060791015625,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        color: randomColor(),
        text: 'Node Text',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
        isCollapsed: false,
        isLocked: false,
      },
    },
    {
      isSelected: false,
      data: {
        id: ids[2],
        type: 0,
        map_id: mapId,
        title: 'Node C (3)',
        x: 237.5757598876953,
        y: 61.81818389892578,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        color: randomColor(),
        text: 'Node Text',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
        isCollapsed: false,
        isLocked: false,
      },
    },
    {
      isSelected: false,
      data: {
        id: ids[3],
        type: 0,
        map_id: mapId,
        title: 'Node F (7)',
        x: 0,
        y: 300,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        color: randomColor(),
        text: 'Node Text',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
        isCollapsed: false,
        isLocked: false,
      },
    },
  ],
};

export default sample;
