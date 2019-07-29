// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Paper, Typography, Divider, CircularProgress,
} from '@material-ui/core';

import ListWithSearch from '../../../shared/components/ListWithSearch';

import type { ISOListProps, ISOListState } from './types';
import type { ScopedObjectListItem as ScopedObjectListItemType } from '../../reducers/scopedObjects/types';

import * as scopedObjectsActions from '../../reducers/scopedObjects/action';

import filterByName from '../../../helpers/filterByName';
import { toLowerCaseAndPlural, toUpperCaseAndPlural } from '../utils';

import styles, {
  HeaderWrapper, ProgressWrapper, ListWithSearchWrapper,
} from './styles';
import { PAGE_TITLES } from '../../config';
import capitalizeFirstLetter from '../../../helpers/capitalizeFirstLetter';

class SOList extends PureComponent<ISOListProps, ISOListState> {
  listWithSearchRef: null | React.RefObject<any>;

  SOTypeLowerCasedAndPluralled: string;

  SOTypeUpperCasedAndPluralled: string;

  constructor(props: ISOListProps) {
    super(props);
    this.state = {
      scopedObjectsFiltered: props.scopedObjects,
    };

    this.listWithSearchRef = React.createRef();

    const {
      match: { params: { scopedObjectType } },
      ACTION_SCOPED_OBJECTS_TYPED_REQUESTED,
    } = props;

    this.SOTypeLowerCasedAndPluralled = toLowerCaseAndPlural(scopedObjectType);
    this.SOTypeUpperCasedAndPluralled = toUpperCaseAndPlural(scopedObjectType);
    ACTION_SCOPED_OBJECTS_TYPED_REQUESTED(this.SOTypeLowerCasedAndPluralled);
  }

  componentDidUpdate(prevProps: ISOListProps) {
    const {
      scopedObjects,
      match: { params: { scopedObjectType } },
      ACTION_SCOPED_OBJECTS_TYPED_REQUESTED,
    } = this.props;
    const {
      scopedObjects: scopedObjectsPrev,
      match: { params: { scopedObjectType: scopedObjectTypePrev } },
    } = prevProps;
    const { query } = this.listWithSearchRef.state;

    this.setPageTitle();

    if (scopedObjectType !== scopedObjectTypePrev) {
      this.SOTypeLowerCasedAndPluralled = toLowerCaseAndPlural(scopedObjectType);
      this.SOTypeUpperCasedAndPluralled = toUpperCaseAndPlural(scopedObjectType);

      ACTION_SCOPED_OBJECTS_TYPED_REQUESTED(this.SOTypeLowerCasedAndPluralled);
    }

    if (scopedObjects !== scopedObjectsPrev) {
      const scopedObjectsFiltered = filterByName(scopedObjects, query);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ scopedObjectsFiltered });
    }
  }

  setPageTitle = (): void => {
    const {
      match: { params: { scopedObjectType } },
    } = this.props;

    document.title = PAGE_TITLES.SO_LIST(capitalizeFirstLetter(scopedObjectType));
  }

  handleItemsSearch = (query: string): void => {
    const { scopedObjects } = this.props;
    const scopedObjectsFiltered = filterByName(scopedObjects, query);

    this.setState({ scopedObjectsFiltered });
  }

  clearSearchInput = (): void => {
    const { scopedObjects } = this.props;
    const scopedObjectsFiltered = scopedObjects;

    this.setState({ scopedObjectsFiltered });
  }

  handleScopedObjectClick = (scopedObject: ScopedObjectListItemType): void => {
    const { history, location: { pathname } } = this.props;
    history.push(`${pathname}/${scopedObject.id}`);
  }

  setListWithSearchRef = (ref: any): void => {
    this.listWithSearchRef = ref;
  }

  handleScopedObjectDelete = (scopedObjectId: number): void => {
    const { ACTION_SCOPED_OBJECT_DELETE_REQUESTED } = this.props;
    ACTION_SCOPED_OBJECT_DELETE_REQUESTED(
      scopedObjectId,
      this.SOTypeLowerCasedAndPluralled,
    );
  }

  render() {
    const { scopedObjectsFiltered } = this.state;
    const {
      classes,
      scopedObjects,
      isScopedObjectsFetching,
      location: { pathname },
      match: { params: { scopedObjectType } },
    } = this.props;

    const isHideSearch = isScopedObjectsFetching && !scopedObjects.length;

    return (
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={1} md={1} className={classes.leftPanel} />
        <Grid item xs={12} sm={11} md={11} component={Paper} className={classes.rightPanel}>
          <HeaderWrapper>
            <Typography variant="h4" className={classes.title}>
              {this.SOTypeUpperCasedAndPluralled}
            </Typography>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              component={Link}
              to={`${pathname}/add`}
            >
              {`Add New ${scopedObjectType}`}
            </Button>

            {isScopedObjectsFetching && (
              <ProgressWrapper>
                <CircularProgress size={24} />
                <Typography variant="caption" className={classes.spinnerCaption}>
                  Updating list from the server...
                </Typography>
              </ProgressWrapper>
            )}
          </HeaderWrapper>
          <Divider />
          <ListWithSearchWrapper>
            <ListWithSearch
              label="Search for object"
              innerRef={this.setListWithSearchRef}
              onSearch={this.handleItemsSearch}
              onClear={this.clearSearchInput}
              onItemClick={this.handleScopedObjectClick}
              onItemDelete={this.handleScopedObjectDelete}
              list={scopedObjectsFiltered}
              isHideSearch={isHideSearch}
              isItemsFetching={isScopedObjectsFetching}
              isWithSpinner={false}
            />
          </ListWithSearchWrapper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (
  { scopedObjects },
  { match: { params: { scopedObjectType } } },
) => ({
  scopedObjects: scopedObjects[toLowerCaseAndPlural(scopedObjectType)],
  isScopedObjectsFetching: scopedObjects.isFetching,
});

const mapDispatchToProps = dispatch => ({
  ACTION_SCOPED_OBJECTS_TYPED_REQUESTED: (scopedObjectType: string) => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECTS_TYPED_REQUESTED(scopedObjectType));
  },
  ACTION_SCOPED_OBJECT_DELETE_REQUESTED: (
    scopedObjectId: number,
    scopedObjectType: string,
  ) => {
    dispatch(scopedObjectsActions.ACTION_SCOPED_OBJECT_DELETE_REQUESTED(
      scopedObjectId,
      scopedObjectType,
    ));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  withStyles(styles)(
    withRouter(SOList),
  ),
);
