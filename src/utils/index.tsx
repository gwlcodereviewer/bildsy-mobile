import {Platform, PermissionsAndroid, Text, Linking, Alert} from 'react-native';
import {AccessToken, GraphRequest, GraphRequestManager, LoginManager, Settings} from 'react-native-fbsdk-next';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {launchCamera, launchImageLibrary, MediaType, PhotoQuality} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ProgressCircle from 'react-native-progress-circle';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '../constants/strings';
import {localStrings} from '../localization/localStrings';
import colors from '../style/colors';
import {FbUserDataType, INavigation} from '../types';
import {NAV_DASHBOARD_SCREEN} from '../navigation/navConstants';
import {fcmService} from '../push-notification/FCMService';
import {ASYNC_CONST, ASYNC_CONST_QB} from '../helpers/constants';
import {
  ALPHABET_CASE_REGEX,
  LOWER_CASE_REGEX,
  MINIMUM_EIGHT_CHARACTER_REGEX,
  NUMBER_CASE_REGEX,
  PHONE_NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPER_CASE_REGEX,
  VALID_SPACE_CHECK_REGEX,
  VALID_EMAIL_CHECK_REGEX,
  VALID_PASSWORD_REGEX,
  VALID_PASSWORD_WITHOUT_SPECIAL_CHARACTER_REGEX,
  TEXT_CHECK_REGEX,
  CHECK_PHONE_PATTERN_REGEX,
  CHECK_PHONE_REGEX,
  CHECK_NUMBER_REGEX,
  VALID_PHONE_REGEX,
} from '../constants/utils/constantData';
import {disConnectQB, logoutQB, removeSubscription} from '../screens/chat/QBUtils';
import reduxStore from '../redux/reduxStore';
import {isProduction} from '../configs';

const photoMediaType: MediaType = 'photo';
const mixedMediaType: MediaType = 'mixed';
const myGlobal: any = global;

export function isIOS() {
  return Platform.OS === 'ios';
}
/**
 * to validating the email address
 * @param {String} email
 * @returns {Boolean}
 */
export function isValidEmail(email: string): boolean {
  const regex = VALID_EMAIL_CHECK_REGEX;
  return !regex.test(String(email).toLowerCase());
}

export function isValidBudget(value: string): boolean {
  // eslint-disable-next-line no-useless-escape
  return VALID_SPACE_CHECK_REGEX.test(String(value[0]));
}

export function isValidPassword(password: string): boolean {
  const strongRegex = new RegExp(VALID_PASSWORD_REGEX);

  return !strongRegex.test(password);
}

export function isValidPasswordWithOutSpecialChar(password: string): boolean {
  const loseRegex = new RegExp(VALID_PASSWORD_WITHOUT_SPECIAL_CHARACTER_REGEX);
  return !loseRegex.test(password);
}

export function checkValidPasswordWithOutSpecialChar(password: string) {
  let errorMsg = '';
  if (isValidPasswordWithOutSpecialChar(password)) {
    errorMsg = localStrings.invalidPassword;
  }
  return errorMsg;
}

export function checkValidPassword(password: string) {
  let errorMsg = '';
  if (isValidPassword(password)) {
    errorMsg = localStrings.invalidPassword;
  } else {
    errorMsg = '';
  }
  return errorMsg;
}

export function equalPasswordAndConfirm(password: string, confirmPassword: string) {
  let errorMsg = '';
  if (password !== '' && confirmPassword !== '') {
    if (confirmPassword !== password) {
      errorMsg = localStrings.passwordsAreNotMatching;
    }
  }
  return errorMsg;
}

export function equalPasswordAndConfirmSetPassword(password: string, confirmPassword: string) {
  let errorMsg = '';
  if (password !== '' && confirmPassword !== '') {
    if (confirmPassword !== password) {
      errorMsg = localStrings.newPasswordAreNotMatchingInSetPassword;
    }
  }
  return errorMsg;
}

export function equalNewPasswordAndConfirm(password: string, confirmPassword: string) {
  let errorMsg = '';
  if (password !== '' && confirmPassword !== '') {
    if (confirmPassword !== password) {
      errorMsg = localStrings.newPasswordsAreNotMatching;
    }
  }
  return errorMsg;
}

/**
 * function for removing extra space
 */
export const extraSpaceRemove = (text: string) => {
  let newText = '';
  if (text) {
    newText = text.trim().split(/ +/).join(' ');
  }
  return newText;
};

/**
 * desc: confirm password validation regex
 */
