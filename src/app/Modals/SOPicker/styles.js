import styled, { css, keyframes } from 'styled-components';

const colorBright = '#F5F5F5';
const colorGreen = '#03B595';
const colorLightGray = '#F0F8FE';
const colorDarkGray = '#7C8FA6';
const colorDark = 'rgba(36,68,106, 1)';
const colorDarkWithOpacity = 'rgba(36,68,106,.7)';
const colorDarkBorder = 'rgba(36,68,106,.16)';

export const ModalBody = styled.div`
  padding-left: 1rem;
  padding-right: ${({ isScrollbarVisible }) => (isScrollbarVisible ? 'calc(1rem - 5px)' : '1rem')};
  padding-bottom: 0;
  padding-top: .5rem;
  overflow: auto;
  ${({ isScrollbarVisible }) => (isScrollbarVisible && css`
    margin-right: 5px;

    &:hover {
      &::-webkit-scrollbar {
        width: 7px;
      }

      padding-right: calc(1rem - 12px);
    }
  `)};


  &::-webkit-scrollbar {
    width: 0;
    background-color: ${colorBright};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colorDarkGray};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    margin: 5px;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const SOList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;

  > li:first-child {
    border-top: none;
    padding-top: 0;
  }
`;

export const SOItem = styled.li`
  font-family: SF Pro Display;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.06em;
  color: ${colorDarkWithOpacity};
  border-top: 1px solid ${colorDarkBorder};
`;

export const SOItemHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const SOItemTitle = styled.p`
  font-size: 16px;
  line-height: 19px;
  margin: 0;
  color: ${colorDark};
`;

export const SOItemSubTitle = styled.p`
  margin: .15rem 0;
`;

export const ModalFooter = styled.div`
  padding: .5rem 1rem;
  margin-top: auto;
  border-top: 2px solid ${colorLightGray};
  display: flex;
  align-items: center;
`;

export const UploadButton = styled.span`
  cursor: pointer;
  color: ${colorGreen};
  display: inline-flex;
  align-items: center;
  font-family: SF Pro Display;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.06em;
  white-space: nowrap;

  > svg {
    margin-right: 10px;
  }
`;

export const SearchBox = styled.div`
  position: relative;
  margin-right: 1rem;

  > input {
    border-radius: 16px;
    background: ${colorLightGray};
    border: none;
    outline: none;
    height: 30px;
    padding-left: 32px;
    padding-right: 10px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid transparent;
    font-family: SF Pro Display;
    font-size: 14px;
    letter-spacing: 0.06em;
    color: ${colorDarkGray};

    &:focus {
      border-color: ${colorGreen};
      box-shadow: 0 0 3px ${colorGreen};
    }
  }
`;

export const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -45%);
`;

export const ConfigArticle = styled.article`
  display: flex;
  justify-content: space-between;
  padding: .7rem 1rem .5rem 1rem;
  border-bottom: 2px solid ${colorLightGray};

  > div:first-of-type {
    margin-right: .5rem;
  }

  > div:last-of-type {
    margin-left: .5rem;
  }
`;

export const EmptyList = styled.p`
  font-style: italic;
  position: absolute;
  color: black;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const keyframesMixin = css`
  animation: ${rotateAnimation} 2s linear infinite;
`;

export const ReloadIconWrapper = styled.span`
  ${({ isRotating }) => (isRotating ? keyframesMixin : 'animation: none;')};
  animation-fill-mode: forwards;
  transform-origin: center center;
  transform: rotate(360deg);
  display: inline-block;
  height: 18px;
`;

const styles = () => ({
  iconButton: {
    padding: '4px',
    marginLeft: 'auto',
  },
});

export default styles;
