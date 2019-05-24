import styled from 'styled-components';
import { setCursorCSS } from './utils';

const backgroundColor = '#f9f9f9';

export const ViewWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  box-shadow: none;
  background: ${backgroundColor};
  transition: opacity 0.167s;
  opacity: 1;
  outline: none;
  user-select: none;
`;

export const GraphWrapper = styled.svg`
  align-content: stretch;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const View = styled.g`
  cursor: ${({ cursor }) => setCursorCSS(cursor)}
`;

export default ViewWrapper;