export const VALIDATION_REGEX = {
  minimumEightCase: MINIMUM_EIGHT_CHARACTER_REGEX,
  numberCase: NUMBER_CASE_REGEX,
  upperCase: UPPER_CASE_REGEX,
  lowerCase: LOWER_CASE_REGEX,
  specialCase: SPECIAL_CHARACTER_REGEX,
  alphabetRegex: ALPHABET_CASE_REGEX,
  spaceCheckInStarting: VALID_SPACE_CHECK_REGEX,
  textCheck: TEXT_CHECK_REGEX,
  phonePattern: CHECK_PHONE_PATTERN_REGEX,
  checkPhone: CHECK_PHONE_REGEX,
  phoneNumber: PHONE_NUMBER_REGEX,
  checkNumber: CHECK_NUMBER_REGEX,
  validPhone: VALID_PHONE_REGEX,
};
export const isEmailOrPhoneValid = (inputValue: string) => {
  const isEmpty = inputValue === '';
  let errorMsg = '';
  if (isEmpty) {
    errorMsg = localStrings.emailIsRequired;
  } else if (isValidEmail(inputValue)) {
    errorMsg = localStrings.invalidEmail;
  }
  return errorMsg;
};

export const isValidBudgetValue = (inputValue: string) => {
  const isEmpty = inputValue === '';
  let errorMsg = '';
  if (isEmpty) {
    errorMsg = localStrings.emailIsRequired;
  } else if (isValidBudget(inputValue)) {
    errorMsg = localStrings.invalidEmail;
  }
  return errorMsg;
};

export const isEmailValidator = (inputValue: string) => {
  let errorMsg = '';
  if (!isValidEmail(inputValue)) {
    errorMsg = strings.enterValidEmail;
  }
  return errorMsg;
};
export const isValidPhoneNumber = (phoneNumber: string): boolean => VALID_PHONE_REGEX.test(String(phoneNumber));

/**
 * desc: call method to show messages in toast
 * @param {String} title
 * @param {String} description
 * @param {String} toastType
 * @param {String} placement
 */
export const showToastMessage = (
  title = strings.noInternet,
  description = strings.pleaseCheckInternetSettings,
  toastType = strings.error,
) => {
  global?.toast?.show(description, {
    data: {
      title:
        // eslint-disable-next-line no-nested-ternary
        title === strings.error ? strings.error2 : title === strings.success ? strings.success2 : strings.information2,
    },
    type: title || strings.error,
    duration: 3000,
  });
};
/**
 * Facebook Sign In
 */
export const loginWithFacebook = () => {
  let accessToken: string | undefined;
  let userData: FbUserDataType;
  let errorData: unknown;
  Settings.setAppID(isProduction ? '708587387217595' : '674629277773098');
  Settings.initializeSDK();
  if (Platform.OS === 'android') {
    LoginManager?.setLoginBehavior('web_only');
  }
  return LoginManager?.logInWithPermissions(['email', 'public_profile'])?.then(
    (login: {isCancelled: boolean}) => {
      if (login.isCancelled) {
        /* TO check FB response */
        console.log('is fb login canceled?', login.isCancelled);
      } else {
        return new Promise((resolve, reject) => {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              accessToken = data?.accessToken.toString();
              if (accessToken) {
                const PROFILE_REQUEST_PARAMS = {
                  fields: {
                    string: 'id,name,first_name,last_name,email,picture,middle_name',
                  },
                };
                const profileRequest = new GraphRequest(
                  '/me',
                  {accessToken, parameters: PROFILE_REQUEST_PARAMS},
                  (error: any, user: any) => {
                    if (error) {
                      errorData = error;
                    } else {
                      userData = user;
                      const fbData = {
                        accessToken,
                        userData,
                        errorData,
                      };
                      resolve(fbData);
                    }
                  },
                );
                new GraphRequestManager().addRequest(profileRequest).start();
              }
            })
            .catch((Error: any) => reject(Error));
        });
      }
      return false;
    },
    (error: any) => {
      /* TO check FB error */
      console.log('error ', JSON.stringify(error));
    },
  );
};

export const loginWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId: '',
    iosClientId: '387937102554-cali5bi0ugfv7lr56e4m8b0as2to5605.apps.googleusercontent.com',
  });
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const accessToken = await GoogleSignin.signInSilently();
    return accessToken;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      /* To check FB error */
      console.log('sign in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      showToastMessage('', localStrings.alreadyInProgress);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      showToastMessage('', localStrings.googlePlayService);
    } else {
      showToastMessage('', localStrings.somethingWentWrong);
    }
    return error;
  }
};

/**
 * Apple SigIn
 */
