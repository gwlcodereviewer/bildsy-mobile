// @flow

// get responsive dimensions related to a default iPhone X dimensions
// in order to adjust between mobile and tablet
// inspired by https://github.com/marudy/react-native-responsive-screen

import {Dimensions, PixelRatio} from 'react-native';

// default reference dimensions (iPad)
export const iPadRefDimensions = {
  width: 810,
  height: 1080,
};

// default dimensions (iPhone X)
// all calculations are done based on the initial design dimensions
// which is based on iPhone X
export const defaultDimensions = {
  width: 375,
  height: 812,
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const widthRatio = screenWidth / defaultDimensions.width;
const heightRatio = screenHeight / defaultDimensions.height;
const meanRatio = (widthRatio + heightRatio) / 2;

// This is used to make the scale factor smaller (avoid having very big text on
// tablets and very small text on smaller phones)
const scaleDiff = 0.3;

// ResponsiveWidth: this can be used for properties like:
// width, padding-left, padding-right, padding-horizontal, margin-left, etc.
export const rw = (pixels: number) => PixelRatio.roundToNearestPixel(pixels * widthRatio);

// ResponsiveHeight: this can be used for properties like:
// height, padding-top, padding-bottom, padding-vertical, margin-top, etc.
export const rh = (pixels: number) => PixelRatio.roundToNearestPixel(pixels * heightRatio);

// ResponsivePX: This is used when we need constrains on both width and height.
// It can be used for properties like:
// font-size, border-radius
export const rpx = (pixels: number) => {
  const scale = (meanRatio - 1) * scaleDiff + 1;
  return PixelRatio.roundToNearestPixel(pixels * scale);
};

// desc: set font weight bold
export const FontsWeight = {
  BOLD: 'bold',
};

// desc: define all font family used in project
export const FontFamily = {
  oxygenBold: 'Oxygen-Bold',
  oxygenRegular: 'Oxygen-Regular',
  sourceSansProRegular: 'SourceSansPro-Regular',
  sourceSansProSemiBold: 'SourceSansPro-SemiBold',
};

// desc: enum define for keyboard type
export enum keyboardType {
  defaultKeyboard = 'default',
  numeric = 'numeric',
  email = 'email-address',
}

export const asterisk = '*';
export const defaultCountryCode = '+1';
export const maxPhoneNumberDigit = 10;
