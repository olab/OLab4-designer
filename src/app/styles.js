import styled from 'styled-components';

export const Header = styled.header`
  background-color: #282c34;
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
    color: #61dafb;
  }
`;

export default Header;
