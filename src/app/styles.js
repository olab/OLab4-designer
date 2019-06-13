import styled from 'styled-components';

const colorDark = '#24446A';
const colorWhite = '#fff';
const colorBlue = '#0089EC';
const colorGray = '#C9CEEA';

export const Header = styled.header`
  background-color: ${colorWhite};
  min-height: 4vh;
  font-size: calc(10px + 2vmin);
  color: ${colorBlue};
  .route-link {
    font-size: 1rem;
    color: ${colorBlue};
    text-decoration: none;
  }

  > div:first-of-type {
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

export const Logo = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
    margin-left: 10px;
  }

  span {
    color: ${colorDark};
  }
`;

export const FakeProgress = styled.div`
  background-color: ${colorGray};
  height: 4px;
  width: 100%;
`;

export default Header;
