// @flow
import { MapDetails } from '../../reducers/mapDetails/types';

export type AppearanceProps = {
  details: MapDetails,
  themes: Array<string>,
  handleSelectChange: Function,
};
