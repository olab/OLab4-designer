import styled from 'styled-components';

const colorDark = '#282c34';
const colorWhite = '#fff';
const colorBlue = '#61dafb';
const colorGray = '#C9CEEA';

export const Header = styled.header`
  background-color: ${colorDark};
  min-height: 4vh;
  font-size: calc(10px + 2vmin);
  color: white;
  .route-link {
    margin-left: 2rem;
    font-size: 1rem;
    color: ${colorBlue};
  }

  > div:first-of-type {
    display: flex;
    align-items: center;
    padding: 0 10%;
    margin-bottom: 5px;
  }
`;

export const Logo = styled.a`
  text-decoration: none;
  color: ${colorWhite};
`;

export const FakeProgress = styled.div`
  background-color: ${colorGray};
  height: 4px;
  width: 100%;
`;

export default Header;
