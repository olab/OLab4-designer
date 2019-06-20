import styled from 'styled-components';

import { DARK_BLUE } from '../../../shared/colors';

export const FieldLabel = styled.label`
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
});

export default styles;
