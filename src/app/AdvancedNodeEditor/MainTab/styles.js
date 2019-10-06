import styled from 'styled-components';
import { DARK_BLUE } from '../../../shared/colors';

export const LeftContent = styled.div`
  width: 800px;
  margin-top: 15px;
  padding-bottom: 100px;
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export const NodeContentTitle = styled.h3`
  color: ${DARK_BLUE};
`;
