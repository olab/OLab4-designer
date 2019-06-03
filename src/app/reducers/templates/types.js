// @flow
export type Template = {
  id: number | null,
  name: string,
  description: string,
};

export type Templates = {
  list: Array<Template>,
  isFetching: boolean,
};

const TEMPLATES_REQUESTED = 'TEMPLATES_REQUESTED';
type TemplatesRequested = {
  type: 'TEMPLATES_REQUESTED',
};

const TEMPLATES_REQUEST_FAILED = 'TEMPLATES_REQUEST_FAILED';
type TemplatesRequestFailed = {
  type: 'TEMPLATES_REQUEST_FAILED',
};

const TEMPLATES_REQUEST_SUCCEEDED = 'TEMPLATES_REQUEST_SUCCEEDED';
type TemplatesRequestSucceeded = {
  type: 'TEMPLATES_REQUEST_SUCCEEDED',
  templates: Array<Template>,
};

const CREATE_TEMPLATE_FROM_MAP = 'CREATE_TEMPLATE_FROM_MAP';
type CreateTemplateFromMap = {
  type: 'CREATE_TEMPLATE_FROM_MAP',
  template: Template,
};

export type TemplatesActions = TemplatesRequestSucceeded | TemplatesRequested |
  TemplatesRequestFailed | CreateTemplateFromMap;

export {
  TEMPLATES_REQUESTED,
  TEMPLATES_REQUEST_FAILED,
  TEMPLATES_REQUEST_SUCCEEDED,
  CREATE_TEMPLATE_FROM_MAP,
};
