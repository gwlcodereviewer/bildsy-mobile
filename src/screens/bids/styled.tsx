import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ProjectContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;
export const ProjectViewContainer = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
export const Divider = styled.Image`
  margin-top: ${rh(8)}px;
`;

export const ShowMoreLessText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  font-weight: 600;
  margin-top: ${rh(5)}px;
`;

export const Hr = styled.View`
  border-color: ${colors.Grey_20};
  border-width: ${rh(0.5)}px;
  border-style: solid;
`;

export const BottomContainer = styled.View`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  padding-left: ${rpx(3)}px;
  padding-right: ${rpx(3)}px;
  height: 100%;
  padding-bottom: ${rh(30)}px;
`;

export const CenterContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FilterIcon = styled.View`
  margin-left: auto;
`;

export const AddFloatingBtnContainer = styled.View`
  align-self: flex-end;
  bottom: 0;
`;

export const Menu = styled.View`
  height: ${rh(60)}px;
  background-color: ${colors.white};
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  z-index: 3;
`;

interface MenuType {
  select?: string;
  title?: string;
}
export const MenuElement = styled(Pressable)<MenuType>`
  background-color: ${props => (props.select === props.title ? colors.orangeWithOpacity : colors.whiteWithOpacity)};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface TextType {
  select?: string;
  title?: string;
}

export const MenuText = styled.Text<TextType>`
  color: ${props => (props.select === props.title ? colors.orange : colors.black)};
  font-size: ${rpx(18)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
  font-family: ${FontFamily.sourceSansProRegular};
`;

interface BidType {
  color?: string;
}
export const BidTag = styled.View<BidType>`
  background-color: ${props => props.color};
  color: ${colors.white};
  border-radius: ${rpx(20)}px;
  align-self: flex-start;
  height: ${rh(28)}px;
  margin-bottom: ${rh(10)}px;
  padding-horizontal: ${rw(10)}px;
`;
export const BidTagText = styled.Text`
  color: ${colors.white};
  border-radius: ${rpx(20)}px;
  margin: auto;
  font-family: ${FontFamily.sourceSansProSemiBold};
`;

export const ProjectName = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  color: ${colors.black};
  margin-bottom: ${rh(5)}px;
`;

export const ProjectId = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  margin-bottom: ${rh(5)}px;
`;
export const ProjectLocation = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  margin-bottom: ${rh(25)}px;
`;

export const CardBottomContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BudgetContainer = styled.View``;

export const DateContainer = styled.View``;

export const GrayText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.Dusty_Gray};
  margin-bottom: ${rh(6)}px;
`;

export const BlackText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
`;

export const SearchView = styled.View`
  height: ${rh(40)}px;
  width: ${rw(243)}px;
  background-color: transparent;
  margin-left: auto;
  margin-right: auto;
  border-color: ${colors.white};
  border-radius: ${rpx(20)}px;
  border-width: ${rpx(1)}px;
  align-items: center;
  flex-direction: row;
`;

export const SearchContainer = styled.View`
  margin-left: ${rw(14)}px;
  margin-right: ${rw(14)}px;
`;

export const InputBox = styled.TextInput`
  color: ${colors.white};
  margin-right: ${rw(14)}px;
  flex-shrink: 1;
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  width: 100%;
`;

export const ProjectListContainer = styled.View``;

export const BtnContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  bottom: ${rh(0)}px;
`;

export const InputFieldWrapper = styled.View`
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(5)}px;
`;
export const ClearAllText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(18)}px;
  margin-top: ${rh(24)}px;
  text-decoration: underline;
  margin-left: auto;
`;

export const Wrapper = styled.View`
  margin-horizontal: ${rw(24)}px;
`;
export const SafeAreaContainer = styled.View`
  margin-top: ${rh(2)}px;
  display: flex;
  flex-grow: 1;
  background-color: ${colors.transparent};
  padding-bottom: ${rh(30)}px;
  height: 100%;
