import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ModalMainContainer = styled.View`
  flex: 1;
  background-color: rgba(3, 3, 3, 0.6);
`;
export const ModalSubContainer = styled.View`
  width: 90%;
  border-radius: ${rpx(10)}px;
  background-color: ${colors.white};
  align-items: center;
  align-self: center;
  padding: ${rw(10)}px;
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
export const RowContainer = styled.View`
  width: 100%;
  align-content: center;
  flex-direction: row;
  margin-top: ${rpx(10)}px;
`;
export const PopupImage = styled.Image`
  width: ${rw(18)}px;
  height: ${rw(18)}px;
`;
export const PopupText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  padding-left: ${rw(8)}px;
`;
export const CloseContainer = styled.TouchableOpacity`
  border-radius: ${rpx(14)}px;
  background-color: ${colors.lightGreen};
  width: ${rpx(28)}px;
  height: ${rw(28)}px;
  padding: ${rw(8)}px;
  position: absolute;
  right: -10px;
  top: -10px;
`;
