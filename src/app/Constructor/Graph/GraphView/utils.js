import crosshair from '../../../../shared/assets/icons/crosshair.cur';

export const setCursorCSS = (cursor) => {
  switch (cursor) {
    case 'customCrosshair':
      return `url('${crosshair}') 12 12, auto`;
    default:
      return cursor;
  }
};

export default {
  setCursorCSS,
};
