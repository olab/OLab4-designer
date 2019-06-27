export const capitalizeFirstLetter = word => word.charAt(0).toUpperCase() + word.slice(1);

export const splitAndCapitalize = text => text
  .split(/(?=[A-Z])/)
  .map(str => capitalizeFirstLetter(str))
  .join(' ');
