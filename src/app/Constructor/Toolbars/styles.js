import styled, { css } from 'styled-components';

const fontFamily = 'SF Pro Display, serif';
const toolbarColor = '#F0F8FE';

export const LabTitleItem = styled.div`
  display: flex;
  font-family: ${fontFamily};
  line-height: normal;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.06em;
  color: #24446A;
  margin-right: 15px;
  align-items: center;
`;

const labItemCommonStyles = css`
  margin-right: 5px;
`;

export const LabIcon = styled.img`
  ${labItemCommonStyles}
`;

export const LabTitle = styled.span`
  ${labItemCommonStyles}
`;

export const Block = styled.div`
   display: flex;
   align-items: center;
`;

const styles = () => ({
  positionRelative: {
    position: 'relative',
    backgroundColor: toolbarColor,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'none',
    borderBottom: '1px solid #c3c3c3',
  },
  root: {
    left: 0,
    top: 88,
    height: 'calc(100vh - 50px)',
    width: 50,
    background: toolbarColor,
    boxShadow: 'none',
    borderRight: '1px solid #c3c3c3',
    '&.full-screen': {
      top: 39,
    },
  },
});

export default styles;
