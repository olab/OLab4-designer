import styled from 'styled-components';

export const Item = styled.div`
  display: inline-block;
  width: 48px;
  font-size: 0;
  padding: 0;
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  &.active {
    background: #24446A;
    opacity: 0.06;
  }
`;

export const Icon = styled.img`
  padding: 9px 12px;

  &.active {
    visibility: visible;
  }
`;
