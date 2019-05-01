import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${({ isFullScreen }) => (
    isFullScreen
      ? 'calc(100vh - 42px)'
      : 'calc(100vh - 82px)'
  )};
  width: 100%;
`;

export default {
  Wrapper,
};
