import {AuthApiWithPayload, IAuthStateType} from '../types';
import {FETCH_PREFIXES} from '../../helpers/constants';

export const PROJECT_DETAILS_INITIAL_STATE: IAuthStateType = {
  isApiInProgress: false,
  isApiDone: false,
  isLogin: false,
  message: '',
  payload: {},
  status: '',
  isSignUp: false,
};
const {PENDING, SUCCESS, FAILURE} = FETCH_PREFIXES;

export const projectDetails = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return PROJECT_DETAILS_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'PROJECT_DETAILS_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${'PROJECT_DETAILS_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'PROJECT_DETAILS_API'}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const SELECTED_PROFESSIONAL_INITIAL_STATE: IAuthStateType = {
  isApiInProgress: false,
  isApiDone: false,
  isLogin: false,
  message: '',
  payload: {},
  status: '',
  isSignUp: false,
};

export const selectedProfessionalDetails = (
  state: IAuthStateType | undefined,
  action: AuthApiWithPayload,
): IAuthStateType => {
  if (typeof state === 'undefined') {
    return PROJECT_DETAILS_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'SELECTED_PROFESSIONALS_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${'SELECTED_PROFESSIONALS_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'SELECTED_PROFESSIONALS_API'}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};
