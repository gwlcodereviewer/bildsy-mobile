import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

const myGlobal: any = global;

class LocalNotificationService {
  configure = (onOpenNotification: any) => {
    PushNotification.configure({
      onNotification: (notification: any) => {
        console.log('[LocalNotificationService] onNotification:', notification);
        // eslint-disable-next-line no-param-reassign
        notification.userInteraction = true;
        onOpenNotification(notification.data.item || notification);
        if (Platform.OS === 'ios') {
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      // IOS ONLY (optional): default: all — Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      /**
       * (optional) default: true
       * — Specified if permissions (ios) and token (android and ios) will requested or not,
       * — if not, you must call PushNotificationsHandler.requestPermissions() later
       * — if you are not using remote notification or do not have Firebase installed, use this:
       * requestPermissions: Platform.OS === ‘ios’
       */
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'not1111', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categories your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (id: any, title: string, message: string, data: any = {}, options: any = {}) => {
    if (
      myGlobal?.onMessageScreen &&
      data?.ProfessionalId &&
      myGlobal.PushQuickBloxUserId &&
      `${data?.ProfessionalId}` === `${myGlobal.PushQuickBloxUserId}`
    ) {
      return;
    }
    PushNotification.localNotification({
      /* Android Only Properties */
      ...this.buildAndroidNotification(id, title, message, data, options),
      /* iOS and Android properties */
      ...this.buildIOSNotification(id, title, message, data, options),
      /* iOS and Android properties */
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
    });
  };

  buildAndroidNotification = (id: any, title: string, message: string, data: any = {}, options: any = {}) => ({
    id,
    channelId: 'not1111',
    autoCancel: true,
    largeIcon: options.largeIcon || 'ic_launcher',
    smallIcon: options.smallIcon || 'small_icon',
    bigText: message || '',
    subText: title || '',
    vibrate: options.vibrate || true,
    vibration: options.vibration || 300,
    priority: options.priority || 'high',
    importance: options.importance || 'high', // (optional) set notification importance, default: high,
    data,
  });

  buildIOSNotification = (id: any, title: string, message: string, data: any = {}, options: any = {}) => ({
    alertAction: options.alertAction || 'view',
    category: options.category || '',
    userInfo: {
      id,
      item: data,
    },
  });

  cancelAllLocalNotifications = () => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  };

  removeDeliveredNotificationByID = (notificationId: any) => {
    PushNotification.cancelLocalNotifications({id: `${notificationId}`});
  };
}
export const localNotificationService = new LocalNotificationService();
