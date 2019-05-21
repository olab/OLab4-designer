import { COLLAPSED_HEIGHT } from '../config';

const regularColor = '#7C8FA6';
const mainNodeColor = '#F78749';

const styles = {
  card: {
    display: 'inline-block',
    verticalAlign: 'top',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'visible',
    borderRadius: '8px',
    '&:focus [data-action=RESIZE_NODE]': {
      borderColor: mainNodeColor,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    },
    outline: 'none',
  },
  cardHeader: {
    paddingLeft: 10,
    backgroundColor: mainNodeColor,
    color: 'white',
    fontSize: '18px',
    lineHeight: 'normal',
    letterSpacing: '0.01em',
    padding: 0,
    height: COLLAPSED_HEIGHT,
    borderRadius: '8px 8px 0 0',
  },
  cardContent: {
    resize: 'both',
    overflow: 'auto',
    position: 'relative',
    opacity: 0.7,
    fontSize: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: 400,
    minWidth: 200,
    letterSpacing: '0.06em',
    padding: 0,
    paddingBottom: 20,
    borderTop: 'none',
    border: '2px solid transparent',
    '&::-webkit-scrollbar': {
      width: 7,
      backgroundColor: '#F5F5F5',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: regularColor,
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-track': {
      margin: 5,
    },
    '&::-webkit-scrollbar-button': {
      width: 0,
      height: 0,
      display: 'none',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
  },
  cardContentText: {
    padding: 10,
  },
  cardHeaderRegular: {
    backgroundColor: regularColor,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 5,
    },
  },
  title: {
    margin: 0,
    marginLeft: 5,
    marginRight: 10,
  },
  action: {
    display: 'flex',
    margin: 0,
    alignSelf: 'center',
  },
  cardContentLocked: {
    resize: 'none',
  },
  pos: {
    marginBottom: 12,
  },
  actionBarButton: {
    color: '#fff',
    background: 'rgba(255,255,255, 0.3)',
    height: 24,
    width: 24,
    minHeight: 24,
    marginRight: 6,
    boxShadow: 'none',
    '&:hover': {
      background: 'rgba(255,255,255, 0.6)',
    },
  },
};

export default styles;
