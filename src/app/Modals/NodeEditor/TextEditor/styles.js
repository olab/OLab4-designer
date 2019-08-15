import styled from 'styled-components';

import { GREY, BLACK } from '../../../../shared/colors';

export const EditorContainer = styled.div`
  & .public-DraftEditor-content {
    height: 200px;
    max-height: 200px;
    overflow: auto;
  };

  & [class^='public-DraftStyleDefault'] {
    margin: 0;
  }
`;

export const editorStyle = {
  color: BLACK,
  margin: 0,
  padding: 5,
  border: `1px solid ${GREY}`,
  marginTop: 5,
};

export const wrapperStyle = {
  width: 400,
};

export const toolbarStyle = {
  display: 'flex',
  justifyContent: 'center',
  color: BLACK,
};
