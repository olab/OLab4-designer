import styled from 'styled-components';

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
  },
  listButton: {
    textTransform: 'initial',
    textAlign: 'initial',
  },
});

export default styles;
