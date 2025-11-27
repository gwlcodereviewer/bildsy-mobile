import {Dispatch} from 'redux';
import {API_END_POINTS} from '../../constants/server';
import api from '../../helpers/api';
import {REQUEST_METHODS} from '../../helpers/constants';
import {createCRUDActionCreator} from '../../helpers/redux';
import {ADD_COMMENT_API, ADD_PRO_REVIEW_API, GET_PRO_REVIEW_API, REPORT_CONVERSATION_API} from '../constants';
import {IAddReviewPayload, ICommentConversation, ICommentRequest} from '../types';

export const callAddProReview = (param: IAddReviewPayload) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(API_END_POINTS.addProReview, {
      method: REQUEST_METHODS.POST,
      params: param,
    }),
    suffix: ADD_PRO_REVIEW_API,
  })(dispatch);

export const callGetProReview = (id: number) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(`${API_END_POINTS.getProReview}${id}`, {
      method: REQUEST_METHODS.GET,
    }),
    suffix: GET_PRO_REVIEW_API,
  })(dispatch);

export const callAddReviewComment = (param: ICommentRequest) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(API_END_POINTS.addReviewComment, {
      method: REQUEST_METHODS.POST,
      params: param,
    }),
    suffix: ADD_COMMENT_API,
  })(dispatch);

export const callReportConversation = (param: ICommentConversation) => (dispatch: Dispatch) =>
  createCRUDActionCreator({
    apiCall: api(API_END_POINTS.reportConversation, {
      method: REQUEST_METHODS.POST,
      params: param,
    }),
    suffix: REPORT_CONVERSATION_API,
  })(dispatch);
