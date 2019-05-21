// @flow
import type { Map as MapType } from '../map/types';

export type Templates = Array<MapType>;

const SET_TEMPLATES = 'SET_TEMPLATES';
type SetTemplates = {
  type: 'SET_TEMPLATES',
  newTemplates: Array<MapType>,
};

const CREATE_TEMPLATE_FROM_MAP = 'CREATE_TEMPLATE_FROM_MAP';
type CreateTemplateFromMap = {
  type: 'CREATE_TEMPLATE_FROM_MAP',
  template: MapType,
};

export type TemplatesActions = SetTemplates | CreateTemplateFromMap;

export {
  SET_TEMPLATES,
  CREATE_TEMPLATE_FROM_MAP,
};
