import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configs from '../configs';
import reduxStore from '../redux/reduxStore';

import {ASYNC_CONST, REQUEST_METHODS} from './constants';

const {POST, GET, PUT, PATCH, DELETE} = REQUEST_METHODS;

const getToken = async () => {
  const token = await AsyncStorage.getItem(ASYNC_CONST.accessToken);
  return token || '';
};
const api = async (url: string, {fullUrl = '', method = 'GET', params = {}, headers = {}}): Promise<any> => {
  const axiosUrl = fullUrl || configs.DEV_DOMAIN + url;
  const axiosMethod: any = method.toUpperCase();
  const accessToken = await getToken();
  const token =
    reduxStore.getState().auth && reduxStore.getState().auth.payload.token
      ? reduxStore.getState().auth.payload.token
      : accessToken;

  const authHeader = {Authorization: `Bearer ${token}`};
  const axiosHeader = {...configs.defaultHeaders, ...headers, ...authHeader};
  const axiosRef = axios.create({
    method: axiosMethod,
    url: axiosUrl,
    data: params,
    headers: axiosHeader,
  });
  let apiCall: Promise<any>;
  switch (axiosMethod) {
    case POST:
      apiCall = axiosRef.post(axiosUrl, params);
      break;

    case GET:
      apiCall = axiosRef.get(axiosUrl, params);
      break;

    case PUT:
      apiCall = axiosRef.put(axiosUrl, params);
      break;

    case PATCH:
      apiCall = axiosRef.patch(axiosUrl, params);
      break;

    case DELETE:
      apiCall = axiosRef.delete(axiosUrl, {data: params});
      break;

    default:
      apiCall = axiosRef.get(axiosUrl, params);
      break;
  }

  return new Promise((resolve, reject) => apiCall.then(response => resolve(response)).catch(error => reject(error)));
};

export default api;
