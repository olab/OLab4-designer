import axios from 'axios';
import merge from 'lodash.merge';

import defaultConfig from './apiConfig';

const createInstance = (customConfig = {}) => {
  const config = merge(customConfig, defaultConfig);
  return axios.create(config);
};

export default createInstance;
