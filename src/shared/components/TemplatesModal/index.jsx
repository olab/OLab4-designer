// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  Dashboard as TemplateIcon,
  DashboardOutlined as TemplateOutlinedIcon,
} from '@material-ui/icons';
import {
  List, ListItem, ListItemText, Button, IconButton, TextField, Typography, CircularProgress,
} from '@material-ui/core';

import ConfirmationModal from '../ConfirmationModal';

import { filterTemplates } from './utils';
import removeHTMLTags from '../../../helpers/removeHTMLTags';

import type { ITemplatesModalProps, ITemplatesModalState } from './types';

import styles, { ProgressWrapper, SearchWrapper } from './styles';

class TemplatesModal extends PureComponent<ITemplatesModalProps, ITemplatesModalState> {
  constructor(props: ITemplatesModalProps) {
    super(props);
    this.state = {
      queryStr: '',
      templatesFiltered: props.templates,
    };
  }

  componentDidUpdate(prevProps: ITemplatesModalProps) {
    const { queryStr } = this.state;
    const { templates } = this.props;

    if (templates !== prevProps.templates) {
      const templatesFiltered = filterTemplates(templates, queryStr);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ templatesFiltered });
    }
  }

  handleTemplatesSearch = (e: Event): void => {
    const { templates } = this.props;
    const { value: queryStr } = (e.target: window.HTMLInputElement);
    const templatesFiltered = filterTemplates(templates, queryStr);

    this.setState({
      queryStr,
      templatesFiltered,
    });
  }

  clearSearchInput = (): void => {
    const { templates } = this.props;

    this.setState({
      queryStr: '',
      templatesFiltered: templates,
    });
  }

  render() {
    const {
      queryStr, templatesFiltered,
    } = this.state;
    const {
      label, text, onClose, onTemplateChoose, templates, isTemplatesFetching, classes,
    } = this.props;

    const isShowEmptyList = !isTemplatesFetching && !templatesFiltered.length;
    const isFirstTemplatesFetching = isTemplatesFetching && !templates.length;

    const listClassNames = classNames(
      classes.list,
      { [classes.listEmpty]: isFirstTemplatesFetching },
    );

    return (
      <ConfirmationModal
        label={label}
        text={text}
        onClose={onClose}
      >
        {!isFirstTemplatesFetching && (
          <SearchWrapper>
            <TextField
              type="search"
              label="Search for templates"
              className={classes.searchField}
              value={queryStr}
              onChange={this.handleTemplatesSearch}
              fullWidth
            />

            {queryStr.trim() ? (
              <IconButton
                aria-label="Clear Input"
                title="Clear Input"
                onClick={this.clearSearchInput}
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
          {templatesFiltered.map((template, i) => (
            <ListItem
              key={template.id}
              classes={{ root: classes.listItem }}
            >
              <Button
                classes={{ text: classes.listButton }}
                onClick={() => onTemplateChoose(template.id)}
              >
                {i % 2 === 0 ? <TemplateIcon /> : <TemplateOutlinedIcon />}
                <ListItemText
                  primary={template.name}
                  secondary={removeHTMLTags(template.description)}
                />
              </Button>
            </ListItem>
          ))}

          {isShowEmptyList && (
            <ListItem classes={{ root: classes.listItem }}>
              <Typography align="right" variant="caption">
                Empty list...
              </Typography>
            </ListItem>
          )}
        </List>

        {isTemplatesFetching && (
          <ProgressWrapper>
            <CircularProgress size={24} />
            <Typography variant="caption" className={classes.spinnerCaption}>
              Updating list from the server...
            </Typography>
          </ProgressWrapper>
        )}
      </ConfirmationModal>
    );
  }
}

export default withStyles(styles)(TemplatesModal);
