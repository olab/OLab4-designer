import styled from 'styled-components';

const lightColor = '#fff';
const darkColor = '#000';


export const NodeTextWrapper = styled.text`
  fill: ${props => (props.selected ? lightColor : darkColor)};
  cursor: pointer;
  user-select: none;
  stroke: ${props => (props.selected && lightColor)};
`;

export default NodeTextWrapper;