export const loginWithApple = async () => {
  const appleSupported = appleAuth.isSupported;
  if (appleSupported) {
    return new Promise((resolve, reject) => {
      const appleAuthRequestResponse = appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })
        .then(data => {
          if (data) {
            resolve(data);
          }
        })
        .catch((error: any) => {
          if (error.code === '1001') {
            /* To check apple signin error */
            console.log('apple sign in canceled');
          } else if (error.code === '1000' || error.code === '1002') {
            showToastMessage(strings.error, localStrings.somethingWentWrong);
          } else {
            reject(error);
          }
        });
    });
  }
  return false;
};

/**
 * Document picker from file
 */
export const pickDocument = async (multipleDoc: any, selectMultiple: boolean) => {
  try {
    let result: any = [];
    if (selectMultiple === true) {
      result = await DocumentPicker.pickMultiple({
        allowMultiSelection: true,
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.csv,
          DocumentPicker.types.doc,
          DocumentPicker.types.images,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.zip,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.plainText,
        ],
      });
    } else {
      result = await DocumentPicker.pick({
        allowMultiSelection: false,
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.csv,
          DocumentPicker.types.doc,
          DocumentPicker.types.images,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.zip,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.plainText,
        ],
      });
    }

    for (let i = 0; i < result.length; ) {
      let realPath = result[i].fileCopyUri || result[i].uri;
      if (Platform.OS === 'ios') {
        if (result[i].fileCopyUri) {
          const split = result[i].fileCopyUri.split('/');
          const name = split.pop();
          const inbox = split.pop();
          realPath = `file://${RNFS.TemporaryDirectoryPath}/${inbox}/${decodeURI(name)}`;
        }
      }
      // eslint-disable-next-line no-await-in-loop
      await RNFS.readFile(realPath, 'base64')
        .then(content => {
          const fileData = {
            fileBase64Path: content,
            fileName: result[i].name,
            fileType: result[i].type,
            name: result[i].name,
            type: result[i].type,
            contentType: result[i].contentType,
            size: result[i].size,
            uri: result[i].uri,
          };
          multipleDoc.push(fileData);
        })
        .catch(error => {
          showToastMessage(strings.error, error.message);
        });
      i += 1;
    }
    return multipleDoc;
  } catch (err: any) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
    return err;
  }
};
export const pickDocumentPath = async (multipleDoc: any, selectMultiple: boolean) => {
  try {
    let result: any = [];
    if (selectMultiple === true) {
      result = await DocumentPicker.pickMultiple({
        allowMultiSelection: true,
      });
    } else {
      result = await DocumentPicker.pick({
        allowMultiSelection: false,
      });
    }
    for (let i = 0; i < result.length; ) {
      // eslint-disable-next-line no-await-in-loop
      await RNFS.readFile(result[i].fileCopyUri, 'base64')
        .then(content => {
          const fileData = {
            fileBase64Path: content,
            fileName: result[i].name,
            fileType: result[i].type,
            name: result[i].name,
            type: result[i].type,
            contentType: result[i].contentType,
            size: result[i].size,
            uri: result[i].uri,
          };
          multipleDoc.push(fileData);
        })
        .catch(error => {
          showToastMessage(strings.error, error.message);
        });
      i += 1;
    }
    return multipleDoc;
  } catch (err: any) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
    return err;
  }
};

/**
 * function for getting image from camera
 * @param multipleDoc array
 */
