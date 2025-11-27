import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

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

export const MainLoaderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const BackButtonContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${colors.transparent};
  padding-right: ${rw(24)}px;
  margin-top: ${rh(5)}px;
`;
export const LogoImage = styled.Image``;

export const BottomContainer = styled.View`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: ${colors.wild_Sand};
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
`;

export const ProfileRowContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(1)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ProfileDescContainer = styled.View`
  padding-left: ${rw(10)}px;
  padding-right: ${rw(10)}px;
  width: 70%;
`;

export const ProfileImage = styled.Image`
  height: ${rpx(92)}px;
  width: ${rpx(92)}px;
  border-radius: ${rpx(46)}px;
  border-width: ${rpx(5)}px;
  margin-top: ${rh(0)}px;
  border-color: ${colors.profileRadius};
`;
export const EditIconContainer = styled.View`
  flex-direction: row-reverse;
  width: 100%;
`;
export const ProfileEditIcon = styled.Image`
  align-items: flex-end;
  align-content: flex-end;
`;

export const ProfilePhoneIcon = styled.Image`
  margin-top: ${rh(20)}px;
`;

export const ProfileSignIcon = styled.Image`
  margin-top: ${rh(12)}px;
  margin-left: ${rw(25)}px;
  background-color: ${colors.profileRadius};
`;

export const ChangePasswordIcon = styled.Image`
  margin-top: ${rh(9)}px;
  margin-left: ${rw(20)}px;
  width: ${rw(30)}px;
  height: ${rh(30)}px;
  background-color: ${colors.profileRadius};
`;

export const PathIcon = styled.Image`
  flex-direction: row-reverse;
  justify-content: flex-end;
  background-color: ${colors.profileRadius};
`;

export const RightArrowContainer = styled.View`
  background-color: ${colors.profileRadius};
  flex-direction: row-reverse;
`;

export const ProfileLocationIcon = styled.Image`
  margin-top: ${rh(15)}px;
`;

export const ProfileMailIcon = styled.Image`
  margin-top: ${rh(16)}px;
`;

export const PhoneRowContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const LocationRowContainer = styled.View`
  flex-direction: row;
`;

export const MailRowContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const BottomElementsContainer = styled.View`
  background-color: ${colors.white};
  border-radius: 17px;
  margin-top: ${rh(24)}px;
  padding-top: ${rh(16)}px;
  padding-bottom: ${rh(16)}px;
  padding-left: ${rw(16)}px;
  padding-right: ${rw(16)}px;
`;

export const SignOutContainer = styled.TouchableOpacity`
  background-color: ${colors.profileRadius};
  height: ${rh(48)}px;
  border-radius: 4px;
  padding-left: ${rw(16)}px;
  padding-right: ${rw(16)}px;
  margin-top: ${rh(10)}px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const ChangePasswordContainer = styled.TouchableOpacity`
  background-color: ${colors.profileRadius};
  height: ${rh(48)}px;
  border-radius: 4px;
  margin-top: ${rh(10)}px;
  flex-direction: row;
  align-items: center;
  margin-top: ${rh(88)}px;
  padding-left: ${rw(16)}px;
  padding-right: ${rw(16)}px;
  justify-content: space-between;
`;

export const TimeText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  line-height: ${rpx(20)}px;
  margin-top: ${rh(8)}px;
`;

export const TypeText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  line-height: ${rpx(20)}px;
  margin-top: ${rh(10)}px;
`;

export const PhoneNumber = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  line-height: ${rpx(20)}px;
  margin-top: ${rh(20)}px;
  height: ${rh(20)}px;
  margin-left: ${rw(10)}px;
`;

export const SignOutText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(18)}px;
  color: ${colors.primaryThemeColor};
  line-height: ${rpx(20)}px;
  padding-left: ${rw(10)}px;
  padding-right: ${rw(10)}px;
`;

export const MailAddress = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  margin-left: ${rw(11)}px;
  margin-top: ${rh(14)}px;
  width: 100%;
`;

export const Location = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  padding-left: ${rw(10)}px;
  padding-right: ${rw(10)}px;
  margin-top: ${rh(14)}px;
`;

export const ProfileName = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(16)}px;
  color: ${colors.primaryThemeColor};
  margin-top: ${rw(8)}px;
  flex-wrap: wrap;
  text-transform: capitalize;
`;
export const BottomDetailsContainer = styled.View``;
export const BottomDetailsSubContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DeleteText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(18)}px;
  color: ${colors.redArchive};
  line-height: ${rpx(20)}px;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(10)}px;
  padding-top: ${rw(5)}px;
`;
