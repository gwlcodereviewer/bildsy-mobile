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

export const bids = (state: IAuthStateType | undefined, action: AuthApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'GET_BID_LIST_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${'GET_BID_LIST_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'GET_BID_LIST_API'}`:
      return {...state, isApiInProgress: false};

    default:
      return state;
  }
};
export default bids;
