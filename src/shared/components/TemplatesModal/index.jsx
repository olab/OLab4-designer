// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dashboard as TemplateIcon,
  DashboardOutlined as TemplateOutlinedIcon,
} from '@material-ui/icons';
import {
  List, ListItem, ListItemText, Button, Typography, LinearProgress,
} from '@material-ui/core';

import ConfirmationModal from '../ConfirmationModal';
import removeHTMLTags from '../../../helpers/removeHTMLTags';

import type { ITemplatesModalProps } from './types';

import styles, { LinearProgressWrapper } from './styles';

const TemplatesModal = ({
  label, text, onClose, onTemplateChoose, templates, isTemplatesFetching, classes,
}: ITemplatesModalProps) => (
  <ConfirmationModal
    label={label}
    text={text}
    onClose={onClose}
  >
    <LinearProgressWrapper isShow={isTemplatesFetching}>
      <Typography align="right" variant="caption">
        Updating list from the server...
      </Typography>
      <LinearProgress />
    </LinearProgressWrapper>

    <List
      classes={{ root: classes.list }}
      disablePadding
    >
      {templates.map((template, i) => (
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
    </List>

    {!isTemplatesFetching && !templates.length && (
      <Typography align="right" variant="caption">
        Empty list...
      </Typography>
    )}
  </ConfirmationModal>
);

export default withStyles(styles)(TemplatesModal);
