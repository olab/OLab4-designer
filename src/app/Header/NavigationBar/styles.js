import { DARK_BLUE, BLUE } from '../../../shared/colors';

const styles = () => ({
  wrapper: {
    marginLeft: '2rem',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
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
    color: BLUE,
    textDecoration: 'none',
    fontWeight: 400,
    marginLeft: '1rem',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
  },
});

export default styles;
