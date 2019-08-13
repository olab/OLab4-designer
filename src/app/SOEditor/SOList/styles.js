import styled from 'styled-components';

import { DARK_BLUE, LIGHT_BLUE, WHITE } from '../../../shared/colors';

export const FieldLabel = styled.p`
  color: ${DARK_BLUE};
  font-weight: 600;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
`;

export const HeaderWrapper = styled.div`
  position: relative;
`;

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 10px;
  right: 1rem;
`;

export const ListWithSearchWrapper = styled.div`
  padding: 0 1rem;
  padding-top: 0.5rem;
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
    height: '94.5vh',
    overflow: 'auto',
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
  spinnerCaption: {
    marginLeft: 5,
  },
});

export default styles;
