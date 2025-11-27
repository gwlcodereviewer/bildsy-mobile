import {IAuthStateType, UserDetailApiWithPayload} from '../types';
import {FETCH_PREFIXES} from '../../helpers/constants';

export const USER_DETAIL_INITIAL_STATE: IAuthStateType = {
  isApiInProgress: false,
  isApiDone: false,
  isLogin: false,
  message: '',
  payload: {},
  status: '',
  isSignUp: false,
};
const {PENDING, SUCCESS, FAILURE} = FETCH_PREFIXES;

export const userProfile = (state: IAuthStateType | undefined, action: UserDetailApiWithPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return USER_DETAIL_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${'USER_PROFILE_DETAILS_API'}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${'USER_PROFILE_DETAILS_API'}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${'USER_PROFILE_DETAILS_API'}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export default userProfile;
