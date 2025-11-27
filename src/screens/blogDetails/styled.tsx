import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../style/colors';

import {rh, rpx, rw, FontFamily} from '../../style/Dimen';
import {IHorizontalMargin, IVerticalMargin, IFontSize} from '../../style/types';

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
  flex: 1;
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
  margin-top: ${rh(6)}px;
`;
export const DropDownView = styled.View``;
export const DropDownSubContainer = styled.View`
  height: ${rh(44)}px;
  border-width: ${rw(1)}px;
  background-color: ${colors.white};
  flex: 0.48;
  border-color: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
`;
export const AddAttachmentText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  margin-right: ${rw(24)}px;
  flex: 1;
`;
export const AddAttachmentView = styled.TouchableOpacity`
  margin-left: ${rw(10)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${rh(19)}px;
  flex: 1;
`;
export const NextButtonContainer = styled.TouchableOpacity`
  height: ${rh(44)}px;
  background-color: ${colors.midnight};
  margin-left: ${rw(24)}px;
  margin-right: ${rh(24)}px;
  margin-top: ${rh(29)}px;
  align-items: center;
  justify-content: center;
`;
export const NextText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.white};
  font-size: ${rpx(16)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
`;
// UI For Professionals
export const ProfessionalsText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  margin-top: ${rh(8)}px;
  line-height: ${rpx(20)}px;
  letter-spacing: ${rpx(-0.2)}px;
`;
export const RadioButtonView = styled.View`
  height: ${rh(20)}px;

  flex-direction: row;
  margin-top: ${rh(22)}px;
`;
export const RadioButtonText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(16)}px;

  margin-left: ${rw(10)}px;
`;
export const RadioImage = styled.Image`
  margin-top: ${rh(2)}px;
`;
export const ProfessionalListView = styled.View`
  flex-direction: row;
  margin-top: ${rh(30)}px;
`;
export const ProfessionalListText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(18)}px;
`;
export const SearchImage = styled.Image`
  margin-top: ${rh(2)}px;
  margin-left: ${rh(120)}px;
`;
export const FilterImage = styled.Image`
  margin-top: ${rh(2)}px;
  margin-left: ${rh(23)}px;
  margin-right: ${rh(26)}px;
`;
export const ListContainerView = styled.View`
  margin-top: ${rh(20)}px;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(3)}px;
  border-color: ${colors.wild_Sand};
`;
export const ListCheckView = styled.View<IVerticalMargin>`
  margin-top: ${rh(20)}px;
  margin-bottom: ${props => (props.marginBottom ? rh(props.marginBottom) : rh(0))}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ContactTextList = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(16)}px;
`;
export const SpaceInList = styled.View<IVerticalMargin>`
  margin-top: ${props => (props.marginTop ? rh(props.marginTop) : rh(10))}px;
  height: ${rh(5)}px;
  background-color: ${colors.wild_Sand};
`;
export const SkipView = styled.TouchableOpacity`
  height: ${rh(44)}px;
  margin-top: ${rh(29)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.midnight};
  margin-left: ${rw(24)}px;
  margin-right: ${rh(24)}px;
`;
export const ButtonSubContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${colors.white};
  flex: 0.48;
  border-color: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
`;
export const SkipBtnView = styled.TouchableOpacity`
  height: ${rh(44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(4)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.midnight};
`;
export const NextBtnContainer = styled.View`
  height: ${rh(44)}px;

  background-color: ${colors.midnight};
  margin-left: ${rw(24)}px;
  margin-right: ${rh(24)}px;
  align-items: center;
  justify-content: center;
`;
export const NextBtnView = styled.TouchableOpacity<IRounded>`
  height: ${rh(44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(4)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.transparent};
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${rw(24)}px;
  margin-right: ${rh(24)}px;
`;
// UI OF CONFIRM VIEW
export const ConfirmContainerView = styled.View`
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(3)}px;
  border-color: ${colors.wild_Sand};
`;
export const ProjectDetailText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(18)}px;
`;
export const ListConfirmContainerView = styled.View`
  margin-top: ${rh(10)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const TypeTextList = styled.Text<IHorizontalMargin>`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.black};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : rw(0))}px;
  margin-right: ${props => (props.marginRight ? props.marginRight : rw(0))}px;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
