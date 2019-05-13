// @flow
import React from 'react';
import {
  createNotification,
  NOTIFICATION_TYPE_SUCCESS,
  NOTIFICATION_TYPE_WARNING,
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_INFO,
} from 'react-redux-notify';
import {
  Info as InfoIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
} from '@material-ui/icons';

import config from './config';

export const ACTION_NOTIFICATION_SUCCESS = (message: string) => createNotification({
  message,
  type: NOTIFICATION_TYPE_SUCCESS,
  icon: <SuccessIcon />,
  ...config,
});

export const ACTION_NOTIFICATION_WARNING = (message: string) => createNotification({
  message,
  type: NOTIFICATION_TYPE_WARNING,
  icon: <WarningIcon />,
  ...config,
});

export const ACTION_NOTIFICATION_ERROR = (message: string) => createNotification({
  message,
  type: NOTIFICATION_TYPE_ERROR,
  icon: <ErrorIcon />,
  ...config,
});

export const ACTION_NOTIFICATION_INFO = (message: string) => createNotification({
  message,
  type: NOTIFICATION_TYPE_INFO,
  icon: <InfoIcon />,
  ...config,
});

export default {
  ACTION_NOTIFICATION_SUCCESS,
  ACTION_NOTIFICATION_WARNING,
  ACTION_NOTIFICATION_ERROR,
  ACTION_NOTIFICATION_INFO,
};
