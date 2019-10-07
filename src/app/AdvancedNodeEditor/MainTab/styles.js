import styled from 'styled-components';
import { DARK_BLUE } from '../../../shared/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

export const TextContent = styled.div`
  margin-top: 15px;
  padding-bottom: 30px;
`;

export const OtherContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 100px;
`;

export const NodeContentTitle = styled.h3`
  color: ${DARK_BLUE};
`;
