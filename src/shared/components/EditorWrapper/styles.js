
import { LIGHT_BLUE, DARK_BLUE } from '../../colors';

const styles = () => ({
  root: {
    height: '100vh',
  },
  leftPanel: {
    backgroundColor: LIGHT_BLUE,
  },
  rightPanel: {
    boxShadow: 'none',
  },
  title: {
    fontWeight: 400,
    color: DARK_BLUE,
    marginBottom: '2rem',
  },
  paper: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'none',
    width: '50%',
  },
  submit: {
    marginTop: '1rem',
    float: 'right',
    bottom: 0,
    width: 160,
  },
});

export default styles;