`;
export const MainLoaderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const NoProjectText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  margin-top: ${rh(12)}px;
`;
export const RangeLabel = styled.View`
  align-items: center;
  padding: ${rpx(8)}px;
  background-color: ${colors.white};
  border-radius: ${rpx(4)}px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
`;

export const SliderLabel = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.primaryThemeColor};
`;

export const WrapperField = styled.View`
  margin-vertical: ${rh(10)}px;
`;

interface zIndex {
  zIndex?: number;
}
export const PageTitleContainer2 = styled.View<zIndex>`
  flex-direction: row;
  height: ${rh(44)}px;
  background-color: transparent;
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  margin-top: ${rh(24)}px;
  margin-bottom: ${rh(10)}px;
  align-items: center;
  z-index: 3;
`;

export const CalenderImage = styled.Image`
  margin-top: ${rh(-25)}px;
`;

export const RowView = styled.View`
  flex: 0.48;
  flex-direction: row;
  justify-content: space-between;
`;

interface IButton {
  color: string;
}
export const ApplyButton = styled.TouchableOpacity<IButton>`
  background-color: ${props => props.color};
  color: ${colors.white};
  border-radius: ${rpx(4)}px;
  height: ${rpx(44)}px;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
`;

export const TagWrapContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  width: ${rw(327)}px;
  margin-top: ${rh(20)}px;
`;

export const TagWrap = styled.View`
  border-color: ${colors.primaryThemeColor};
  border-width: ${rpx(1)}px;
  border-radius: ${rpx(4)}px;
  border-style: solid;
  padding-vertical: ${rh(4)}px;
  flex-direction: row;
  padding-horizontal: ${rpx(4)}px;
  margin-right: ${rw(10)}px;
  margin-bottom: ${rh(10)}10px;
`;

export const TagText = styled.Text`
  align-self: center;
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  font-weight: 600;
`;
export const EditTouch = styled.TouchableOpacity``;
export const EditImage = styled.Image``;
export const ProjectTitleSubContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
`;
export const BidTagContainer = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  flex-direction: row;
`;
export const BidTagRowContainer = styled.View`
  justify-content: space-between;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ButtonSubContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${colors.white};
  border-color: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
`;
export const SkipBtnView = styled.TouchableOpacity`
  height: ${rh(44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(4)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.midnight};
`;
export const ContactTextList = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(16)}px;
`;
export const NextBtnView = styled.TouchableOpacity`
  height: ${rh(44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(4)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.transparent};
  background-color: ${colors.primaryThemeColor};
`;
export const NextText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.white};
  font-size: ${rpx(16)}px;
`;

export const ControlContainer = styled.ScrollView`
  flex: 1;
  display: flex;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
`;
export const InputFieldContainer = styled.View`
  flex-direction: column;
  flex: 1;
  height: 100%;
`;
export const TextTitleContainer = styled.View`
  padding-top: ${rh(20)}px;
  padding-bottom: ${rh(20)}px;
`;
export const TextTitle = styled.Text`
  font-size: ${rpx(18)}px;
  color: ${colors.primaryThemeColor};
  font-family: ${FontFamily.oxygenBold};
`;
export const ScreenNoContentContainer = styled.View`
  flex: 1;
  padding-top: 50%;
  align-items: center;
  justify-content: center;
`;
export const ScreenMainContainer = styled.View`
  flex: 1;
  padding-bottom: 30%;
`;
export const UnderlineText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: normal;
  text-decoration: underline;
  text-decoration-color: ${colors.tangoOrange};
  padding-horizontal: ${rw(4)}px;
`;
export const NormalText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: normal;
  color: ${colors.black};
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(5)}px;
`;
export const AddIconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  bottom: ${rh(0)}px;
`;
export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;
export const DetailText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(12)}px;
`;
export const AttachmentListContainer = styled.TouchableOpacity`
  margin-right: ${rw(20)}px;
  margin-top: ${rh(5)}px;
  justify-content: center;
`;
export const AttachmentListContainerBidProfile = styled.TouchableOpacity`
  margin-horizontal: ${rw(20)}px;
  margin-vertical: ${rh(10)}px;
  justify-content: center;
  flex: 1;
`;
export const AttachmentList = styled.View`
  width: 110%;
  border-color: ${colors.skipColor};
  align-content: center;
  justify-content: center;
  align-items: center;
  height: ${rh(30)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const AttachmentName = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  flex: 1;
  padding-right: ${rpx(10)}px;
`;
export const InfoText = styled.Text`
  color: ${colors.black};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  height: 70px;
  flex: 1;
  padding-top: ${rpx(20)}px;
`;
export const AttachmentImageContainer = styled.View`
  align-items: flex-start;
  padding-right: ${rw(5)}px;
`;
export const InfoImageContainer = styled.View`
  align-items: flex-start;
  padding-right: ${rw(5)}px;
`;
export const InfoViewContainer = styled.View`
  width: 100%;
  border-color: ${colors.skipColor};
  align-content: center;
  justify-content: center;
  align-items: center;
  height: ${rh(50)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const MainView = styled.View`
  padding-top: ${rh(20)}px;
  padding-bottom: ${rw(10)}px;
`;
export const ChatElementsContainer = styled.View`
  background-color: ${colors.white};
  height: ${rh(105)}px;
  border-radius: 4px;
  margin-left: ${rw(14)}px;
  margin-right: ${rw(14)}px;
  elevation: 6;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.7);
  shadow-offset: {
    width: ${rh(0)}px;
    height: ${rh(3)}px;
  }
  shadow-radius: ${rh(4.65)}px;
