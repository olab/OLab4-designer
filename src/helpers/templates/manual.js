import randomColor from 'randomcolor';

import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../../app/Constructor/Graph/Node/config';

const id = Date.now();
const mapId = Number(id.toString().slice(0, 6));

const manualTemplate = {
  edges: [],
  nodes: [
    {
      isSelected: false,
      data: {
        id,
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
  ],
};

export default manualTemplate;
