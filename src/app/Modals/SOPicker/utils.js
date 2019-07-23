const getFilterCallback = (level, queryStr) => ({ name, scopeLevel }) => {
  const isLevelMatches = level === 'All' || scopeLevel === level;

  if (!isLevelMatches) {
    return false;
  }

  const nameLowerCased = name.toLowerCase();
  const queryStrLowerCased = queryStr.trim().toLowerCase();

  return nameLowerCased.includes(queryStrLowerCased);
};

export default getFilterCallback;
