// @flow
import type { MapDetails } from '../../reducers/mapDetails/types';

export type BasicDetailsProps = {
  classes: {
    [prop: string]: any,
  },
  details: MapDetails,
  handleInputChange: Function,
  handleEditorChange: Function,
};
