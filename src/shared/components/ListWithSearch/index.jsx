// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  Close as CloseIcon, Search as SearchIcon,
} from '@material-ui/icons';
import {
  List, ListItem, ListItemText, Button, IconButton, TextField, Typography, CircularProgress,
} from '@material-ui/core';

import removeHTMLTags from '../../../helpers/removeHTMLTags';

import type { IListWithSearchProps, IListWithSearchState } from './types';

import styles, { SearchWrapper, ProgressWrapper } from './styles';

class ListWithSearch extends PureComponent<IListWithSearchProps, IListWithSearchState> {
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
      list,
      classes,
      isHideSearch,
      isItemsFetching,
      iconEven: IconEven,
      iconOdd: IconOdd,
    } = this.props;

    const listClassNames = classNames(
      classes.list,
      { [classes.listEmpty]: isHideSearch },
    );

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
              <Button
                classes={{ text: classes.listButton }}
                onClick={() => onItemClick(listItem)}
              >
                {i % 2 === 0 ? <IconEven /> : <IconOdd />}
                <ListItemText
                  primary={listItem.name}
                  secondary={removeHTMLTags(listItem.description)}
                />
              </Button>
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

        {isItemsFetching && (
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
