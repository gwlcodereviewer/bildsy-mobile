import {Dispatch} from 'redux';
import NetInfo from '@react-native-community/netinfo';
import {FETCH_PREFIXES, CRUD_ACTION_TYPES} from './constants';
import {isAlertTimeDifference, isAPIAlertTimeDifference, messageAlert} from '../utils';
import {strings} from '../constants/strings';

const {PENDING, SUCCESS, FAILURE} = FETCH_PREFIXES;

const {GET} = CRUD_ACTION_TYPES;
interface Params {
  apiCall: Promise<any>;
  suffix: string;
  dataKey?: string;
  dataKeyForID?: string;
  CRUDAction?: string;
  sentValues?: string;
}

export const createCRUDActionCreator =
  ({apiCall, suffix, dataKey, dataKeyForID, CRUDAction = GET, sentValues}: Params) =>
  async (dispatch: Dispatch): Promise<any> => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      dispatch({
        type: `${PENDING}${suffix}`,
        dataKey,
        CRUDAction,
      });

      return apiCall
        .then(response => {
          const payload = response?.data;
          if ((response?.status === 200 || response?.status === 201) && response.data.Success) {
            dispatch({
              type: `${SUCCESS}${suffix}`,
              dataKey,
              dataKeyForID,
              payload,
              CRUDAction,
              sentValues,
            });
          } else {
            const errorMessage = payload?.Message || payload?.Error;
            if (errorMessage && state.isConnected) {
              if (!global.apiTimeStamp) global.apiTimeStamp = 0;
              messageAlert(errorMessage, isAPIAlertTimeDifference());
            }

            dispatch({
              type: `${FAILURE}${suffix}`,
              dataKey,
              CRUDAction,
            });
          }
          return payload;
        })
        .catch((error: any) => {
          const err = error;
          if (state.isConnected) {
            if (!global.apiTimeStamp) global.apiTimeStamp = 0;
            messageAlert(err.message, isAPIAlertTimeDifference());
          }
          dispatch({
            type: `${FAILURE}${suffix}`,
            payload: err,
          });
          throw err;
        });
    }
    // show no internet connection toast
    if (!state.isConnected) {
      messageAlert(strings.pleaseCheckInternetSettings, isAPIAlertTimeDifference());
    }
    return false;
  };

export const createCRUDActionCreatorForAds =
  ({apiCall, suffix, dataKey, dataKeyForID, CRUDAction = GET, sentValues}: Params) =>
  async (dispatch: Dispatch): Promise<any> => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      dispatch({
        type: `${PENDING}${suffix}`,
        dataKey,
        CRUDAction,
      });

      return apiCall
        .then(response => {
          const payload = response?.data;
          if ((response?.status === 200 || response?.status === 201) && response.data.Success) {
            dispatch({
              type: `${SUCCESS}${suffix}`,
              dataKey,
              dataKeyForID,
              payload,
              CRUDAction,
              sentValues,
            });
          } else {
            dispatch({
              type: `${FAILURE}${suffix}`,
              dataKey,
              CRUDAction,
            });
          }
          return payload;
        })
        .catch((error: any) => {
          const err = error;
          if (state.isConnected) {
            messageAlert(err.message, isAPIAlertTimeDifference());
          }
          dispatch({
            type: `${FAILURE}${suffix}`,
            payload: err,
          });
          throw err;
        });
    }
    // show no internet connection toast
    if (!state.isConnected) {
      messageAlert(strings.pleaseCheckInternetSettings, isAlertTimeDifference());
    }
    return false;
  };
