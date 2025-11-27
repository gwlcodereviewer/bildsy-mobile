import {AuthApiWithPayload, IAuthStateType} from '../types';
import {FETCH_PREFIXES} from '../../helpers/constants';
import {EMAIL_CHECK_API, PRO_DETAILS_API, PRO_LOGIN_API, REMOVE_ACCOUNT_API} from '../constants';

export const AUTH_INITIAL_STATE: IAuthStateType = {
  isApiInProgress: false,
  isApiDone: false,
  isLogin: false,
  message: '',
  payload: {},
  status: '',
  isSignUp: false,
};
const {PENDING, SUCCESS, FAILURE} = FETCH_PREFIXES;

export const auth = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'LOGIN_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false, isLogin: true};
    case `${PENDING}${'LOGIN_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'LOGIN_API'}`:
      return {...state, isApiInProgress: false};
    case `${SUCCESS}${'SOCIAL_LOGIN_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false, isLogin: true};
    case `${PENDING}${'SOCIAL_LOGIN_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'SOCIAL_LOGIN_API'}`:
      return {...state, isApiInProgress: false};
    case `${SUCCESS}${'SIGN_OUT_AUTH_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false, isLogin: false};
    case `${PENDING}${'SIGN_OUT_AUTH_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'SIGN_OUT_AUTH_API'}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const removeAccount = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${REMOVE_ACCOUNT_API}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${REMOVE_ACCOUNT_API}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${REMOVE_ACCOUNT_API}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const emailCheck = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${EMAIL_CHECK_API}`:
      return {...state, payload: action.payload, isApiInProgress: false, isLogin: true};
    case `${PENDING}${EMAIL_CHECK_API}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${EMAIL_CHECK_API}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const proAuth = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${PRO_LOGIN_API}`:
      return {...state, payload: action.payload, isApiInProgress: false, isLogin: true};
    case `${PENDING}${PRO_LOGIN_API}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${PRO_LOGIN_API}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const proUserDetails = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${PRO_DETAILS_API}`:
      return {...state, payload: action.payload, isApiInProgress: false, isLogin: true};
    case `${PENDING}${PRO_DETAILS_API}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${PRO_DETAILS_API}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};
