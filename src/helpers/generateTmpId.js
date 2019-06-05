const generateTmpId = (salt = 'tmp') => (
  `${salt}-${Math.random().toString(36).substr(2, 9)}`
);

export default generateTmpId;
