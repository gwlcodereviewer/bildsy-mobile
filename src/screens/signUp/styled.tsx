import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../style/Dimen';
import {isIOS} from '../../utils';

const baseFontSize = rpx(16);
export const SignUpContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;
export const LogoContainer = styled.View`
  height: ${rh(44)}px;
  background-color: transparent;
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  margin-top: ${rh(24)}px;
  margin-bottom: ${rh(10)}px;
`;
export const LogoImage = styled.Image``;
export const MainBodyScroll = styled.ScrollView`
  flex: 1;
  width: 100%;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
`;
export const BottomContainer = styled.View`
  padding-horizontal: ${rw(24)}px;
  padding-vertical: ${rh(24)}px;
`;
export const BoldTitle = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(22)}px;
`;
export const FormContainer = styled.View`
  padding-vertical: ${rh(4)}px;
`;
export const InputFieldContainer = styled.View`
  margin-vertical: ${rh(5)}px;
`;
export const InputCheckFieldContainer = styled.View`
  margin-vertical: ${rh(5)}px;
`;
export const InputFieldContainerPressable = styled(Pressable)`
  margin-vertical: ${rh(5)}px;
  flex: 1;
`;
export const BlankInputView = styled.View``;
export const DropDownRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const DropDownSubContainer = styled.View`
  height: ${rh(50)}px;
  border-width: ${rw(1)}px;
  background-color: ${colors.white};
  border-color: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(10)}px;
`;
export const DropDownView = styled.View``;

export const SmallInputContainer = styled.View`
  background-color: ${colors.white};
  flex: 0.48;
  justify-content: space-between;
  margin-top: ${rh(10)}px;
`;
export const CheckBoxRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: ${isIOS() ? rw(0) : rw(-7)}px;
`;
export const TextContainer = styled.View`
  flex-direction: row;
  padding-horizontal: ${rw(10)}px;
`;
export const NormalText = styled.Text`
  color: ${colors.black};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${baseFontSize}px;
  font-weight: normal;
  margin-left: ${rw(4)}px;
`;
export const UnderlineText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${baseFontSize}px;
  font-weight: normal;
  text-decoration: underline;
  text-decoration-color: ${colors.tangoOrange};
  padding-horizontal: ${rw(4)}px;
`;

export const ModalDropDownContainer = styled.View`
  height: ${rh(50)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const TextCenterComponent = styled.View`
  margin-top: ${rh(10)}px;
  flex-direction: row;
  justify-content: center;
`;

export const ErrorMessage = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  line-height: ${rh(18)}px;
  color: ${colors.sunsetOrange};
`;
export const ErrorMessageView = styled.View`
  width: 48%;
`;
export const ErrorContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const SocialLoginContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${rh(20)}px;
`;
export const IconContainer = styled.View`
  margin-left: ${rw(20)}px;
`;
