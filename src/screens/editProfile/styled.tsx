import {Pressable} from 'react-native';
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
  width: ${rh(133)}px;
`;

export const ControlContainer = styled.View`
  background-color: ${colors.white};
  margin-top: ${rh(11)}px;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  flex-grow: 1;
`;
export const ProgressBarContainer = styled.View`
  background-color: ${colors.transparent};
  margin-top: ${rh(24)}px;
  height: ${rh(45)}px;
  width: ${rw(375)}px;
`;
export const ProgressBarLineView = styled.View`
  margin-top: ${rh(0)}px;
  margin-right: ${rw(46)}px;
  margin-left: ${rw(47)}px;
  height: ${rh(20)}px;
  flex-direction: row;
`;
interface IRounded {
  selected: boolean;
}
export const RoundButtonNormal = styled.View`
  margin-top: ${rh(0)}px;
  background-color: ${colors.white};

  border-radius: ${rpx(100)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.Dusty_Gray};
  height: ${rh(20)}px;
  width: ${rw(20)}px;
`;
export const RoundButtonBlue = styled.View`
  margin-top: ${rh(0)}px;
  background-color: ${colors.primaryThemeColor};
  border-radius: ${rpx(100)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.primaryThemeColor};
  height: ${rh(20)}px;
  width: ${rw(20)}px;
`;
export const RoundButtonGrey = styled.View`
  margin-top: ${rh(0)}px;
  background-color: ${colors.grey};
  border-radius: ${rpx(100)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.grey};
  height: ${rh(20)}px;
  width: ${rw(20)}px;
`;

export const DetailText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(22)}px;
  margin-top: ${rh(20)}px;
`;
export const InputFieldContainer = styled.View`
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  padding-top: ${rh(20)}px;
`;
export const SpaceBetweenText = styled.View`
  margin-top: ${rh(10)}px;
`;
export const SpaceBetweenTextT = styled.View`
  margin-top: ${rh(25)}px;
`;
export const Space32Pix = styled.View`
  margin-top: ${rh(32)}px;
`;
export const ProjectDetail = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
`;
export const Professionals = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
`;
export const Confirm = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  margin-left: ${rh(24)}px;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
`;
export const ProgressBarTxtContainer = styled.View`
  margin-top: ${rh(11)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(29.5)}px;
  height: ${rh(20)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const BackButtonContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${colors.transparent};
  padding-right: ${rw(24)}px;
  margin-top: ${rh(5)}px;
`;
export const LogoImage = styled.Image``;
export const CompanyLogoImage = styled.Image`
  height: ${rh(40)}px;
  width: ${rw(40)}px;
  border-radius: ${rpx(50)}px;
`;
export const DropDownRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const DropDownView = styled.View``;

export const DropDownSubContainer = styled.View`
  height: ${rh(50)}px;
  border-width: ${rw(1)}px;
  background-color: ${colors.white};
  border-color: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(10)}px;
`;
export const InputFieldContainerPressable = styled(Pressable)`
  margin-vertical: ${rh(5)}px;
  flex: 1;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(20)}px;
  justify-content: space-between;
`;

export const SaveButton = styled.View<IButton>`
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
  border-radius: ${rpx(4)}px;
  margin-bottom: ${rh(20)}px;
  margin-top: ${rh(20)}px;
  align-items: center;
  justify-content: center;
`;

export const SaveButtonText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.white};
  align-items: center;
  align-content: center;
  font-size: ${rpx(16)}px;
`;

export const AddAttachmentView = styled.TouchableOpacity`
  z-index: 10;
  top: ${rh(45)}px;
  margin-left: ${rw(-25)}px;
`;

interface IButton {
  selected?: boolean;
}

export const SaveButtonContainer = styled.TouchableOpacity<IButton>`
  height: ${rh(44)}px;
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
  border-radius: ${rpx(4)}px;
  margin-bottom: ${rh(20)}px;
  align-items: center;
  justify-content: center;
  width: 48%;
`;

export const SaveButtonContainer2 = styled.TouchableOpacity<IButton>`
  height: ${rh(44)}px;
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};

  margin-bottom: ${rh(20)}px;
  margin-top: ${rh(20)}px;
  align-items: center;
  justify-content: center;
`;
export const ProfileImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const InputFieldWrapper = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;

export const ProfileImage = styled.Image`
  z-index: 0.5;
  border-width: ${rpx(6)}px;
  margin-top: ${rh(26)}px;
  border-radius: ${rpx(120)}px;
  width: ${rw(120)}px;
  height: ${rh(126)}px;
  border-color: ${colors.profileRadius};
`;

export const ProfileEditIcon = styled.Image`
  z-index: 9;
`;

export const BottomContainer = styled.View`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  height: ${rh(781)}px;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${rh(-6)}px;
  margin-bottom: ${rh(10)}px;
`;

export const ErrorMessageView = styled.View`
  width: 48%;
`;

export const ErrorMessage = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  line-height: ${rh(18)}px;
  color: ${colors.sunsetOrange};
`;

export const BottomElementsContainer = styled.View`
  margin-top: ${rh(24)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
  margin-bottom: ${rh(24)}px;
`;

export const CheckBoxContainer = styled.View`
  padding-right: ${rw(14)}px;
`;
