const styles = theme => ({
  arrow: {
    position: 'absolute',
    fontSize: 7,
    height: '3em',
    top: 0,
    marginTop: '-0.9em',
    width: '3em',
    left: '50%',
    transform: 'translate(-50%)',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
    },
  },
});

export default styles;
