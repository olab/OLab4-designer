// @flow
export type IListWithSearchProps = {
  classes: {
    [props: string]: any,
  },
  label: string,
  onClear: Function,
  onSearch: Function,
  onItemClick: Function,
  onItemDelete?: Function,
  innerRef: Function,
  list: Array<any>,
  iconEven?: any,
  iconOdd?: any,
  isHideSearch: boolean,
  isItemsFetching: boolean,
  isForModal: boolean,
  isWithSpinner: boolean,
};

export type IListWithSearchState = {
  query: string,
};
