import styled from 'styled-components';

import { DARK_BLUE } from '../../../shared/colors';

export const FieldLabel = styled.label`
  position: relative;
  color: ${DARK_BLUE};
  font-weight: 600;
  margin-top: 0.7rem;
`;

const styles = () => ({
  label: {
    color: DARK_BLUE,
    fontStyle: 'bold',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    marginTop: '1rem',
    float: 'right',
    bottom: 0,
    width: 160,
  },
  textField: {
    marginTop: '0.5rem',
  },
  chip: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '99%',
    bottom: 3,
    left: 3,
  },
});

export default styles;
