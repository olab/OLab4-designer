import {
  Spa as MapsIcon,
  SpaOutlined as MapsOutlinedIcon,
  OfflineBolt as ServersIcon,
  OfflineBoltOutlined as ServersOutlinedIcon,
  Ballot as CoursesIcon,
  BallotOutlined as CoursesOutlinedIcon,
  Toys as GlobalsIcon,
  ToysOutlined as GlobalsOutlinedIcon,
  FilterVintage as DefaultIcon,
  FilterVintageOutlined as DefaultOutlinedIcon,
} from '@material-ui/icons';

import { SCOPE_LEVELS } from '../../config';

export const getIconsByScopeLevel = (level) => {
  switch (level) {
    case SCOPE_LEVELS[0]:
      return {
        iconEven: MapsIcon,
        iconOdd: MapsOutlinedIcon,
      };
    case SCOPE_LEVELS[1]:
      return {
        iconEven: ServersIcon,
        iconOdd: ServersOutlinedIcon,
      };
    case SCOPE_LEVELS[2]:
      return {
        iconEven: CoursesIcon,
        iconOdd: CoursesOutlinedIcon,
      };
    case SCOPE_LEVELS[3]:
      return {
        iconEven: GlobalsIcon,
        iconOdd: GlobalsOutlinedIcon,
      };
    default:
      return {
        iconEven: DefaultIcon,
        iconOdd: DefaultOutlinedIcon,
      };
  }
};

export default {
  getIconsByScopeLevel,
};
