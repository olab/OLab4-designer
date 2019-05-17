import styled from 'styled-components';

const colorDark = '#282c34';
const colorWhite = '#fff';
const colorBlue = '#61dafb';

export const Header = styled.header`
  background-color: ${colorDark};
  min-height: 4vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 0 10%;
  .route-link {
    margin-left: 2rem;
    font-size: 1rem;
    color: ${colorBlue};
  }
`;

export const Logo = styled.a`
  text-decoration: none;
  color: ${colorWhite};
`;

export default Header;
