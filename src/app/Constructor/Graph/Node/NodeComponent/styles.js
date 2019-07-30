import {
  ACTION_RESIZE, HEADER_PADDING, HEADER_HEIGHT, BORDER_SIZE,
} from '../config';
import { WHITE, ORANGE, DARK_GREY } from '../../../../../shared/colors';

const nodeFocus = `&[data-selected=true] > [data-action=${ACTION_RESIZE}]`;

const styles = {
  card: {
    display: 'inline-block',
    verticalAlign: 'top',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'visible',
    borderRadius: '8px',
    [nodeFocus]: {
      borderColor: DARK_GREY,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    },
    outline: 'none',
  },
  cardHeader: {
    paddingLeft: 10,
    backgroundColor: ORANGE,
    color: WHITE,
    fontSize: '18px',
    lineHeight: 'normal',
    letterSpacing: '0.01em',
    padding: 0,
    height: HEADER_HEIGHT,
    borderRadius: '8px 8px 0 0',
    cursor: 'all-scroll',
    display: 'flex',
    alignItems: 'center',
  },
  cardHeaderCollapsed: {
    alignItems: 'end',
    paddingTop: HEADER_PADDING,
    paddingBottom: HEADER_PADDING,
    borderRadius: '8px',
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
    minHeight: 80,
    letterSpacing: '0.06em',
    padding: 0,
    borderTop: 'none',
    border: `${BORDER_SIZE}px solid transparent`,
    '& p, ul': {
      margin: 0,
    },
    '&::-webkit-scrollbar': {
      width: 7,
      cursor: 'pointer',
    },
    '&:hover::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: DARK_GREY,
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-track': {
      marginBottom: 12,
      marginTop: 5,
    },
    '&::-webkit-scrollbar-button': {
      width: 0,
      height: 0,
      display: 'none',
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-resizer': {
      display: 'none',
      '-webkit-appearance': 'none',
    },
  },
  cardContentText: {
    padding: '5px 0 15px 10px',
    marginRight: 10,
  },
  cardHeaderRegular: {
    backgroundColor: DARK_GREY,
  },
  action: {
    marginTop: 0,
    marginRight: 0,
    alignSelf: 'unset',
  },
  title: {
    width: 80,
    '& p': {
      margin: 0,
    },
  },
  cardContentLocked: {
    resize: 'none',
  },
  pos: {
    marginBottom: 12,
  },
  resizer: {
    position: 'absolute',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    borderRight: `2px solid ${WHITE}`,
    borderBottom: `2px solid ${WHITE}`,
    borderRadius: '0 0 8px 0',
    right: 0,
    bottom: 0,
    marginRight: '2px',
    marginBottom: '2px',
    width: '15px',
    height: '15px',
  },
  layout: {
    position: 'absolute',
    marginTop: 40,
    top: 0,
    right: 15,
    left: 0,
    bottom: 0,
  },
};

export default styles;
