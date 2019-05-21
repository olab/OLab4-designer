// @flow
import {
  type Templates as TemplatesType,
  type TemplatesActions,
  SET_TEMPLATES,
  CREATE_TEMPLATE_FROM_MAP,
} from './types';

export const initialTemplatesState: TemplatesType = [];

const templates = (state: TemplatesType = initialTemplatesState, action: TemplatesActions) => {
  switch (action.type) {
    case SET_TEMPLATES: {
      const { newTemplates } = action;

      return [
        ...state,
        ...newTemplates,
      ];
    }
    case CREATE_TEMPLATE_FROM_MAP: {
      const { template } = action;

      return [
        ...state,
        template,
      ];
    }
    default:
      return state;
  }
};

export default templates;
