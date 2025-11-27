import {ImageSourcePropType} from 'react-native';

export type ILabel = {
  color?: string;
};
export type IInput = {
  isRightIcon?: boolean;
  isValid?: boolean;
  color?: string;
  bgColor?: string;
};

export interface INavigation {
  [x: string]: any;
  reset: (arg0: {index: number; routes: {name: string; params?: any}[]}) => void;
  getParam: (param1: any, param2: any) => any;
  goBack: () => void;
  dispatch: (param: any) => void;
  push?: (param1: any, param2: any) => void;
  addListener: (a: string, b: () => void) => any;
  navigate: (param1: string, param2?: any) => void;
  setOptions: (param: any) => void;
  route: (key: string, name: string, params: any) => void;
  state: any;
}

export interface ICountryStateResponse {
  id: number;
  name?: string;
}

export interface IDashboardFeatureArticles {
  createdByValue: string;
  createdByName: string;
  ImageUrl: ImageSourcePropType;
  CustomerAvatar: ImageSourcePropType;
  Title: string;
}
export type IHorizontalMargin = {
  marginLeft?: number;
  marginRight?: number;
};

export type IVerticalMargin = {
  marginTop?: number;
  marginBottom?: number;
};
export type IFontSize = {
  fontSize?: number;
  lineHeight?: number;
};
export type BidType = {
  color?: string;
};
export type StatusType = {
  statusColor?: string;
};

export type IInputToolbarView = {
  position?: string;
  bottom?: number;
};

export interface IBackGroundColor {
  color: string;
}
