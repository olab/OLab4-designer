// @flow
import {
  type Templates as TemplatesType,
  type TemplatesActions,
  TEMPLATES_REQUESTED,
  TEMPLATES_REQUEST_FAILED,
  TEMPLATES_REQUEST_SUCCEEDED,
  CREATE_TEMPLATE_FROM_MAP,
} from './types';

export const initialTemplatesState: TemplatesType = {
  list: [],
  isFetching: false,
};

const templates = (state: TemplatesType = initialTemplatesState, action: TemplatesActions) => {
  switch (action.type) {
    case TEMPLATES_REQUESTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case TEMPLATES_REQUEST_FAILED: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case TEMPLATES_REQUEST_SUCCEEDED: {
      const { templates: diffTemplates } = action;

      return {
        isFetching: false,
        list: [
          ...state.list,
          ...diffTemplates,
        ],
      };
    }
    case CREATE_TEMPLATE_FROM_MAP: {
      const { template } = action;

      return {
        ...state,
        list: [
          ...state.list,
          template,
        ],
      };
    }
    default:
      return state;
  }
};

export default templates;
