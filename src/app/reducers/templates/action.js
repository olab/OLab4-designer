// @flow
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import differenceWith from 'lodash.differencewith';

import type { Map as MapType } from '../map/types';
import {
  type Template as TemplateType,
  TEMPLATES_REQUESTED,
  TEMPLATES_REQUEST_FAILED,
  TEMPLATES_REQUEST_SUCCEEDED,
  CREATE_TEMPLATE_FROM_MAP,
} from './types';

export const ACTION_TEMPLATES_REQUESTED = () => ({
  type: TEMPLATES_REQUESTED,
});

export const ACTION_TEMPLATES_REQUEST_FAILED = () => ({
  type: TEMPLATES_REQUEST_FAILED,
});

export const ACTION_TEMPLATES_REQUEST_SUCCEEDED = (
  oldTemplates: Array<TemplateType>,
  newTemplates: Array<TemplateType>,
) => {
  const diffTemplates = differenceWith(newTemplates, oldTemplates, isEqual);

  return {
    type: TEMPLATES_REQUEST_SUCCEEDED,
    templates: diffTemplates,
  };
};

export const ACTION_CREATE_TEMPLATE_FROM_MAP = (templateName: string, map: MapType) => {
  const template = cloneDeep(map);

  template.id = null;
  template.name = templateName;

  delete template.redo;
  delete template.undo;

  [template.nodes, template.edges]
    .forEach((items) => {
      items.forEach((item) => {
        item.isSelected = false;
      });
    });

  return {
    type: CREATE_TEMPLATE_FROM_MAP,
    template: map,
  };
};
