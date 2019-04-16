import styled from 'styled-components';

const primaryColor = '#D3DAE1';
const darkColor = '#000';

export const EdgeWrapper = styled.g`
    color: ${primaryColor};
    stroke: ${primaryColor};
    stroke-width: 5px;
    cursor: pointer;

    & > use {
      stroke: none;
      marker-end: url(#end-arrow);
    }
`;

export const EdgeTextWrapper = styled.text`
  stroke-width: 0.5px;
      fill:${primaryColor};
      stroke: ${primaryColor};
      cursor: pointer;
      user-select: none;
`;

export const EdgeMouseHandlerWrapper = styled.g`
  stroke:  ${darkColor};
  opacity: 0;
  color: transparent;
  stroke-width: 15px;
  cursor: pointer;
  pointer-events: all;
`;
