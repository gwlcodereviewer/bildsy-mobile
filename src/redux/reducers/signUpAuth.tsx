import {AuthApiWithPayload, ISignUpAuthStateType} from '../types';
import {FETCH_PREFIXES} from '../../helpers/constants';

export const SIGN_UP_AUTH_INITIAL_STATE: ISignUpAuthStateType = {
  isSignUpApiInProgress: false,
  isApiDone: false,
  isLogin: false,
  message: '',
  payload: {},
  status: '',
  isSignUp: false,
};
const {PENDING, SUCCESS, FAILURE} = FETCH_PREFIXES;

export const signUpAuth = (
  state: ISignUpAuthStateType | undefined,
  action: AuthApiWithPayload,
): ISignUpAuthStateType => {
  if (typeof state === 'undefined') {
    return SIGN_UP_AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'SING_UP_AUTH_API'}`:
      return {...state, payload: action.payload, isSignUpApiInProgress: false};
    case `${PENDING}${'SING_UP_AUTH_API'}`:
      return {...state, isSignUpApiInProgress: true};
    case `${FAILURE}${'SING_UP_AUTH_API'}`:
      return {...state, isSignUpApiInProgress: false};
    default:
      return state;
  }
};
export default signUpAuth;
