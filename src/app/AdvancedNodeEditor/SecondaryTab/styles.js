import styled from 'styled-components';
import { DARK_BLUE } from '../../../shared/colors';

export const Title = styled.h3`
  color: ${DARK_BLUE};
`;

export const TextFieldContainer = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
`;

export const TextEditorBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 100px;
`;

export const BlockCheckbox = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

export const CheckBoxContainer = styled.div`
  width: 820px;
  padding-right: 20px;
  padding-bottom: 100px;
`;

const styles = () => ({
  textField: {
    marginLeft: 5,
    width: '100%',
  },
});

export default styles;
