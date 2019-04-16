import styled from 'styled-components';

const undoRedoPseudoCommon = {
  display: 'block',
  height: '60%',
  width: '1px',
  background: '#24446A',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  &::before {
    content: '';
    left: 0;
    ${undoRedoPseudoCommon};
  }
  &:after {
    content: '';
    right: 0;
    ${undoRedoPseudoCommon};
  }
  & > button {
    margin-right: 10px;
    &:hover:enabled {
      filter: sepia() saturate(10000%) hue-rotate(200deg);
    }

    &:first-child {
      margin-left: 10px;
    }
  }
`;

const styles = () => ({
  undoRedo: {
    padding: '8px',
  },
});

export default styles;
