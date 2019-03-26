import randomColor from 'randomcolor';

const ids = [...Array(4)].map((_, i) => Date.now() + i);
const mapId = Number(ids[0].toString().slice(0, 6));

const sample = {
  edges: [
    {
      isSelected: false,
      data: {
        id: 1,
        handleText: `Arrow-${1}`,
        source: ids[0],
        target: ids[1],
      },
    },
    {
      isSelected: false,
      data: {
        id: 2,
        handleText: `Arrow-${2}`,
        source: ids[0],
        target: ids[2],
      },
    },
    {
      isSelected: false,
      data: {
        id: 3,
        handleText: `Arrow-${3}`,
        source: ids[0],
        target: ids[3],
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
        title: 'Node A (1)',
        x: 258.3976135253906,
        y: 331.9783248901367,
        color: randomColor(),
        text: 'Node A (1) TEXT',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
      },
    },
    {
      isSelected: false,
      expand: false,
      locked: false,
      data: {
        id: ids[1],
        map_id: mapId,
        title: 'Node B (2)',
        x: 593.9393920898438,
        y: 260.6060791015625,
        color: randomColor(),
        text: 'Node B (2) TEXT',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
      },
    },
    {
      isSelected: false,
      expand: false,
      locked: false,
      data: {
        id: ids[2],
        map_id: mapId,
        title: 'Node C (3)',
        x: 237.5757598876953,
        y: 61.81818389892578,
        color: randomColor(),
        text: 'Node C (3) TEXT',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
      },
    },
    {
      isSelected: false,
      expand: false,
      locked: false,
      data: {
        id: ids[3],
        map_id: mapId,
        title: 'Node F (7)',
        x: 0,
        y: 300,
        color: randomColor(),
        text: 'Node F (7) TEXT',
        links: [],
        destination_id: mapId,
        style_id: mapId,
        type_id: mapId,
      },
    },
  ],
};

export default sample;
