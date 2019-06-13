// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon,
  Dashboard as TemplateIcon,
  DashboardOutlined as TemplateOutlinedIcon,
} from '@material-ui/icons';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  LinearProgress,
} from '@material-ui/core';

import TemplatesModal from '../../shared/components/ConfirmationModal';

import * as mapActions from '../reducers/map/action';
import * as templatesActions from '../reducers/templates/action';
import removeHTMLTags from '../../helpers/removeHTMLTags';

import type { IHomeProps, IHomeState } from './types';

import styles, {
  HomeWrapper,
  HomeHeader,
  ExpansionPanelWrapper,
} from './styles';

class Home extends PureComponent<IHomeProps, IHomeState> {
  state: IHomeState = {
    expanded: null,
    isButtonsDisabled: false,
    isShowTemplatesListModal: false,
  };

  componentDidUpdate(prevProps: IHomeProps) {
    const { mapId, isMapFetching, history } = this.props;

    const isFetchingStopped = prevProps.isMapFetching && !isMapFetching;
    const isMapRetrieved = isFetchingStopped && mapId;

    if (isFetchingStopped) {
      this.toggleDisableButtons();
    }

    if (isMapRetrieved) {
      history.push(`/constructor/${mapId}`);
    }
  }

  handleChange = (panelName: string): Function => (event: Event, expanded: boolean): void => {
    this.setState({
      expanded: expanded
        ? panelName
        : null,
    });
  }

  onTemplateChoose = (templateId?: number): void => {
    const { ACTION_CREATE_MAP_REQUESTED } = this.props;
    ACTION_CREATE_MAP_REQUESTED(templateId);

    this.toggleDisableButtons();
  }

  toggleDisableButtons = (): void => {
    this.setState(({ isButtonsDisabled }) => ({
      isButtonsDisabled: !isButtonsDisabled,
    }));
  }

  showTemplatesListModal = (): void => {
    const { ACTION_TEMPLATES_REQUESTED } = this.props;

    ACTION_TEMPLATES_REQUESTED();

    this.setState({
      isShowTemplatesListModal: true,
    });
  }

  closeTemplatesListModal = (): void => {
    this.setState({
      isShowTemplatesListModal: false,
    });
  }

  render() {
    const {
      expanded, isButtonsDisabled, isShowTemplatesListModal,
    } = this.state;
    const {
      classes, templates, isTemplatesFetching,
    } = this.props;

    return (
      <HomeWrapper>
        <HomeHeader>Welcome home!</HomeHeader>
        <ExpansionPanelWrapper>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Manual Map Creation</Typography>
              <Typography className={classes.secondaryHeading}>More experienced authors</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.content}>
                A single pre-populated root node (named ‘Start node’)
                is created and positioned in middle of Layout Editor window.
                <br />
                <br />
                Then you will be prompted for a Map name to save to before proceeding;
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                aria-label="Create"
                classes={{ root: classes.fab }}
                onClick={() => this.onTemplateChoose()}
                disabled={isButtonsDisabled}
              >
                Create Map
                <ArrowForwardIcon
                  fontSize="small"
                  classes={{ root: classes.icon }}
                />
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Create Map from Template</Typography>
              <Typography className={classes.secondaryHeading}>General map creation</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography className={classes.content}>
                Allows for the creation of a map from a predefined template.
                <br />
                <br />
                Once a template is selected, the Map Layout Editor window
                appears with pre-defined nodes.
                <br />
                <br />
                The Simple Template consists of a root node (named ‘Start Node’)
                linked to a second node with a one-way, single arrow link icon.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                aria-label="Create"
                classes={{ root: classes.fab }}
                onClick={this.showTemplatesListModal}
                disabled={isButtonsDisabled}
              >
                Choose Template
                <ArrowForwardIcon
                  fontSize="small"
                  classes={{ root: classes.icon }}
                />
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ExpansionPanelWrapper>

        {isShowTemplatesListModal && (
          <TemplatesModal
            label="Choose template"
            text="Please take template from the following:"
            onClose={this.closeTemplatesListModal}
          >
            <List
              classes={{ root: classes.list }}
              disablePadding
            >
              {templates.map((template, i) => (
                <ListItem key={template.id}>
                  <Button
                    classes={{ text: classes.listButton }}
                    onClick={() => this.onTemplateChoose(template.id)}
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

            <div style={{ visibility: isTemplatesFetching ? '' : 'hidden' }}>
              <LinearProgress />
              <Typography align="right" variant="caption">
                Updating list from the server...
              </Typography>
            </div>
          </TemplatesModal>
        )}
      </HomeWrapper>
    );
  }
}

const mapStateToProps = ({ map: { id, isFetching }, templates }) => ({
  mapId: id,
  isMapFetching: isFetching,
  templates: templates.list,
  isTemplatesFetching: templates.isFetching,
});

const mapDispatchToProps = dispatch => ({
  ACTION_CREATE_MAP_REQUESTED: (templateId?: number) => {
    dispatch(mapActions.ACTION_CREATE_MAP_REQUESTED(templateId));
  },
  ACTION_TEMPLATES_REQUESTED: () => {
    dispatch(templatesActions.ACTION_TEMPLATES_REQUESTED());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(
    withRouter(Home),
  ),
);
