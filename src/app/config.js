export const SCOPE_LEVELS = ['Maps', 'Servers', 'Courses', 'Globals'];

export const SCOPED_OBJECTS = {
  CONSTANT: 'Constant',
  COUNTER: 'Counter',
  QUESTION: 'Question',
};

export const PAGE_TITLES = {
  HOME: 'Open Labyrinth',
  NOT_FOUND: 'Page not found',
  DESIGNER: mapName => `Designer: ${mapName}`,
  SO_LIST: objectType => `${objectType}s`,
  ADD_SO: objectType => `Add ${objectType}`,
  EDIT_SO: objectType => `Edit ${objectType}`,
};

export const LINK_STYLES = [
  'Hyperlinks',
  'Dropdown',
  'Dropdown + Confidence',
  'Type in text',
  'Buttons',
];

export const LOCAL_STORAGE_KEY = 'node';
