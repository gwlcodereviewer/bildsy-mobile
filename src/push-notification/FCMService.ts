import messaging from '@react-native-firebase/messaging';
import {Platform, AppRegistry} from 'react-native';
import {localNotificationService} from './LocalNotificationService';
import App from '../App';
import {isIOS} from '../utils';

const myGlobal: any = global;

class FCMService {
  messageListener: any;

  register = (onRegister: any) => {
    this.checkPermission(onRegister);
  };

  fcmCallBack = (onNotification: any, onOpenNotification: any) => {
    // Register background handler
    if (isIOS()) {
      messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
        if (remoteMessage) {
          onNotification(remoteMessage);
        }
      });
    }
    AppRegistry.registerComponent('app', () => App);

    this.createNotificationListeners(onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().requestPermission();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister: any) => {
    messaging()
      .hasPermission()
      .then((enabled: any) => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister);
        } else {
          // User doesn’t have permission
          this.requestPermission(onRegister);
        }
      })
      .catch((error: any) => {
        console.log('[FCMService] Permission rejected ', error);
      });
  };

  getToken = (onRegister: any) => {
    if (isIOS()) {
      messaging()
        .getAPNSToken()
        .then((apnsToken: any) => {
          myGlobal.apnsToken = apnsToken;
        })
        .catch((error: any) => {
          console.log('[apnsToken] getToken rejected ', error);
        });
    }
    messaging()
      .getToken()
      .then((fcmToken: any) => {
        if (fcmToken) {
          console.log('[FCMService] Token:', fcmToken);
          onRegister(fcmToken);
        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch((error: any) => {
        console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = (onRegister: any) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error: any) => {
        console.log('[FCMService] Request Permission rejected', error);
      });
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    messaging()
      .deleteToken()
      .catch((error: any) => {
        console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (onNotification: any, onOpenNotification: any) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage) {
        const {data} = remoteMessage;
        onOpenNotification(data);
      }
    });
    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        console.log(
          '[FCMService] getInitialNotification Notification caused app to open from quit state:',
          remoteMessage,
        );
        if (remoteMessage) {
          const {data} = remoteMessage;
          onOpenNotification(data);
        }
      });
    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage: any) => {
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        onNotification(remoteMessage);
      }
    });
    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken: any) => {
      console.log('[FCMService] New token refresh: ', fcmToken);
    });
  };

  unRegister = () => {};

  clearNotification = () => {
    localNotificationService.cancelAllLocalNotifications();
  };
}
export const fcmService = new FCMService();
