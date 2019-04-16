import styled from 'styled-components';

export const Wrapper = styled.div`
  height: ${props => (props.isFullScreen ? 'calc(100vh - 42px)' : 'calc(100vh - 82px)')};
  width: 100%;
  display: flex;
`;

export const Container = styled.div`
  position: relative;
  flex: 1;
`;
