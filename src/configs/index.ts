import * as RNLocalize from 'react-native-localize';
import {HOMEOWNER} from '../constants/utils/constantData';
import {getTimeZoneName, isIOS} from '../utils';

export const isProduction = false;

export const basePath = isProduction ? 'https://app.bildsy.com/' : 'https://dev.bildsy.com/';
const baseUrl = `${basePath}api/`;
const timeZone = RNLocalize.getTimeZone();

export default {
  DEV_DOMAIN: baseUrl,
  defaultHeaders: {
    'Content-Type': 'application/json',
    AppVersion: '1.0',
    DeviceType: isIOS() ? 'IOS' : 'Android',
    DeviceId: '',
    CustomerTimeZone: getTimeZoneName(timeZone, 'long'),
    UserType: HOMEOWNER,
  },
  isProduction,
};
