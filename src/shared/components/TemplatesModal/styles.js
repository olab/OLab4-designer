import styled from 'styled-components';

import { GREY, DARK_GREY } from '../../colors';

const colorGray = 'rgba(0, 0, 0, 0.42)';

export const ProgressWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 15px;
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

const styles = () => ({
  list: {
    maxHeight: '40vh',
    minHeight: '40vh',
    maxWidth: '40vw',
    minWidth: '40vw',
    overflowY: 'auto',
    marginBottom: 10,
    '&::-webkit-scrollbar': {
      width: 7,
      backgroundColor: GREY,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: DARK_GREY,
      borderRadius: 4,
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
  listEmpty: {
    marginTop: 10,
  },
  listItem: {
    padding: '.15rem',
    justifyContent: 'flex-end',
  },
  listButton: {
    width: '100%',
    textTransform: 'initial',
    textAlign: 'initial',
  },
  spinnerCaption: {
    marginLeft: 5,
  },
  searchField: {
    marginBottom: 5,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 7,
    padding: 3,
    fill: colorGray,
  },
});

export default styles;
