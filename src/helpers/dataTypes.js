export const isString = val => typeof val === 'string';

export const isBoolean = val => typeof val === 'boolean';

export const isNumber = value => !Number.isNaN(parseFloat(value));