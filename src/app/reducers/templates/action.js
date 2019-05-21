// @flow
import cloneDeep from 'lodash.clonedeep';
import type { Map as MapType } from '../map/types';
import {
  SET_TEMPLATES,
  CREATE_TEMPLATE_FROM_MAP,
} from './types';

export const ACTION_SET_TEMPLATES = (newTemplates: Array<MapType>) => ({
  type: SET_TEMPLATES,
  newTemplates,
});

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
