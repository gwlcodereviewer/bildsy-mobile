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
  width: ${rw(133)}px;
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
  border-width: ${rw(1)}px;
  border-color: ${colors.Dusty_Gray};
  height: ${rh(20)}px;
  width: ${rw(20)}px;
`;
export const RoundButtonBlue = styled.View`
  margin-top: ${rh(0)}px;
  background-color: ${colors.primaryThemeColor};
  border-radius: ${rpx(100)}px;
  border-width: ${rw(1)}px;
  border-color: ${colors.primaryThemeColor};
  height: ${rh(20)}px;
  width: ${rw(20)}px;
`;
export const RoundButtonGrey = styled.View`
  margin-top: ${rh(0)}px;
  background-color: ${colors.grey};
  border-radius: ${rpx(100)}px;
  border-width: ${rw(1)}px;
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
export const DrawerButtonContainer = styled.View`
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
  margin-top: ${rh(20)}px;
  justify-content: center;
  align-items: center;
`;
export const ClearButtonContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(20)}px;
  justify-content: space-between;
  align-items: center;
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
  z-index: 1;
  top: ${rh(45)}px;
  margin-left: ${rw(-30)}px;
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
  padding-top: ${rh(26)}px;
`;
export const InputFieldWrapper = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;
export const ProfileImage = styled.Image`
  z-index: 1;
  border-width: ${rw(4)}px;
  border-radius: ${rpx(63)}px;
  width: ${rw(126)}px;
  height: ${rpx(126)}px;
  border-color: ${colors.testGray2};
`;
export const ProfileEditIcon = styled.Image`
  z-index: 9;
`;
export const BottomContainer = styled.View`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: ${colors.white};
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
  margin-top: ${rh(10)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
  margin-bottom: ${rh(10)}px;
`;
export const MandatoryFieldContainer = styled.View`
  flex-direction: ${'row'};
`;
export const CheckBoxContainer = styled.View`
  padding-right: ${rw(14)}px;
`;
export const NameContainer = styled.View`
  width: 45%;
`;
export const LastNameContainer = styled.View`
  width: 45%;
`;
export const CityContainer = styled.View`
  width: 45%;
  margin-bottom: ${rh(-4.5)}px;
`;
export const StateContainer = styled.View`
  width: 45%;
  margin-left: ${rh(173)}px;
  margin-top: ${rh(-71)}px;
`;
export const CompanyInfo = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(18)}px;
  color: ${colors.primaryBlue};
`;
export const CompanyLogo = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.primaryBlue};
`;
export const FullRowContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const CompanyLogoContainer = styled.View`
  max-width: ${rw(70)}px;
  flex-direction: row;
`;
export const CompanyEditIcon = styled.Image`
  width: ${rw(20)}px;
  height: ${rh(20)}px;
  margin-left: ${rh(12)}px;
  margin-top: ${rh(-10)}px;
`;
export const CompanyImage = styled.Image`
  z-index: 1;
  border-width: ${rw(6)}px;
  border-color: ${colors.testGray2};
  padding-top: ${rh(18)}px;
  border-radius: ${rpx(120)}px;
  width: ${rw(60)}px;
  height: ${rh(60)}px;
`;
export const CrossIconContainer = styled.View`
  right: ${rw(10)}px;
`;
export const CrossImage = styled.Image``;
export const CompanyLogoName = styled.View`
  width: 78%;
  padding-left: ${rw(5)}px;
  padding-right: ${rw(5)}px;
`;
export const NameLogoContainer = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  width: 90%;
`;
export const SupportImage = styled.Image`
  width: ${rw(52)}px;
  height: ${rh(43)}px;
`;
export const SupportImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  padding-top: ${rh(30)}px;
  padding-bottom: ${rh(20)}px;
