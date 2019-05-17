// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  ExpandMore as ExpandMoreIcon,
  ArrowForward as ArrowForwardIcon,
} from '@material-ui/icons';
import {
  Button,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';

import * as actions from '../reducers/map/action';

import type { IHomeProps, IHomeState } from './types';

import styles, {
  HomeWrapper,
  HomeHeader,
  ExpansionPanelWrapper,
} from './styles';

class Home extends PureComponent<IHomeProps, IHomeState> {
  state: IHomeState = {
    expanded: null,
  };

  handleChange = (panelName: string): Function => (event: Event, expanded: boolean): void => {
    this.setState({
      expanded: expanded
        ? panelName
        : null,
    });
  }

  onTemplateChoose = (templateName: string): void => {
    const { history, ACTION_CREATE_MAP_FROM_TEMPLATE } = this.props;
    ACTION_CREATE_MAP_FROM_TEMPLATE(templateName);

    history.push('/constructor');
  }

  render() {
    const { expanded } = this.state;
    const { classes } = this.props;

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
                onClick={() => this.onTemplateChoose('manual')}
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
              >
                Create Map
                <ArrowForwardIcon
                  fontSize="small"
                  classes={{ root: classes.icon }}
                />
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ExpansionPanelWrapper>
      </HomeWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ACTION_CREATE_MAP_FROM_TEMPLATE: (templateName: string) => {
    dispatch(actions.ACTION_CREATE_MAP_FROM_TEMPLATE(templateName));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(
  withStyles(styles)(
    withRouter(Home),
  ),
);
