import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ProjectContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;

export const BottomContainer = styled.View`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  padding-left: ${rpx(3)}px;
  padding-right: ${rpx(3)}px;
  height: 100%;
  padding-bottom: ${rh(5)}px;
`;

export const Divider = styled.Image`
  margin-top: ${rh(8)}px;
`;

export const Hr = styled.View`
  border-color: ${colors.Grey_20};
  border-width: ${rh(0.5)}px;
  border-style: solid;
`;

export const CenterContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  width?: number;
  paddingLeft?: number;
  alignItems?: string;
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
  letterSpacing?: number;
}

export const MenuText = styled.Text<TextType>`
  color: ${props => (props.select === props.title ? colors.orange : colors.black)};
  font-size: ${rpx(18)}px;
  margin-left: ${rw(14)}px;
  margin-right: ${rw(14)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  letter-spacing: ${props => (props.letterSpacing ? rpx(props.letterSpacing) : rpx(0))}px;
`;
interface BidType {
  color?: string;
}
export const TopRow = styled.View<BidType>`
  flex-direction: row;
  justify-content: space-between;
`;
export const BidTag = styled.View<BidType>`
  background-color: ${props => props.color};
  color: ${colors.white};
  border-radius: ${rpx(20)}px;
  align-self: flex-start;
  height: ${rh(28)}px;
  margin-bottom: ${rh(10)}px;
  padding-horizontal: ${rw(10)}px;
`;

interface StatusType {
  statusColor?: string;
}
export const BidTagText = styled.Text<StatusType>`
  color: ${props => props.statusColor};
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
  padding-bottom: ${rh(60)}px;
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
  margin-bottom: ${rh(10)}px;
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
  flex-direction: row;
  border-color: ${colors.primaryThemeColor};
  flex-wrap: wrap;
  border-width: ${rpx(1)}px;
  align-self: flex-start;
  border-radius: ${rpx(4)}px;
  border-style: solid;
  padding-vertical: ${rh(4)}px;
  padding-horizontal: ${rpx(4)}px;
  margin-right: ${rw(10)}px;
  margin-bottom: ${rh(10)}px;
`;

export const TagText = styled.Text`
  align-self: center;
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.primaryBlue};
  font-weight: 600;
`;

export const AwardContainer = styled.View`
  flex-direction: row;
`;

interface backGroundColor {
  color: string;
}
export const AwardSubView = styled.TouchableOpacity<backGroundColor>`
  background-color: ${props => props.color};
  width: 50%;
  padding-vertical: ${rh(13)}px;
  border-color: ${colors.gray_shadow};
  border-top-width: ${rh(1)}px;
  align-items: center;
`;

interface completeBox {
  color: string;
}
export const CompletedText = styled.Text<completeBox>`
  color: ${props => props.color};
  font-size: ${rpx(14)}px;
  font-family: ${FontFamily.oxygenBold};
  text-align: center;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const CenterSubView = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
`;

export const CallText = styled.Text`
  color: ${colors.apple};
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.oxygenBold};
  text-align: center;
  align-self: center;
`;

export const CallContainer = styled.View`
  padding: ${rpx(5)}px;
`;

export const CardTop = styled.View`
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  padding-bottom: ${rh(20)}px;
`;
export const TransparentView = styled.View`
  background-color: ${colors.transparent};
  flex: 1;
  background-color: ${colors.modalBackground};
`;

export const ViewContainer = styled.View`
  background-color: ${colors.white};
  margin-top: auto;
  margin-bottom: auto;
  margin-horizontal: ${rpx(39)}px;
  border-radius: ${rpx(8)}px;
`;

export const ViewMain = styled.View`
  padding-horizontal: ${rpx(25)}px;
  padding-vertical: ${rpx(30)}px;
`;

export const TextContainer = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(18)}px;
`;

export const OptionString = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  text-align: center;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(10)}px;
`;

export const CancelText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.Dusty_Gray};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(14)}px;
`;
