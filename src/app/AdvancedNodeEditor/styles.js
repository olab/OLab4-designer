import styled from 'styled-components';
import {
  DARK_BLUE, BLUE_GREY, WHITE, LIGHT_GREY,
} from '../../shared/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 94.5vh;
`;

export const ScrollingContainer = styled.div`
  flex: 1 1 100%;
  background-color: ${WHITE};
  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 84px;
  background-color: ${LIGHT_GREY};
`;

export const Title = styled.h2`
  margin: 1rem;
  font-weight: 800;
  font-style: bold;
  font-size: 34px;
  color: ${DARK_BLUE};
  text-transform: uppercase;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 24px 0 0 100px;

  @media only screen and (max-width: 1199px) {
    flex-direction: column;
  }
`;

const styles = () => ({
  paper: {
    margin: '0 auto',
    paddingLeft: 100,
    width: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    borderBottom: `1px solid ${BLUE_GREY}`,
    borderTop: `1px solid ${BLUE_GREY}`,
  },
  button: {
    margin: '1rem 1rem',
    width: '10rem',
  },
});

export default styles;
