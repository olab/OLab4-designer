import arrowGenerator from './arrowGenerator';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  styleTooltip: {
    backgroundColor: '#0089EC',
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrowPopper: arrowGenerator('#0089EC'),
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
});

export default styles;
