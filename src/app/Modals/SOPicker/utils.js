const getFilterCallback = (level, queryStr) => ({ name, scopeLevel }) => {
  const isLevelMatches = level === 'All' || scopeLevel === level;
  const nameLowerCased = name.toLowerCase();
  const queryStrLowerCased = queryStr.trim().toLowerCase();

  return isLevelMatches && nameLowerCased.includes(queryStrLowerCased);
};

export default getFilterCallback;
