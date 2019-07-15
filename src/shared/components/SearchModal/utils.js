// @flow
export const filterItems = (items: Array<any>, queryStr: string): Array<any> => {
  const queryStrClear = queryStr.trim().toLowerCase();
  const itemsFiltered = items.filter(({ name }) => (
    name.toLowerCase().includes(queryStrClear)
  ));

  return itemsFiltered;
};

export default {
  filterItems,
};
