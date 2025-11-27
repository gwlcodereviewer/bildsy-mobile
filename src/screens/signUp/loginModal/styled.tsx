import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../../style/Dimen';

export const ModalMainContainer = styled.View`
  flex: 1;
  background-color: ${colors.blackGradient};
`;
export const ModalSubContainer = styled.View`
  width: 90%;
  border-radius: ${rpx(10)}px;
  background-color: ${colors.white};
  top: 35%;
  align-items: center;
  align-self: center;
`;
export const ModalHeaderContainer = styled.View`
  flex-direction: row;
  padding-top: ${rh(15)}px;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
`;
export const ModalHeaderText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(16)}px;
`;
export const ModalMessageContainer = styled.View`
  flex-direction: row;
  padding-top: ${rh(15)}px;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
`;
export const ModalMessage = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
`;
export const SubmitButtonContainer = styled.View`
  width: 100%;
  align-content: center;
  justify-content: center;
`;

export const DoubleButtonContainer = styled.View`
  width: 48%;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${colors.white};
  color: ${colors.black};
  border-radius: ${rpx(4)}px;
  height: ${rpx(44)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${rh(20)}px;
  border-color: ${colors.black};
  border-width: ${rpx(1)}px;
  margin-right: ${rw(15)}px;
`;

export const SecondaryText = styled.Text`
  color: ${colors.black};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
`;

export const InputFieldWrapper = styled.View`
  padding-top: ${rh(20)}px;
  margin-bottom: ${rh(5)}px;
  padding-horizontal: ${rw(15)}px;
  width: 100%;
`;
