import styled from 'styled-components';

const colorWhite = '#fff';
const colorBlue = '#0089EC';
const colorGray = '#7C8FA6';
const colorRed = '#F53D4D';
const fontFamily = 'SF Pro Display';

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
