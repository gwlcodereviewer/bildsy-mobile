import {Pressable, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../style/colors';

import {rh, rpx, rw, FontFamily} from '../../style/Dimen';

export const Container = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;
export const Header = styled.View`
  background-color: ${colors.transparent};
  margin-top: ${rh(20)}px;
  height: ${rh(27)}px;
  width: ${rw(327)}px;
  margin-left: ${rw(24)}px;
  flex-direction: row;
  margin-bottom: ${rh(20)}px;
`;
export const NormalText = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${20}px;
  font-weight: normal;
  height: ${rh(26)}px;
  width: ${rh(200)}px;
`;

export const PasswordValidateContainer = styled.View`
  background-color: ${colors.testGray2};
  margin-top: ${rh(10)}px;
  height: ${rh(280)}px;
  border-radius: ${rpx(4)}px;
  border-color: ${colors.disableResend};
  border-width: ${rpx(1)}px;
  flex-direction: column;
`;

export const ValidateMatchContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(20)}px;
  margin-left: ${rh(23)}px;
`;

export const CircleView = styled.View`
  height: ${rh(16)}px;
  width: ${rh(18)}px;
  border-color: ${colors.black};
  border-width: ${rpx(1)}px;
  border-style: solid;
  flex-direction: row;
  margin-top: ${rh(4)}px;
`;

export const Text1 = styled.Text`
  color: ${colors.black};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${16}px;
  margin-left: ${rh(10)}px;
`;

export const Text2 = styled.Text`
  color: ${colors.green};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${16}px;
  margin-left: ${rh(21)}px;
`;
export const RoundButtonNormal = styled.View`
  margin-top: ${rh(0)}px;
  background-color: ${colors.white};

  border-radius: ${rpx(100)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.Dusty_Gray};
  height: ${rh(20)}px;
  width: ${rw(20)}px;
`;

export const CheckIcon = styled.Image`
  height: ${rh(9)}px;
  width: ${rw(9)}px;
  margin-top: ${rh(7)}px;
  margin-left: ${rw(-13)}px;
`;

export const BackButtonContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${colors.transparent};
  padding-right: ${rw(24)}px;
  margin-top: ${rh(5)}px;
`;
export const LogoImage = styled.Image``;

export const InputFieldContainerPressable = styled(Pressable)`
  margin-vertical: ${rh(5)}px;
  flex: 1;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(73)}px;
`;

export const CancelButton = styled.View`
  width: ${rw(327)}px;
  height: ${rh(44)}px;
  border-width: ${rw(1)}px;
  background-color: ${colors.white};
  border-radius: ${rpx(4)}px;
  border-color: ${colors.black};
  margin-top: ${rh(73)}px;
`;

export const SignOutButton = styled.View`
  width: ${rw(327)}px;
  height: ${rh(44)}px;
  border-width: ${rw(1)}px;
  background-color: ${colors.white};
  border-radius: ${rpx(4)}px;
  border-color: ${colors.black};
  margin-top: ${rh(20)}px;
`;

export const MainBodyScroll = styled.ScrollView`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
`;

export const SaveButton = styled(TouchableOpacity)<IButton>`
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
  margin-top: ${rh(73)}px;
  height: ${rh(44)}px;
  align-items: center;
  border-width: ${rw(1)}px;
  border-radius: ${rpx(4)}px;
  border-color: ${colors.black};
`;

export const ChangePasswordButton = styled(TouchableOpacity)<IButton>`
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
  margin-top: ${rh(20)}px;
  height: ${rh(44)}px;
  align-items: center;
  border-width: ${rw(1)}px;
  border-radius: ${rpx(4)}px;
  border-color: ${colors.black};
`;

export const CancelButtonText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.primaryThemeColor};
  text-align: center;
  margin-top: ${rh(10)}px;
  font-size: ${rpx(16)}px;
`;

export const SaveButtonText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.white};
  text-align: center;
  margin-top: ${rh(10)}px;
  font-size: ${rpx(16)}px;
`;

interface IButton {
  selected?: boolean;
}

export const InputFieldWrapper = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;

export const BottomContainer = styled.View`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  height: ${rh(781)}px;
`;

export const HeadingText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(18)}px;
  color: ${colors.black};
  line-height: ${rpx(27)}px;
  margin-top: ${rh(20)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
`;

export const BottomElementsContainer = styled.View`
  margin-top: ${rh(24)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
  margin-bottom: ${rh(24)}px;
`;
