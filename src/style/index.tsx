import styled from 'styled-components/native';
import {Pressable, TouchableOpacity} from 'react-native';
import colors from './colors';
import {FontFamily, rh, rw, rpx} from './Dimen';
import {BidType, IVerticalMargin, StatusType, IFontSize} from './types';

export const AsteriskLabel = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rh(18)}px;
  color: ${colors.amaranth};
  font-family: ${FontFamily.oxygenRegular};
`;
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;
interface IButton {
  selected?: boolean;
  marginTop?: number;
}
export const SubmitButton = styled.TouchableOpacity<IButton>`
  background-color: ${props => (props.selected ? colors.primaryThemeColor : colors.disabledPrimaryTheme)};
  color: ${colors.white};
  border-radius: ${rpx(4)}px;
  height: ${rpx(44)}px;
  justify-content: center;
  align-items: center;
  margin-top: ${props => (props.marginTop ? props.marginTop : rh(15))}px;
  margin-bottom: ${rh(20)}px;
`;
export const SubmitButtonWithBorder = styled(TouchableOpacity)<IButton>`
  background-color: ${colors.white};
  color: ${colors.primaryThemeColor};
  border-radius: ${rpx(4)}px;
  height: ${rpx(44)}px;
  justify-content: center;
  align-items: center;
  border-width: ${rpx(1)}px;
  border-color: ${colors.primaryThemeColor};
  margin-top: ${props => (props.marginTop ? props.marginTop : rh(20))}px;
`;
export const ButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
`;
export const ButtonText2 = styled.Text`
  color: ${colors.primaryThemeColor};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
`;
export const WrapperContainer = styled.ImageBackground`
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
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
`;
export const BottomContainer = styled.View`
  padding-horizontal: ${rw(24)}px;
  padding-vertical: ${rh(24)}px;
`;
export const InputFieldContainer = styled.View`
  margin-vertical: ${rh(5)}px;
`;
export const PageTitleContainer = styled.View`
  flex-direction: row;
  height: ${rh(44)}px;
  background-color: transparent;
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  margin-top: ${rh(24)}px;
  margin-bottom: ${rh(10)}px;
  align-items: center;
`;
export const PageTitle = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(20)}px;
  font-weight: normal;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
`;

export const PageTitleWithUpperCase = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(20)}px;
  font-weight: normal;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
  text-transform: capitalize;
`;
export const InputFieldContainerPressable = styled(Pressable)`
  flex: 1;
`;
export const BlankInputView = styled.View``;
export const SmallInputContainer = styled.View`
  background-color: ${colors.white};
  flex: 0.48;
  justify-content: space-between;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
export const ModalMainContainer = styled.View`
  flex: 1;
  background-color: rgba(3, 3, 3, 0.2);
`;
export const ModalSubContainer = styled.View`
  width: 90%;
  border-radius: ${rpx(10)}px;
  background-color: ${colors.white};
  align-items: center;
  align-self: center;
`;
export const ButtonContainer = styled.View`
  position: absolute;
  bottom: ${rh(30)}px;
  align-self: center;
  width: 100%;
`;
export const EmptyViewContainer = styled.View``;
export const BidTag = styled.View<BidType>`
  background-color: ${props => (props.color ? props.color : colors.tagPendingColor)};
  color: ${colors.white};
  border-radius: ${rpx(20)}px;
  align-self: flex-start;
  height: ${rh(28)}px;
  margin-bottom: ${rh(10)}px;
  padding-horizontal: ${rw(20)}px;
`;
export const BidTagText = styled.Text<StatusType>`
  color: ${props => props.statusColor};
  border-radius: ${rpx(20)}px;
  margin: auto;
  font-family: ${FontFamily.sourceSansProSemiBold};
`;
export const MainLoaderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const ListContainerView = styled.TouchableOpacity`
  margin-top: ${rh(20)}px;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(3)}px;
  border-color: ${colors.wild_Sand};
