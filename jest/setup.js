import {NativeModules, View, ScrollView} from 'react-native';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
NativeModules.RNGoogleSignin = {
  BUTTON_SIZE_ICON: 0,
  BUTTON_SIZE_STANDARD: 0,
  BUTTON_SIZE_WIDE: 0,
  BUTTON_COLOR_AUTO: 0,
  BUTTON_COLOR_LIGHT: 0,
  BUTTON_COLOR_DARK: 0,
  configure: jest.fn(),
  currentUserAsync: jest.fn(),
};
jest.mock('rn-fetch-blob', () => ({
  DocumentDir: () => {},
  fetch: () => {},
  base64: () => {},
  android: () => {},
  ios: () => {},
  config: () => ({
    fetch: () => ({
      progress: jest.fn().mockReturnValue(
        new Promise((resolve, reject) => {
          resolve('some string value');
        }),
      ),
    }),
  }),
  session: () => {},
  fs: {
    dirs: {
      MainBundleDir: () => {},
      CacheDir: () => {},
      DocumentDir: () => {},
    },
  },
  wrap: () => {},
  polyfill: () => {},
  JSONStream: () => {},
}));
const NOOP = () => {
  // do nothing
};
jest.mock('react-native-fs', () => ({
  mkdir: jest.fn(),
  moveFile: jest.fn(),
  copyFile: jest.fn(),
  pathForBundle: jest.fn(),
  pathForGroup: jest.fn(),
  getFSInfo: jest.fn(),
  getAllExternalFilesDirs: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
  stopDownload: jest.fn(),
  resumeDownload: jest.fn(),
  isResumable: jest.fn(),
  stopUpload: jest.fn(),
  completeHandlerIOS: jest.fn(),
  readDir: jest.fn(),
  readDirAssets: jest.fn(),
  existsAssets: jest.fn(),
  readdir: jest.fn(),
  setReadable: jest.fn(),
  stat: jest.fn(),
  readFile: jest.fn(),
  read: jest.fn(),
  readFileAssets: jest.fn(),
  hash: jest.fn(),
  copyFileAssets: jest.fn(),
  copyFileAssetsIOS: jest.fn(),
  copyAssetsVideoIOS: jest.fn(),
  writeFile: jest.fn(),
  appendFile: jest.fn(),
  write: jest.fn(),
  downloadFile: jest.fn(),
  uploadFiles: jest.fn(),
  touch: jest.fn(),
  MainBundlePath: jest.fn(),
  CachesDirectoryPath: jest.fn(),
  DocumentDirectoryPath: jest.fn(),
  ExternalDirectoryPath: jest.fn(),
  ExternalStorageDirectoryPath: jest.fn(),
  TemporaryDirectoryPath: jest.fn(),
  LibraryDirectoryPath: jest.fn(),
  PicturesDirectoryPath: jest.fn(),
  replace: jest.fn(),
}));
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('quickblox-react-native-sdk', () => {});
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn().mockReturnValue(0),
  useAnimatedStyle: jest.fn().mockReturnValue({}),
  useAnimatedScrollHandler: jest.fn().mockReturnValue({}),
  createAnimatedComponent: component => jest.fn().mockReturnValue(component),
  __reanimatedWorkletInit: jest.fn(),
  ScrollView: 'ScrollView',
}));
// eslint-disable-next-line no-underscore-dangle
global.__reanimatedWorkletInit = jest.fn();

const mockedModule = jest.mock('quickblox-react-native-sdk');
module.exports = mockedModule;
export default {
  setJSExceptionHandler: jest.fn(),
  getJSExceptionHandler: jest.fn(),
  setNativeExceptionHandler: jest.fn(),
};

jest.mock('react-native-localize', () => ({
  getTimeZone: jest.fn(),
}));
jest.useFakeTimers();
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: jest.fn().mockImplementation(({children}) => children),
}));
