import capitalizeFirstLetter from '../../../../helpers/capitalizeFirstLetter';

export const splitAndCapitalize = text => text
  .split(/(?=[A-Z])/)
  .map(str => capitalizeFirstLetter(str))
  .join(' ');

export default {
  splitAndCapitalize,
};
