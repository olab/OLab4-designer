import styled from 'styled-components';

import {
  VIEWPORT_OFFSET_X, VIEWPORT_OFFSET_Y, VIEWPORT_FULL_SCREEN_OFFSET_Y,
} from './config';

export const Wrapper = styled.div`
  height: calc(100vh - ${({ isFullScreen }) => (isFullScreen
    ? VIEWPORT_FULL_SCREEN_OFFSET_Y
    : VIEWPORT_OFFSET_Y
  )}px);
  width: calc(100% - ${VIEWPORT_OFFSET_X}px);
  margin-left: auto;
`;

export default {
  Wrapper,
};
