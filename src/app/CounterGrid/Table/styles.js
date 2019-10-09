import { MIDDLE_LIGHT_GREY } from '../../../shared/colors';

const styles = () => ({
  paper: {
    height: '87.75vh',
    overflow: 'auto',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: `${MIDDLE_LIGHT_GREY}`,
    },
  },
});

export default styles;
