import styled from 'styled-components';

const primaryColor = '#D3DAE1';
const lightColor = '#fff';
const darkColor = '#000';


export const NodeShapeContainer = styled.g`
    use.node {
        color: ${primaryColor};
        stroke: ${darkColor};
        fill: ${lightColor};
        filter: url(#dropshadow);
        stroke-width: 0.5px;
        cursor: pointer;
        user-select: none;

        &.hovered {
          stroke: ${primaryColor};
        }
        &.selected {
          color: ${lightColor};
          stroke: ${primaryColor};
          stroke-width: 1px;
          fill: ${primaryColor};
        }
    }
`;

export default NodeShapeContainer;
