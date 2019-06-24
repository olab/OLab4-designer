import styled from 'styled-components';

const colorBright = '#F5F5F5';
const colorDarkGray = '#7C8FA6';

export const HomeWrapper = styled.div`
  padding: 1rem;
`;

export const HomeHeader = styled.h1`
  margin-top: 0;
`;

export const ExpansionPanelWrapper = styled.div`
  width: 50%;
`;

const styles = theme => ({
  fab: {
    flexShrink: 0,
    alignSelf: 'flex-end',
    textDecoration: 'none',
  },
  icon: {
    marginLeft: '5px',
  },
  content: {
    marginRight: '2rem',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: 'bold',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  list: {
    maxHeight: '40vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 7,
      backgroundColor: colorBright,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colorDarkGray,
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
