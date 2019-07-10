import styled from 'styled-components';
import { DARK_BLUE, WHITE } from '../../shared/colors';

const colorLightGray = 'rgb(168,168,168)';
const colorLightGrayWOpacity = 'rgb(168,168,168,0.3)';

export const ModalWrapper = styled.div`
  left: ${({ x }) => x || 0}px;
  top: ${({ y }) => y || 0}px;
  min-width: 20rem;
  min-height: 25rem;
  background-color: ${WHITE};
  color: ${WHITE};
  position: absolute;
  z-index: 500;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  -webkit-box-shadow: 2px 2px 5px 0 ${colorLightGray};
  box-shadow: 2px 2px 5px 0 ${colorLightGray};
`;

export const ModalHeader = styled.div`
  font-size: 32px;
  display: flex;
  color: ${DARK_BLUE};
  justify-content: flex-end;
  position: relative;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${colorLightGrayWOpacity};
  cursor: move;

  > h4 {
    margin: 0;
    margin-right: auto;
    font-size: 20px;
  }

  > button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
  }
`;

export const ModalBody = styled.div`
  padding: 0 1rem;

  > article {
    margin: 1rem 0;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 1rem;
  padding-top: 0;

  > button:first-child {
    margin-right: 0.5rem;
  }
`;

export const ArticleItem = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
