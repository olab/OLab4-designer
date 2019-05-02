// @flow
export const getStringVariant = (variant: string) => {
  switch (variant) {
    case 'Standard':
      return 'none';
    case 'Dashed':
      return '15';
    case 'Dotted':
      return '5';
    default: return 'none';
  }
};

export default {
  getStringVariant,
};
