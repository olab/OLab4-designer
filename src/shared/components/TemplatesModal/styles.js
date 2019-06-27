import styled, { css } from 'styled-components';

import { BRIGHT, DARK_GREY } from '../../colors';

export const LinearProgressWrapper = styled.div`
  ${({ isShow }) => !isShow && css`
    visibility: hidden;
  `}
`;

const styles = () => ({
  list: {
    maxHeight: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 7,
      backgroundColor: BRIGHT,
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
  listItem: {
    padding: '.15rem',
  },
  listButton: {
    width: '100%',
    textTransform: 'initial',
    textAlign: 'initial',
  },
});

export default styles;
