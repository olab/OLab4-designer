import styled from 'styled-components';

import { DARK_BLUE, BLUE } from '../../../shared/colors';

export const FieldLabel = styled.p`
  color: ${DARK_BLUE};
  font-weight: 600;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
`;

const styles = () => ({
  wrapper: {
    marginLeft: 50,
  },
  button: {
    marginLeft: '1rem',
    color: BLUE,
    '& > span': {
      fontWeight: 400,
    },
  },
  menu: {
    width: '220px',
  },
  menuItem: {
    color: DARK_BLUE,
    width: '127px',
  },
  link: {
    color: DARK_BLUE,
    textDecoration: 'none',
  },
});

export default styles;
