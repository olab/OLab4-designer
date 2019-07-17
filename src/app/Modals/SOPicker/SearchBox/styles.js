import styled from 'styled-components';

const colorGreen = '#03B595';
const colorLightGray = '#F0F8FE';
const colorDarkGray = '#7C8FA6';

export const SearchBoxWrapper = styled.div`
  position: relative;
  width: 100%;

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

const styles = () => ({
  iconButton: {
    position: 'absolute',
    padding: 4,
    marginLeft: 'auto',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: 10,
  },
});

export default styles;
