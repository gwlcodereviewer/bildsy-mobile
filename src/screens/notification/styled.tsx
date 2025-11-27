import styled from 'styled-components/native';
import {Pressable} from 'react-native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ProjectContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;

export const BottomContainer = styled.View`
  background-color: ${colors.wild_Sand};
  padding-left: ${rpx(3)}px;
  padding-right: ${rpx(3)}px;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  padding-bottom: ${rpx(100)}px;
`;

export const NotificationRowContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: ${rh(10)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
  margin-bottom: ${rh(10)}px;
`;
export const DialogRowContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: ${rh(20)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
`;
export const NotificationDescContainer = styled.View`
  flex-direction: column;
  width: 80%;
  margin-left: ${rw(9)}px;
`;

export const NotificationImage = styled.Image`
  width: ${rw(65)}px;
  height: ${rh(65)}px;
  border-radius: 4px;
`;

export const BottomElementsContainer = styled.View`
  background-color: ${colors.white};
  border-radius: 4px;
  margin-top: ${rh(10)}px;
  margin-left: ${rw(24)}px;
  margin-right: ${rw(24)}px;
`;

export const TimeText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.dateGray};
`;
export const DialogTimeText = styled.Text`
  position: absolute;
  right: 0px;
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(14)}px;
  color: ${colors.dateGray};
`;
export const HeadingText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  padding-right: ${rw(6)}px;
  padding-bottom: ${rw(10)}px;
`;

export const DescText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
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
  margin-top: 7px;
`;

interface MenuType {
  select?: string;
  title?: string;
}
export const MenuElement = styled(Pressable)<MenuType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  color: ${colors.Grey_60};
`;
interface BoxType {
  select?: string;
  title?: string;
}
interface TextType {
  select?: string;
  title?: string;
}

export const Box = styled.View<TextType>`
  flex: 1;
  background-color: ${props => (props.select === props.title ? colors.orange : colors.blogGrey)};
  border-radius: 25px;
  margin-right: 10px;
  height: 30px;
`;

export const MenuText = styled.Text<TextType>`
  color: ${props => (props.select === props.title ? colors.white : colors.Grey_60)};
  font-size: ${rpx(18)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  margin-top: ${rh(3)}px;
  font-family: ${FontFamily.sourceSansProSemiBold};
`;

interface BidType {
  color?: string;
}
export const BidTag = styled.View<BidType>`
  background-color: ${props => (props.color === 'green' ? colors.darkishGreen : colors.tagPendingColor)};
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
  margin-right: ${rw(24)}px;
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
  width: 100%;
`;
export const NoNotificationText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  margin-top: ${rh(12)}px;
`;
