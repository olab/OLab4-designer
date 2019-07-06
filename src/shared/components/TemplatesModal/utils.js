// @flow
import type { Template as TemplateType } from '../../../app/reducers/templates/types';

export const filterTemplates = (
  templates: Array<TemplateType>,
  queryStr: string,
): Array<TemplateType> => {
  const queryStrClear = queryStr.trim().toLowerCase();
  const templatesFiltered = templates.filter(({ name }) => (
    name.toLowerCase().includes(queryStrClear)
  ));

  return templatesFiltered;
};

export default {
  filterTemplates,
};