`;
export const ChatDialogRowContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: ${rh(20)}px;
  margin-left: ${rw(14)}px;
  margin-right: ${rw(24)}px;
  padding-right: ${rw(34)}px;
  align-items: center;
`;
export const ChatDialogImage = styled.Image`
  width: ${rw(54)}px;
  height: ${rh(54)}px;
  border-radius: ${rh(27)}px;
`;
export const ChatDialogView = styled.View`
  width: ${rw(54)}px;
  height: ${rh(54)}px;
  border-radius: ${rh(27)}px;
  position: relative;
  border-width: ${rh(2)}px;
  border-color: ${colors.white};
  shadow-color: ${colors.black};
  shadow-offset: {
    width: ${rh(1)}px;
    height: ${rh(1)}px;
  }
  shadow-radius: ${rh(1)}px;
  shadow-opacity: 0.1;
`;
export const OnlineDotView = styled.View`
  width: ${rw(10)}px;
  height: ${rh(10)}px;
  border-radius: 5px;
  background-color: ${colors.green};
  position: absolute;
  bottom: ${rh(0)}px;
  right: ${rh(0)}px;
  border-width: ${rh(1)}px;
  border-color: ${colors.white};
`;
export const OfflineDotView = styled.View`
  width: ${rw(10)}px;
  height: ${rh(10)}px;
  border-radius: 5px;
  background-color: ${colors.grey};
  position: absolute;
  bottom: 0;
  right: ${rh(0)}px;
  border-width: ${rh(1)}px;
  border-color: ${colors.white};
`;
export const ChatDialogDescContainer = styled.View`
  flex-direction: column;
  margin-left: ${rw(9)}px;
`;
export const DialogNameText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  max-width: ${rpx(200)}px;
  text-transform: capitalize;
`;
export const ToggleWrapper = styled.TouchableOpacity``;
export const DialogBottomContainer = styled.View`
  flex: 1;
  padding-left: ${rpx(3)}px;
  padding-right: ${rpx(3)}px;
  height: 100%;
`;
export const LastMessageText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(16)}px;
  padding-right: ${rpx(50)}px;
  color: ${colors.black};
`;
export const UnreadCountView = styled.View`
  width: ${rpx(30)}px;
  height: ${rpx(30)}px;
  border-radius: 15px;
  background-color: ${colors.countOval};
  align-content: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 30%;
  right: 10px;
`;
export const UnreadCountText = styled.Text`
  color: ${colors.white};
`;
export const TouchableContainer = styled.TouchableOpacity``;
