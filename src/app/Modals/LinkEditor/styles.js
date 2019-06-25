import styled from 'styled-components';

const colorWhite = '#fff';
const colorBlue = '#0089EC';
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
  background: ${colorBlue};
  color: ${colorWhite};
  border: 1px solid ${colorBlue};
  cursor: pointer;
  outline: none;

  &:hover {
    border-color: ${colorBlue};
    color: ${colorBlue};
    background: ${colorWhite};
  }
`;

export const ChangeDirectionWrapper = styled.div`
  display: inline-block;
`;

const styles = () => ({
  reverseIcon: {
    padding: 5,
    marginLeft: 5,
  },
});

export default styles;
