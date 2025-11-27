export const FETCH_STATUSES = Object.freeze({
  NONE: 0,
  PENDING: 1,
  SUCCESS: 2,
  FAILURE: 3,
});

export const SERVER_STATUS = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const FETCH_PREFIXES = Object.freeze({
  NONE: 'NONE_',
  PENDING: 'PENDING_',
  SUCCESS: 'SUCCESS_',
  FAILURE: 'FAILURE_',
});

export const CRUD_ACTION_TYPES = Object.freeze({
  GET: 'GET',
  ADD: 'ADD',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
  RESET: 'RESET',
  POST: 'POST',
});

export const REQUEST_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

export const FLASH_MESSAGE_TYPES = Object.freeze({
  NONE: 'none',
  DEFAULT: 'default',
  INFO: 'info',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
});

export const DISPLAY_MODES = Object.freeze({
  CELL: 0,
  FULL: 1,
});

export const ISESSION_STATUS_TYPES = Object.freeze({
  NONE: 'Active',
  PAUSE: 'Pause',
  END: 'Completed',
});

export const SEARCH_PLACEHOLDER_TYPES = Object.freeze({
  CMS: 0,
  AMS: 1,
});

export const loggedInUserInfo = {
  userEmail: 'userEmail',
  firstName: 'firstName',
  lastName: 'lastName',
  userName: 'userName',
  userAvatar: 'userAvatar',
  userAccessToken: 'userAccessToken',
  customerId: '0',
};

export const ASYNC_CONST = {
  DEFAULT_THEME: 'DEFAULT_THEME',
  accessToken: 'accessToken',
  loggedInUserInfo: 'loggedInUserInfo',
  qbLogin: 'qbLogin',
  invitedUser: 'invitedUser',
  customerId: 'customerId',
  quickbloxSubscription: 'quickbloxSubscription',
};
export const ASYNC_CONST_QB = {
  loggedInUserInfoQb: 'loggedInUserInfoQb',
};

export const THEME_CONST = {
  systemDefault: 'SYSTEM_DEFAULT',
  lightTheme: 'LIGHT_THEME',
  darkTheme: 'DARK_THEME',
};

export const LOGIN_TYPE = {
  facebookLogin: 1, // Login by facebook
  gmailLogin: 2, // Login by gmail
  appleLogin: 3, // Login by apple
};
export const PROJECT_DATA = {
  setProjectData: 'setProjectData',
  RandomUniqId: 'RandomUniqId',
};
