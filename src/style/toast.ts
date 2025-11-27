import styled from 'styled-components/native';
import {rh, rpx, rw, FontsWeight} from './Dimen';
import colors from './colors';

type IToastContainer = {
  borderLeftColor: string;
};

export const ToastContainer = styled.View<IToastContainer>`
  flex-direction: row;
  width: 90%;
  padding-horizontal: ${rpx(15)}px;
  padding-vertical: ${rpx(10)}px;
  background-color: #fff;
  margin-vertical: ${rpx(4)}px;
  border-radius: ${rpx(8)}px;
  border-left-color: ${props => props.borderLeftColor};
  border-left-width: ${rpx(6)}px;
`;

export const ToastTitle = styled.Text`
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  font-weight: ${FontsWeight.BOLD};
  margin-bottom: ${rh(2)}px;
`;

export const ToastMessage = styled.Text`
  font-size: ${rpx(12)}px;
  color: #979797;
  margin-top: ${rh(2)}px;
  margin-right: ${rw(16)}px;
`;

export const ToastCrossTouch = styled.TouchableOpacity`
  width: ${rpx(20)}px;
  height: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row-reverse;
`;

export const TitleContainer = styled.View`
  width: 95%;
`;
