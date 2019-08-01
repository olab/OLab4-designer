// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  FilterVintage as DefaultIcon,
  FilterVintageOutlined as DefaultOutlinedIcon,
} from '@material-ui/icons';
import {
  List, ListItem, ListItemText, Button, IconButton, TextField, Typography, CircularProgress,
} from '@material-ui/core';

import removeHTMLTags from '../../../helpers/removeHTMLTags';

import type { IListWithSearchProps, IListWithSearchState } from './types';

import styles, {
  SearchWrapper, ProgressWrapper, ListItemContentWrapper,
} from './styles';

class ListWithSearch extends PureComponent<IListWithSearchProps, IListWithSearchState> {
  static defaultProps = {
    iconEven: DefaultIcon,
    iconOdd: DefaultOutlinedIcon,
    isForModal: false,
    isWithSpinner: true,
  };

  state: IListWithSearchState = {
    query: '',
  };

  clearSearch = (): void => {
    const { onClear } = this.props;

    onClear();
    this.setState({ query: '' });
  }

  handleInputChange = (e: Event): void => {
    const { onSearch } = this.props;
    const { name, value } = (e.target: window.HTMLInputElement);

    onSearch(value);
    this.setState({ [name]: value });
  }

  render() {
    const { query } = this.state;
    const {
      label,
      onItemClick,
      onItemDelete,
      list,
      classes,
      isForModal,
      isWithSpinner,
      isHideSearch,
      isItemsFetching,
      iconEven: IconEven,
      iconOdd: IconOdd,
    } = this.props;

    const listClassNames = classNames(
      classes.list,
      { [classes.listLimits]: isForModal },
      { [classes.listEmpty]: isHideSearch },
    );

    const isShowSpinner = isWithSpinner && isItemsFetching;

    return (
      <div>
        {!isHideSearch && (
          <SearchWrapper>
            <TextField
              type="search"
              name="query"
              label={label}
              className={classes.searchField}
              value={query}
              onChange={this.handleInputChange}
              fullWidth
            />

            {query.trim() ? (
              <IconButton
                aria-label="Clear Input"
                title="Clear Input"
                onClick={this.clearSearch}
                classes={{ root: classes.searchIcon }}
              >
                <CloseIcon />
              </IconButton>
            ) : (
              <SearchIcon
                classes={{ root: classes.searchIcon }}
              />
            )}
          </SearchWrapper>
        )}

        <List
          classes={{ root: listClassNames }}
          disablePadding
        >
          {list.map((listItem, i) => (
            <ListItem
              key={listItem.id}
              classes={{ root: classes.listItem }}
            >
              <ListItemContentWrapper>
                <Button
                  classes={{ text: classes.listButton }}
                  onClick={() => onItemClick(listItem)}
                >
                  {i % 2 === 0 ? <IconEven /> : <IconOdd />}
                  <ListItemText
                    primary={listItem.name}
                    secondary={removeHTMLTags(listItem.description || '')}
                    classes={{ secondary: classes.secondaryText }}
                  />
                </Button>
                {onItemDelete && (
                  <IconButton
                    aria-label="Delete Scoped Object"
                    title={`Delete ${listItem.name}`}
                    size="small"
                    onClick={() => onItemDelete(listItem.id)}
                    classes={{ root: classes.deleteIcon }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItemContentWrapper>
            </ListItem>
          ))}

          {!list.length && (
            <ListItem classes={{ root: classes.listItem }}>
              <Typography align="right" variant="caption">
                Empty list...
              </Typography>
            </ListItem>
          )}
        </List>

        {isShowSpinner && (
          <ProgressWrapper>
            <CircularProgress size={24} />
            <Typography variant="caption" className={classes.spinnerCaption}>
              Updating list from the server...
            </Typography>
          </ProgressWrapper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ListWithSearch);
