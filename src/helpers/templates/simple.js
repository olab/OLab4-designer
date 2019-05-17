import randomColor from 'randomcolor';

import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../../app/Constructor/Graph/Node/config';

const ids = [...Array(2)].map((_, i) => Date.now() + i);
const mapId = Number(ids[0].toString().slice(0, 6));

const simpleTemplate = {
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
  ],
  nodes: [
    {
      isSelected: false,
      expand: false,
      locked: false,
      data: {
        id: ids[0],
        map_id: mapId,
        title: 'Start node',
        x: 0,
        y: 0,
        color: randomColor(),
        text: 'Node Text',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
        type: 0,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        isCollapsed: false,
        isLocked: false,
      },
    },
    {
      isSelected: false,
      expand: false,
      locked: false,
      data: {
        id: ids[1],
        map_id: mapId,
        title: 'Node Title',
        x: 0,
        y: 100,
        color: randomColor(),
        text: 'Node Text',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
        type: 0,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        isCollapsed: false,
        isLocked: false,
      },
    },
  ],
};

export default simpleTemplate;
