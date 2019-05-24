import styled from 'styled-components';

const primaryColor = '#D3DAE1';

export const EdgeWrapper = styled.g`
  color: ${primaryColor};
  stroke: ${primaryColor};
  stroke-width: 5px;

  & > use {
    stroke: none;
    marker-end: url(#end-arrow);
    cursor: ${({ isLinkingStarted }) => (isLinkingStarted ? 'inherit' : 'pointer')};
    pointer-events: all;
  }
`;

export default {
  EdgeWrapper,
};
