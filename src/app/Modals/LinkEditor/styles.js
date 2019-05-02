import styled from 'styled-components';

const colorWhite = '#fff';
const colorBlue = '#0089EC';
const colorGray = '#7C8FA6';
const colorLightGray = 'rgb(168,168,168)';
const colorLightGrayWOpacity = 'rgb(168,168,168,0.3)';
const colorBlackBlue = '#24446A';
const colorRed = '#F53D4D';
const fontFamily = 'SF Pro Display';

export const LinkEditorWrapper = styled.div`
  width: 20rem;
  height: 25rem;
  background-color: ${colorWhite};
  color: ${colorWhite};
  position: absolute;
  z-index: 500;
  font-family: ${fontFamily};
  font-size: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  -webkit-box-shadow: 2px 2px 5px 0 ${colorLightGray};
  box-shadow: 2px 2px 5px 0 ${colorLightGray};
`;

export const LinkEditorHeader = styled.div`
  font-family: ${fontFamily};
  font-size: 32px;
  display: flex;
  color: ${colorBlackBlue};
  justify-content: flex-start;
  position: relative;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${colorLightGrayWOpacity};
  cursor: move;

  > h4 {
    margin: 0;
  }

  > button {
    position: absolute;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    top: 10px;
    right: 10px;
  }
`;

export const LinkEditorBody = styled.div`
  padding: 0 1rem;

  > article {
    margin: 1rem 0;
  }
`;

export const LinkEditorFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding: 1rem;
  padding-top: 0;

  > button:first-child {
    margin-right: 0.5rem;
  }
`;

export const ActionButton = styled.button`
  border-radius: 0.25rem;
  font-family: ${fontFamily};
  font-size: 16px;
  width: 5.5rem;
  height: 2.2rem;
  text-align: center;
  text-transform: uppercase;
  background: ${({ blue }) => (blue ? colorBlue : colorWhite)};
  color: ${({ blue }) => (blue ? colorWhite : colorGray)};
  border: 1px solid ${({ blue }) => (blue ? colorBlue : colorGray)};
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${({ blue }) => (blue ? colorBlue : colorRed)};
    color: ${({ blue }) => (blue ? colorBlue : colorRed)};
    background: ${colorWhite};
  }
`;