`;
export const ContactTextStyle = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(13.5)}px;
  color: ${colors.black};
  line-height: ${rpx(16)}px;
`;
export const SupportMailContainer = styled.Text`
  color: ${colors.primaryThemeColor};
  font-size: ${rpx(13.5)}px;
  line-height: ${rpx(16)}px;
  margin-top: ${rh(3)}px;
`;
export const TouchableContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
export const SupportContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;
export const InfoStyle = styled.View`
  margin-top: ${rh(25)}px;
  border-width: ${rw(0.3)}px;
  border-color: ${colors.Dusty_Gray};
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  padding-bottom: ${rh(20)}px;
  padding-top: ${rh(20)}px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
  background-color: ${colors.white};
`;
export const InfoStyleText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  color: ${colors.primaryBlue};
`;
export const InfoStyle1Text = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.dateGray};
  padding-top: ${rw(20)}px;
`;
export const InfoStyle2Text = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
`;
export const TextName = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(12)}px;
  color: ${colors.primaryBlue};
`;
export const AsteriskTextName = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(10)}px;
  color: ${colors.redPink};
`;
export const TextHeading = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(18)}px;
  color: ${colors.primaryBlue};
`;
export const NameInputText = styled.TextInput`
  border-width: ${rw(1)}px;
  height: ${rh(48)}px;
  width: ${'100%'};
  border: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
  margin-right: ${rw(10)};
  padding-left: ${rw(10)};
  padding-right: ${rw(10)};
`;
export const EmailInputText = styled.TextInput`
  border-width: ${rw(1)}px;
  height: ${rh(48)}px;
  width: ${'100%'};
  border: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
  margin-right: ${rw(10)};
  padding-left: ${rw(10)};
  padding-right: ${rw(10)};
`;
export const SubjectInputText = styled.TextInput`
  border-width: ${rw(1)}px;
  height: ${rh(48)}px;
  width: ${'100%'};
  border: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
  margin-right: ${rw(10)};
  padding-left: ${rw(10)};
  padding-right: ${rw(10)};
`;
export const DescriptionInputText = styled.TextInput`
  border-width: ${rw(1)}px;
  height: ${rh(48)}px;
  width: ${'100%'};
  border: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
  margin-right: ${rw(10)};
  padding-left: ${rw(10)};
  padding-right: ${rw(10)};
`;
export const ButtonField = styled.Button`
  background-color: ${colors.transparent};
  align-items: ${'center'};
  margin-top: ${rh(30)}px;
  margin-left: ${rw(15)}px;
  margin-right: ${rw(15)}px;
  margin-bottom: ${rh(50)}px;
`;
export const ButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  align-items: center;
  justify-content: center;
`;
export const FileUploadButtonText = styled.Text`
  color: ${colors.primaryThemeColor};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  align-items: center;
  justify-content: center;
`;
export const ClearButtonText = styled.Text`
  color: ${colors.primaryThemeColor};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity<IButton>`
  background-color: ${props => (props.disabled ? colors.disabledPrimaryTheme : colors.primaryThemeColor)};
  height: ${rh(38)}px;
  border-radius: ${rpx(4)}px;
  align-items: center;
  margin-top: ${rh(20)}px;
  margin-bottom: ${rh(20)}px;
  width: 80%;
  justify-content: center;
`;
export const AttachmentListContainer = styled.View`
  margin-right: ${rw(20)}px;
  margin-top: ${rh(20)}px;
  justify-content: center;
`;
export const AttachmentList = styled.View`
  width: 100%;
  border-color: ${colors.skipColor};
  align-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const HelpAttachmentContainer = styled.View`
  align-items: center;
  padding-right: ${rw(5)}px;
  flex-direction: row;
  padding-bottom: ${rh(10)}px;
`;
export const HelpAttachmentOuterContainer = styled.View`
  align-items: center;
  padding-right: ${rw(5)}px;
  padding-bottom: ${rh(20)}px;
`;
export const HelpAttachmentIcon = styled.Image`
  width: ${rw(30)}px;
  height: ${rh(30)}px;
  margin-left: ${rh(30)}px;
  margin-top: ${rh(10)}px;
  border-radius: ${rpx(15)}px;
  border-width: ${rw(1)}px;
`;
export const HelpAttachmentName = styled.Text`
  color: ${colors.black};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  padding-right: ${rw(5)}px;
  padding-left: ${rw(10)}px;
  flex: 1;
`;
export const MainLoaderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