`;
export const ListContainerView2 = styled.View`
  margin-top: ${rh(20)}px;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(3)}px;
  border-color: ${colors.wild_Sand};
  flex-direction: column;
`;
export const ListCheckView = styled.View<IVerticalMargin>`
  margin-top: ${rh(20)}px;
  margin-bottom: ${props => (props.marginBottom ? rh(props.marginBottom) : rh(0))}px;
  margin-left: ${rw(14)}px;
  margin-right: ${rw(14)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const CheckBoxContainer = styled.View`
  padding-right: ${rw(14)}px;
`;
export const BottomCardContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
`;
export const DropDownView = styled.View``;
export const ModalDropDownContainer = styled.View`
  height: ${rh(50)}px;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
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
export const InputFieldWrapper = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;
export const ComplaintAddAttachmentView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${rw(-10)}px;
`;
export const ComplaintAddAttachmentText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  flex: 1;
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
export const AttachmentImageContainer = styled.View`
  align-items: flex-start;
  padding-right: ${rw(5)}px;
`;
export const AttachmentRemoveContainer = styled.View`
  align-items: flex-start;
`;
export const ChatAttachmentContainer = styled.View`
  background-color: ${colors.white};
  width: 100%;
  align-items: center;
  padding: ${rw(10)}px;
  margin-bottom: ${rw(5)}px;
  justify-content: space-between;
  flex-direction: row;
  height: ${rw(50)}px;
`;
export const ChatFooterContainer = styled.View`
  margin: ${rw(10)}px;
  padding-left: ${rw(10)}px;
  justify-content: space-between;
  flex-direction: row;
  height: ${rw(30)}px;
`;
export const AttachmentName = styled.Text`
  color: ${colors.black};
  line-height: ${rpx(20)}px;
  padding-right: ${rw(10)}px;
  flex: 1;
`;

export const AttachmentImageName = styled.Text`
  color: ${colors.black};
  line-height: ${rpx(20)}px;
  padding-horizontal: ${rw(10)}px;
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
export const TouchableContainer = styled.TouchableOpacity``;
export const AddAttachmentText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  margin-right: ${rw(24)}px;
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

export const ProName = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.grey};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
  text-transform: capitalize;
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

export const DetailsTitleName = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
  text-transform: capitalize;
`;
export const ColumnContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;

export const CancelButton = styled.View`
  width: ${rw(159)}px;
  height: ${rh(44)}px;
  border-width: ${rw(1)}px;
  background-color: ${colors.white};
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
export const SaveButton = styled(TouchableOpacity)<IButton>`
  margin-left: ${rw(10)}px;
  width: ${rw(159)}px;
  height: ${rh(44)}px;
  background-color: ${colors.primaryThemeColor};
  border-width: ${rw(1)}px;
  border-radius: ${rpx(4)}px;
  border-color: ${colors.black};
`;
export const SaveButtonText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.white};
  text-align: center;
  margin-top: ${rh(10)}px;
  font-size: ${rpx(16)}px;
`;
export const AttachmentListMainContainer = styled.View`
  margin-top: ${rh(20)}px;
  justify-content: center;
`;
export const NoProjectAvailable = styled.View`
  background-color: ${colors.athens_Gray};
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(10)}px;
`;
export const NoProjectAvailableText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  font-weight: 600;
  color: ${colors.black};
  text-align: center;
`;
export const ShowMoreLessText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  font-weight: 600;
  margin-top: ${rh(5)}px;
`;
export const ParentViewContainer = styled.View`
  background-color: ${colors.white};
  margin-top: auto;
  margin-bottom: auto;
  margin-horizontal: ${rpx(20)}px;
  padding-horizontal: ${rpx(25)}px;
  padding-vertical: ${rpx(20)}px;
  border-radius: ${rpx(20)}px;
  border-color: ${colors.Grey_20};
  border-width: ${rpx(2)}px;
`;
export const CallButton = styled.TouchableOpacity<IButton>`
  opacity: ${props => (props.selected ? 1 : 0.3)};
  z-index: 1;
`;
