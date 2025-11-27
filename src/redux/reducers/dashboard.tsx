import {AuthApiWithPayload, IAuthStateType} from '../types';
import {FETCH_PREFIXES} from '../../helpers/constants';

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

export const dashboardProjects = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'DASHBOARD_TOP_FIVE_PROJECT_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${'DASHBOARD_TOP_FIVE_PROJECT_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'DASHBOARD_TOP_FIVE_PROJECT_API'}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};
export default dashboardProjects;
