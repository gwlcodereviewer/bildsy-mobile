import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const LoginContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;
export const LogoContainer = styled.View`
  height: ${rh(56)}px;
  background-color: transparent;
  padding-left: ${rpx(24)}px;
`;
export const LogoImage = styled.Image``;
export const BottomContainer = styled(Pressable)`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  padding-left: ${rpx(24)}px;
  padding-right: ${rpx(24)}px;
`;
export const WelcomeText = styled.Text`
  font-family: Oxygen-Bold;
  color: ${colors.black};
  margin-top: ${rh(91)}px;
  font-size: ${rpx(22)}px;
`;
export const SignInText = styled.Text`
  font-family: Oxygen-Regular;
  color: ${colors.black};
  margin-top: ${rh(5)}px;
  font-size: ${rpx(18)}px;
`;
export const EmailContainer = styled.View`
  margin-top: ${rh(52)}px;
  background-color: transparent;
`;
export const ForgotPasswordTextContainer = styled(Pressable)`
  margin-top: ${rh(110)}px;
`;
export const HelpButton = styled.View`
  margin-bottom: ${rh(10)}px;
`;
export const ForgotPasswordText = styled.Text`
  align-self: center;
  color: ${colors.grey};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
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
export const SignUpContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-vertical: ${rh(25)}px;
  flex-direction: row;
`;
export const AccountText = styled.Text`
  font-size: ${rpx(16)}px;
  color: ${colors.black};
`;

export const SignUpText = styled.Text`
  font-size: ${rpx(16)}px;
  color: ${colors.tangoOrange};
  text-decoration: underline;
  text-decoration-color: ${colors.tangoOrange};
`;

export const BottomViewContainer = styled.View`
  position: absolute;
  bottom: ${rh(10)}px;
  left: ${rw(24)}px;
  right: ${rw(24)}px;
`;