export const openDeviceCamera = async (multipleDoc: any) => {
  const allResponse: any[] = [];

  return new Promise((resolve, reject) => {
    const options = {
      isVertical: true,
      mediaType: isIOS() ? photoMediaType : mixedMediaType,
    };
    return launchCamera(options, async (response: any) => {
      if (response.didCancel === true) {
        reject(reject);
      } else if (myGlobal.mediaPermission) {
        allResponse.push(response.assets[0]);
        RNFS.readFile(allResponse[0].uri, 'base64')
          .then(content => {
            const fileData = {
              fileBase64Path: content,
              fileName: allResponse[0].fileName,
              fileType: allResponse[0].type,
              fileUri: allResponse[0].uri,
              FilePath: allResponse[0].uri,
            };
            multipleDoc.push(fileData);
            resolve(multipleDoc);
          })
          .catch(() => {
            reject(reject);
          });
      } else if (!isIOS() && !myGlobal.mediaPermission) {
        try {
          const results = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.CAMERA,
          ]);
          if (
            results[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === 'granted' &&
            results[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted'
          ) {
            myGlobal.mediaPermission = true;
            allResponse.push(response.assets[0]);
            RNFS.readFile(allResponse[0].uri, 'base64')
              .then(content => {
                const fileData = {
                  fileBase64Path: content,
                  fileName: allResponse[0].fileName,
                  fileType: allResponse[0].type,
                  fileUri: allResponse[0].uri,
                  FilePath: allResponse[0].uri,
                };
                multipleDoc.push(fileData);
                resolve(multipleDoc);
              })
              .catch(() => {
                reject(reject);
              });
          } else {
            myGlobal.mediaPermission = false;
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        myGlobal.mediaPermission = true;
      }
    });
  });
};

/**
 * function for getting image from camera
 * @param multipleDoc array
 */
export const openDeviceCameraPath = async (multipleDoc: any) => {
  const allResponse: any[] = [];

  return new Promise((resolve, reject) => {
    const quality: PhotoQuality = 0.5;
    const options = {
      isVertical: true,
      maxHeight: 500,
      maxWidth: 300,
      mediaType: isIOS() ? photoMediaType : mixedMediaType,
      quality,
    };
    return launchCamera(options, (response: any) => {
      const fileData = response.assets[0];

      fileData.fileName = response?.assets[0]?.fileName;
      fileData.fileType = response?.assets[0]?.type;
      fileData.fileUri = response?.assets[0]?.uri;
      fileData.name = response?.assets[0]?.fileName;
      fileData.size = response?.assets[0]?.fileSize;
      fileData.FilePath = response?.assets[0]?.uri;
      allResponse.push(fileData);
      resolve(allResponse);
    });
  });
};
/**
 * Function for opening gallery
 */
export const onImageLibraryPress = () =>
  new Promise((resolve, reject) => {
    const options = {
      selectionLimit: 1,
      mediaType: photoMediaType,
      includeBase64: false,
    };
    return launchImageLibrary(options, (response: any) => {
      if (response?.didCancel) {
        /* Cancel clicked */
      } else {
        RNFS.readFile(response?.assets[0]?.uri, 'base64')
          .then(content => {
            const fileData = {
              fileBase64Path: content,
              fileName: response?.assets[0]?.fileName,
              fileType: response?.assets[0]?.type,
              fileUri: response?.assets[0]?.uri,
              FilePath: response?.assets[0]?.uri,
            };
            resolve(fileData);
          })
          .catch(() => {
            reject(reject);
          });
      }
    });
  });

export const bidStatusArray: any = {
  10: {color: colors.lightGreen, statusColor: colors.darkGreen, statusValue: 'Bid Placed'},
  20: {color: colors.lightPink, statusColor: colors.redPink, statusValue: 'Bid Rejected'},
  30: {color: colors.lightGreen, statusColor: colors.darkGreen, statusValue: 'Project Awarded'},
  40: {color: colors.lightOrange, statusColor: colors.darkOrange, statusValue: 'Bid Pending'},
  50: {color: colors.lightPink, statusColor: colors.redPink, statusValue: 'Bid Declined'},
  60: {color: colors.lightGreen, statusColor: colors.darkGreen, statusValue: 'Completed'},
  80: {color: colors.lightPink, statusColor: colors.redArchive, statusValue: 'Bid Lost'},
};

const downloadAttachment = (FilePath: string, FileName: string, callback: any, progressCallBack: any) => {
  const {fs} = RNFetchBlob;
  const PictureDir = fs.dirs.DownloadDir;
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path: `${PictureDir}/Attachment_${FileName}`,
      description: 'Download',
    },
  };
  RNFetchBlob.config(options)
    .fetch('GET', FilePath)
    .progress((received, total) => {
      progressCallBack(received / total);
    })

    .then(() => {
      showToastMessage(strings.success, `${localStrings.downloaded_message}`, strings.success);
      callback();
    });
};
export const attachmentDownload = (FilePath: string, FileName: string, callback: any, progressCallBack: any) => {
  // Function to check the platform
  // If iOS the start downloading
  // If Android then ask for runtime permission
  if (Platform.OS === 'ios') {
    downloadAttachment(
      FilePath,
      FileName,
      (res: any) => {
        callback(res);
      },
      (percent: number) => {
        progressCallBack(percent);
      },
    );
  } else {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadAttachment(
            FilePath,
            FileName,
            (res: any) => {
              callback(res);
            },
            (percent: number) => {
              progressCallBack(percent);
            },
          );
        } else {
          // If permission denied then show alert 'Storage Permission
        }
      });
    } catch (err) {
      console.log('error', err);
    }
  }
};
export const ProgressCircleView = (percentage: number) => (
  <ProgressCircle
    percent={percentage || 0}
    radius={15}
    borderWidth={3}
    color="#3399FF"
    shadowColor="#999"
    bgColor="#fff">
    <Text style={{fontSize: 7}}>{`${parseInt(`${percentage || 1}`, 10)}%`}</Text>
  </ProgressCircle>
);
/**
 * function for opening dialer.
 * @param mobileNumber contain contact number
 */
