import {FETCH_PREFIXES} from '../../helpers/constants';
import {ADD_COMMENT_API, ADD_PRO_REVIEW_API, GET_PRO_REVIEW_API, REPORT_CONVERSATION_API} from '../constants';
import {IAuthStateType, IReviewPayload} from '../types';

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

export const addProReview = (state: IAuthStateType | undefined, action: IReviewPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${ADD_PRO_REVIEW_API}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${ADD_PRO_REVIEW_API}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${ADD_PRO_REVIEW_API}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const getProReview = (state: IAuthStateType | undefined, action: IReviewPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${GET_PRO_REVIEW_API}`:
      return {...state, payload: action.payload, isApiInProgress: false};
    case `${PENDING}${GET_PRO_REVIEW_API}`:
      return {...state, isApiInProgress: true};
    case `${FAILURE}${GET_PRO_REVIEW_API}`:
      return {...state, isApiInProgress: false};
    default:
      return state;
  }
};

export const addReviewComment = (state: IAuthStateType | undefined, action: IReviewPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${ADD_COMMENT_API}`:
      return {...state, payload: action.payload, isApiInProgress: false, isApiDone: true};
    case `${PENDING}${ADD_COMMENT_API}`:
      return {...state, isApiInProgress: true, isApiDone: false};
    case `${FAILURE}${ADD_COMMENT_API}`:
      return {...state, isApiInProgress: false, isApiDone: false};
    default:
      return state;
  }
};

export const addReportConversation = (state: IAuthStateType | undefined, action: IReviewPayload): IAuthStateType => {
  if (typeof state === 'undefined') {
    return AUTH_INITIAL_STATE;
  }
  switch (action.type) {
    case `${SUCCESS}${REPORT_CONVERSATION_API}`:
      return {...state, payload: action.payload, isApiInProgress: false, isApiDone: true};
    case `${PENDING}${REPORT_CONVERSATION_API}`:
      return {...state, isApiInProgress: true, isApiDone: false};
    case `${FAILURE}${REPORT_CONVERSATION_API}`:
      return {...state, isApiInProgress: false, isApiDone: false};
    default:
      return state;
  }
};