`;
export const TypeAnsList = styled.Text<IHorizontalMargin>`
  font-family: ${FontFamily.sourceSansProRegular};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : rw(0))}px;
  margin-right: ${props => (props.marginRight ? props.marginRight : rw(0))}px;
  color: ${colors.grey};
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
  text-align: left;
  flex-wrap: wrap;
  flex: 1;
`;
export const EditImage = styled.Image``;
export const ProjectDetailView = styled.View`
  margin-top: ${rh(20)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DescriptionText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(5)}px;
  background-color: ${colors.transparent};
`;
export const ProfessionalDetailView = styled.View`
  background-color: ${colors.alabaster};
`;
export const ProfessionalDetailText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  text-align: right;
  background-color: ${colors.transparent};
`;
export const ProfessionalAnsText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
  background-color: ${colors.transparent};
`;
export const AttachmentView = styled.View`
  margin-right: ${rw(20)}px;
  height: ${rh(60)}px;
  width: ${rw(190)}px;
  border-radius: ${rpx(5)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.Dusty_Gray};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const PdfImage = styled.Image`
  margin-left: ${rw(16)}px;
  margin-right: ${rw(16)}px;
`;
export const PdfText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  margin-right: ${rh(17)}px;
  width: ${rw(100)}px;
`;
export const CancelPdfImage = styled.Image`
  margin-top: ${rh(-20)}px;

  margin-right: ${rw(8)}px;
`;
export const FullWidthDropDown = styled.View`
  height: ${rh(50)}px;
  border-width: ${rpx(1)}px;
  background-color: ${colors.white};
  flex: 1;
  border-color: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(5)}px;
`;
export const ConfirmBtn = styled.TouchableOpacity`
  height: ${rh(44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.midnight};
  background-color: ${colors.midnight};
  margin-left: ${rh(24)}px;
  margin-right: ${rh(24)}px;
`;
export const CompanyDetails = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: ${rh(10)}px;
  padding-right: ${rh(10)}px;
  flex: 1;
`;
export const BottomCardContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
`;
export const DetailsText = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.grey};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
`;
export const DetailsTitle = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
`;
export const BadgeContainer = styled.View`
  flex-direction: row-reverse;
  height: ${rh(30)}px;
  align-items: flex-end;
  flex: 1;
`;
export const CompanyCardView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${rh(12)}px;
  padding-bottom: ${rh(12)}px;
  padding-right: ${rw(20)}px;
  padding-left: ${rw(20)}px;
`;
export const ProgressLine = styled.View`
  background-color: ${colors.athens_Gray};
  margin-top: ${rh(9)}px;
  height: ${rh(4)}px;
  width: ${rh(111)}px;
`;
export const ProgressLineBlue = styled.View`
  background-color: ${colors.primaryThemeColor};
  margin-top: ${rh(9)}px;
  height: ${rh(4)}px;
  width: ${rh(111)}px;
`;

export const ProfessionalContainer = styled.View``;
export const CompanyContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const CompanyTextContainer = styled.View``;
export const CompanyText = styled.Text`
  width: 100%;
  flex-wrap: wrap;
  text-align: right;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
`;
export const EditTouch = styled.TouchableOpacity``;

export const PopUp = styled.View`
  background-color: ${colors.athens_Gray};

  margin-top: ${rh(9)}px;

  height: ${rh(224)}px;
  width: ${rh(211)}px;
`;
export const PopUpLabel = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(22)}px;
`;

interface IButton {
  selected?: boolean;
}

export const SaveButtonContainer = styled.TouchableOpacity<IButton>`
  height: ${rh(44)}px;
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
  border-radius: ${rpx(4)}px;
  margin-bottom: ${rh(20)}px;
  margin-top: ${rh(20)}px;
  align-items: center;
  justify-content: center;
