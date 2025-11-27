/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/no-unresolved
import * as Sentry from '@sentry/react-native';
import QB from 'quickblox-react-native-sdk';
import {StyleSheet, SafeAreaView, StatusBar, PermissionsAndroid, Platform, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-notifications';
import NetInfo from '@react-native-community/netinfo';
import {decode, encode} from 'base-64';
import {SENTRY_DSN} from './constants/server';
import MainStackNavigator from './navigation/mainStackNavigation';
import reduxStore from './redux/reduxStore';
import colors from './style/colors';
import {rw} from './style/Dimen';
import {isIOS} from './utils';
import {fcmService} from './push-notification/FCMService';
import {ToastContainer, ToastTitle, ToastMessage, ToastCrossTouch, TitleContainer} from './style/toast';
import Close from './assets/svg/Close';
import {initSdkChat} from './screens/chat/QBUtils';
import configData from './configs';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const myGlobal: any = global;
/**
 * Sentry setup
 */
if (configData.isProduction) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}
const App = () => {
  const [internetStatus, setInternetStatus] = useState<any>(false);
  const onRegister = (token: any) => {
    myGlobal.deviceToken = token;
  };

  useEffect(() => {
    initSdkChat();
    SplashScreen.hide();
    checkPermission();
    checkInternet();
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister);
    return () => {
      fcmService.unRegister();
    };
  }, []);
  const checkPermission = async () => {
    if (!isIOS()) {
      try {
        const results = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);

        if (
          results[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === 'granted' ||
          results[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted'
        ) {
          myGlobal.mediaPermission = true;
          console.log('granted');
        } else {
          myGlobal.mediaPermission = false;
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      myGlobal.mediaPermission = true;
    }
  };
  const OfflineBanner = () => (
    <View style={styles.widthFull}>
      {internetStatus && <Text style={styles.bannerSet}>Reconnecting to internet...</Text>}
    </View>
  );

  const checkInternet = () => {
    NetInfo.fetch().then(() => {
      NetInfo.addEventListener(state => {
        if (state.isInternetReachable) {
          setInternetStatus(false);
        } else {
          setInternetStatus(true);
        }
      });
    });
  };

  const MyStatusBar = ({backgroundColor, barStyle}: {backgroundColor: string; barStyle: any}) => (
    <SafeAreaView style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} barStyle={barStyle} />
      </SafeAreaView>
    </SafeAreaView>
  );
  /**
   * Function for UI Toast message.
   * @param param0 toast fro toast and color for color.
   */
  const RenderCustomToast = ({toast, color}: {toast: any; color: string}) => (
    <ToastContainer borderLeftColor={color}>
      <TitleContainer>
        <ToastTitle>{toast.data?.title}</ToastTitle>
        <ToastMessage>{toast.message}</ToastMessage>
      </TitleContainer>
      <ToastCrossTouch onPress={() => toast.onHide()}>
        <Close />
      </ToastCrossTouch>
    </ToastContainer>
  );
  return (
    <Provider store={reduxStore}>
      <MyStatusBar backgroundColor={colors.primaryThemeColor} barStyle="light-content" />
      <MainStackNavigator />
      <OfflineBanner />
      <Toast
        offsetBottom={40}
        renderType={{
          success: toast => <RenderCustomToast toast={toast} color={colors.successToast} />,
          information: toast => <RenderCustomToast toast={toast} color={colors.infoToast} />,
          error: toast => <RenderCustomToast toast={toast} color={colors.errorToast} />,
        }}
        // eslint-disable-next-line no-return-assign
        ref={ref => (global.toast = ref)}
      />
    </Provider>
  );
};
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  toastContentContainerStyle: {
    paddingHorizontal: rw(15),
  },
  toastBorderLeftColor: {
    borderLeftColor: colors.tangoOrange,
  },
  toastMessage: {
    fontSize: 12,
    fontWeight: '400',
  },
  bannerSet: {
    textAlign: 'center',
    backgroundColor: 'red',
    color: 'white',
  },
  widthFull: {
    width: '100%',
  },
});

export default App;
