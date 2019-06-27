// @flow
import type { Template as TemplateType } from '../../../app/reducers/templates/types';

export type ITemplatesModalProps = {
  classes: {
    [props: string]: any,
  },
  label: string,
  text: string,
  onClose: Function,
  onTemplateChoose: Function,
  templates: Array<TemplateType>,
  isTemplatesFetching: boolean,
};