export const makeCall = (mobileNumber: string) => {
  let PhoneNumber = '';
  let theNumber = '';
  theNumber = mobileNumber?.replace(PHONE_NUMBER_REGEX, '');
  if (Platform.OS === 'android') {
    PhoneNumber = `tel:${theNumber}`;
  } else {
    PhoneNumber = `telprompt:${theNumber}`;
  }
  Linking.openURL(PhoneNumber);
};

/**
 * Function for opening gallery
 */
export const onSelectGalleyPress = (multipleDoc: any, selectMultiple: boolean) =>
  new Promise((resolve, reject) => {
    const options = {
      mediaType: photoMediaType,
      includeBase64: true,
      selectionLimit: selectMultiple ? 10 : 1,
    };
    return launchImageLibrary(options, async (response: any) => {
      if (response?.didCancel) {
        console.log('Canceled');
      } else {
        try {
          for (let i = 0; i < response?.assets.length; ) {
            // eslint-disable-next-line no-await-in-loop
            const fileData = {
              fileBase64Path: response?.assets[i].base64,
              fileName: response?.assets[i].fileName,
              fileType: response?.assets[i].type,
              name: response?.assets[i].fileName,
              type: response?.assets[i].type,
              contentType: response?.assets[i].type,
              size: response?.assets[i].fileSize,
              uri: response?.assets[i].uri,
            };
            multipleDoc.push(fileData);
            i += 1;
          }
          resolve(multipleDoc);
        } catch (err) {
          reject(err);
        }
      }
    });
  });

export const checkProjectDeleted = (isProjectDeleted: boolean, navigation?: INavigation) => {
  if (isProjectDeleted) {
    if (navigation) navigation.navigate(NAV_DASHBOARD_SCREEN);
    showToastMessage(strings.error, localStrings.screenNotFound);
  }
};
export const messageAlert = (errorMessage: string, isShowAlert: boolean) => {
  // eslint-disable-next-line no-alert
  if (isShowAlert && errorMessage && !global.isAlreadyShowing && errorMessage !== strings.complaintNotFound) {
    global.isAlreadyShowing = true;
    if (errorMessage === localStrings.networkError) {
      // eslint-disable-next-line no-param-reassign
      errorMessage = strings.pleaseCheckInternetSettings;
    }
    Alert.alert(localStrings.alert, errorMessage, [
      {
        text: localStrings.OK,
        onPress: () => {
          global.isAlreadyShowing = false;
        },
      },
    ]);
  }
};

export const isAPIAlertTimeDifference = () => {
  if (!global.apiTimeStamp) global.apiTimeStamp = 0;
  return Date.now() - global.apiTimeStamp > 1000;
};

export const isAlertTimeDifference = () => {
  if (!global.timeStamp) global.timeStamp = 0;
  return Date.now() - global.timeStamp > 1000;
};

export const clearUserData = async (clearDataCallback: () => void) => {
  reduxStore.getState().auth = {
    isApiInProgress: false,
    isApiDone: false,
    isLogin: false,
    message: '',
    payload: {},
    status: '',
    isSignUp: false,
  };
  await fcmService.clearNotification();
  disConnectQB();
  logoutQB();
  AsyncStorage.getItem(ASYNC_CONST.quickbloxSubscription).then(response => {
    if (response && response != null && response !== 'null') {
      const responseString = response as string;
      const responseJson = JSON.parse(responseString);
      if (responseJson?.id) removeSubscription(responseJson.id);
    }
  });
  await AsyncStorage.removeItem(ASYNC_CONST.loggedInUserInfo);
  await AsyncStorage.removeItem(ASYNC_CONST.qbLogin);
  await AsyncStorage.removeItem(ASYNC_CONST.invitedUser);
  await AsyncStorage.removeItem(ASYNC_CONST_QB.loggedInUserInfoQb);
  await AsyncStorage.clear();
  await AsyncStorage.removeItem(ASYNC_CONST.accessToken);
  await AsyncStorage.clear()
    .then(() => {
      clearDataCallback();
    })
    .catch((error: any) => {
      console.log(error);
    });
};
export function getTimeZoneName(timeZone: any, timeZoneName: any) {
  const [, ...tz] = new Date()
    .toLocaleTimeString('en', {
      timeZone: timeZone || strings.defaultTimeZone,
      timeZoneName,
      hour12: false,
    })
    .split(' ');
  return tz.join(' ');
}
