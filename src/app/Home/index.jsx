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
  Button, Typography, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
} from '@material-ui/core';

import SearchModal from '../../shared/components/SearchModal';

import * as mapActions from '../reducers/map/action';
import * as templatesActions from '../reducers/templates/action';

import type { Template as TemplateType } from '../reducers/templates/types';
import type { IHomeProps, IHomeState } from './types';
import { PAGE_TITLES } from '../config';
import { PANEL_NAMES } from './config';

import styles, {
  HomeWrapper, HomeHeader, ExpansionPanelWrapper,
} from './styles';

class Home extends PureComponent<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      expandedPanel: null,
      isButtonsDisabled: false,
      isShowTemplatesListModal: false,
    };

    this.setPageTitle();
  }

  componentDidUpdate(prevProps: IHomeProps) {
    const { mapId, isMapFetching, history } = this.props;

    const isFetchingStopped = prevProps.isMapFetching && !isMapFetching;
    const isMapRetrieved = isFetchingStopped && mapId;

    if (isFetchingStopped) {
      this.toggleDisableButtons();
    }

    if (isMapRetrieved) {
      history.push(`/${mapId}`);
    }
  }

  setPageTitle = (): void => {
    document.title = PAGE_TITLES.HOME;
  }

  handleChange = (panelName: string): Function => (event: Event, expanded: boolean): void => {
    this.setState({
      expandedPanel: expanded
        ? panelName
        : null,
    });
  }

  handleTemplateChoose = (template?: TemplateType): void => {
    const templateId = template ? template.id : null;

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

    this.setState({ isShowTemplatesListModal: true });
  }

  closeTemplatesListModal = (): void => {
    this.setState({ isShowTemplatesListModal: false });
  }

  render() {
    const {
      expandedPanel, isButtonsDisabled, isShowTemplatesListModal,
    } = this.state;
    const {
      classes, templates, isTemplatesFetching,
    } = this.props;

    return (
      <HomeWrapper>
        <HomeHeader>Welcome home!</HomeHeader>
        <ExpansionPanelWrapper>
          <ExpansionPanel
            expanded={expandedPanel === PANEL_NAMES.MANUAL}
            onChange={this.handleChange(PANEL_NAMES.MANUAL)}
          >
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
                onClick={() => this.handleTemplateChoose()}
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
          <ExpansionPanel
            expanded={expandedPanel === PANEL_NAMES.FROM_TEMPLATE}
            onChange={this.handleChange(PANEL_NAMES.FROM_TEMPLATE)}
          >
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
          <SearchModal
            label="Choose template"
            searchLabel="Search for template"
            text="Please take template from the following:"
            items={templates}
            onClose={this.closeTemplatesListModal}
            onItemChoose={this.handleTemplateChoose}
            isItemsFetching={isTemplatesFetching}
            iconEven={TemplateIcon}
            iconOdd={TemplateOutlinedIcon}
          />
        )}
      </HomeWrapper>
    );
  }
}

const mapStateToProps = ({ map, templates }) => ({
  mapId: map.id,
  isMapFetching: map.isFetching,
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
