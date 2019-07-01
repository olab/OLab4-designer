import styled from 'styled-components';

const colorWhite = '#fff';
const colorLightGray = 'rgb(168,168,168)';
const colorLightGrayWOpacity = 'rgb(168,168,168,0.3)';
const colorBlackBlue = '#24446A';

export const ModalWrapper = styled.div`
  left: ${({ x }) => x || 0}px;
  top: ${({ y }) => y || 0}px;
  width: 20rem;
  height: 25rem;
  background-color: ${colorWhite};
  color: ${colorWhite};
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
  color: ${colorBlackBlue};
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
