// @flow
import type { Template as TemplateType } from '../reducers/templates/types';

export type IHomeProps = {
  classes: {
    [props: string]: any,
  },
  history: any,
  mapId: number | null,
  isMapFetching: boolean,
  templates: Array<TemplateType>,
  isTemplatesFetching: boolean,
  showFooterButtons: boolean,
  ACTION_TEMPLATES_REQUESTED: Function,
  ACTION_CREATE_MAP_REQUESTED: Function,
};

export type IHomeState = {
  expanded: string | null,
  isButtonsDisabled: boolean,
  isShowTemplatesListModal: boolean,
};
