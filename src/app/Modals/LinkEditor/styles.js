import styled from 'styled-components';

const colorWhite = '#fff';
const colorBlue = '#0089EC';
const colorGray = '#7C8FA6';
const colorLightGray = 'rgb(168,168,168)';
const colorLightGrayWOpacity = 'rgb(168,168,168,0.3)';
const colorBlackBlue = '#24446A';
const colorRed = '#F53D4D';

export const LinkEditorWrapper = styled.div`
  width: 20rem;
  height: 25rem;
  background-color: ${colorWhite};
  color: #fff;
  position: absolute;
  z-index: 9999;
  font-family: SF Pro Display;
  font-size: 16px;
  color: #283443;
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  -webkit-box-shadow: 2px 2px 5px 0 ${colorLightGray};
  box-shadow: 2px 2px 5px 0 ${colorLightGray};    
`;

export const LinkEditorHeader = styled.div`
  font-family: SF Pro Display;
  font-size: 32px;
  display: flex;
  color: ${colorBlackBlue};
  justify-content: flex-start;
  position: relative;
  padding: 1rem;
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

  > button:first-child {
    margin-right: 0.5rem;
  }
`;

export const ActionButton = styled.button`
  border-radius: 0.25rem;
  font-family: SF Pro Display;
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

export const LinkColorItem = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background: ${({ color }) => color};
  border-radius: 50%;
  box-shadow: 0 0 5px 0 ${colorLightGray};
  cursor: pointer;
`;

export const ColorPickerWrapper = styled.article`
  display: flex;
  
  > span {
    margin-right: 0.5rem;
  }
  
  > div {
    position: relative;
  }
`;

export const GithubPickerWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(100% + 12px);
  transform: translate(-50%, 0);

  .github-picker {
    > div {
      &:first-of-type {
        left: calc(50% + 4px) !important;
      }
      &:last-of-type {
        left: calc(50% + 5px) !important;
      }
    }
  }
`;

const styles = theme => ({
  formControlRoot: {
    margin: '0',
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

export default styles;
