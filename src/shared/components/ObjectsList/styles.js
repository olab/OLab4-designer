import styled from 'styled-components';
import { DARK_BLUE, LIGHT_BLUE, WHITE } from '../../colors';

export const FieldLabel = styled.p`
  color: ${DARK_BLUE};
  font-weight: 600;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
`;

const styles = () => ({
  button: {
    margin: '1rem',
    width: '20rem',
  },
  input: {
    display: 'none',
  },
  title: {
    fontWeight: 800,
    color: DARK_BLUE,
    margin: '1rem',
  },
  root: {
    height: '100vh',
  },
  leftPanel: {
    backgroundColor: LIGHT_BLUE,
  },
  rightPanel: {
    boxShadow: 'none',
  },
  label: {
    color: DARK_BLUE,
    fontStyle: 'bold',
  },
  paper: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
    width: '50%',
  },
  link: {
    color: WHITE,
    textDecoration: 'none',
  },
});

export default styles;