`;

export const SaveButtonContainer2 = styled.TouchableOpacity<IButton>`
  height: ${rh(44)}px;
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};

  margin-bottom: ${rh(20)}px;
  margin-top: ${rh(20)}px;
  align-items: center;
  justify-content: center;
`;
export const CityView = styled.View`
  background-color: ${colors.apple};

  margin-top: ${rh(9)}px;

  height: ${rh(43)}px;
  width: ${rh(211)}px;
`;
export const SmallInputContainer = styled.View`
  background-color: ${colors.white};
  flex: 0.48;
  justify-content: space-between;
  padding-top: ${rh(10)}px;
`;
export const SpaceHorizontal = styled.View`
  padding-right: ${rw(10)}px;
`;
export const FilterModalContainer = styled.View`
  flex-direction: row;
`;
export const CloseIconContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${rh(30)}px;
  align-items: flex-end;
  justify-content: flex-end;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(50)}px;
`;
export const CalenderView = styled(Pressable)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const AttachmentListContainer = styled.View`
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  margin-top: ${rh(20)}px;
  justify-content: center;
`;
export const AttachmentList = styled.View`
  width: 100%;
  border-color: ${colors.skipColor};
  align-content: center;
  align-items: center;
  height: ${rh(30)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const AttachmentName = styled.Text`
  color: ${colors.black};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  flex: 1;
`;
export const AttachmentImageContainer = styled.View`
  align-items: flex-start;
  padding-right: ${rw(5)}px;
`;
export const TouchableContainer = styled.TouchableOpacity``;

export const InputFieldWrapper = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;
export const DropDownContainer = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;

export const SupportArea = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(16)}px;
  text-align: center;
  padding-left: ${rw(25)}px;
  padding-right: ${rw(25)}px;
`;

export const SupportAreaView = styled.View`
  margin-top: ${rh(20)}px;
  background-color: ${colors.Grey_10};
  border-radius: ${rpx(2)}px;
  border-width: ${rw(1)}px;
  border-style: solid;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
  padding-left: ${rw(10)}px;
  padding-right: ${rw(10)}px;
`;

export const BottomContainer = styled.ScrollView`
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: ${colors.white};
  height: 100%;
  padding-bottom: ${rh(60)}px;
`;

export const DateText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  line-height: ${rpx(20)}px;
  margin-left: ${rw(10)}px;
`;

export const HeadingText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(20)}px;
  color: ${colors.primaryThemeColor};
  margin-top: ${rw(15)}px;
  line-height: ${rpx(30)}px;
`;

export const DescText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  margin-top: ${rw(10)}px;
  line-height: ${rpx(24)}px;
`;

export const DateRowContainer = styled.View`
  flex-direction: row;
`;

export const CalendarImage = styled.Image`
  height: ${rpx(16)}px;
  width: ${rpx(16)}px;
`;

export const BottomElementsContainer = styled.View`
  margin-top: ${rh(24)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
  margin-bottom: ${rh(100)}px;
`;

export const BlogImage = styled.Image`
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  width: 100%;
  height: ${rh(277)}px;
  border-radius: 4px;
`;

export const TopContainer = styled.View``;

export const formScrollView = styled.ScrollView``;
export const MainWrapper = styled.View`
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  padding-top: ${rh(20)}px;
  display: flex;
  flex: 1;
  flex-grow: 1;
`;

export const CheckBoxContainer = styled.View`
  padding-right: ${rw(14)}px;
`;
export const ValueText = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  width: 100%;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
`;
export const AddAttachmentModalView = styled.TouchableOpacity`
  margin-left: ${rw(10)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${rh(19)}px;
`;

export const MainLoaderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const BlogDetail = styled.View`
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: ${colors.transparent};
`;
export const TitleText = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.grey};
  flex-wrap: wrap;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
`;
export const TitleDetails = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  flex-wrap: wrap;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
  text-transform: capitalize;
`;
