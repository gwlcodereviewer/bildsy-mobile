import styled from 'styled-components/native';
import {Pressable, TouchableOpacity} from 'react-native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ProjectContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;

interface ContainerType {
  textLimit?: string;
}

export const BottomContainer = styled.View<ContainerType>`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  height: 100%;
  padding-bottom: ${props => (props.textLimit === '' ? rh(60) : rh(0))}px;
`;

export const MainCardContainer = styled.View`
  width: 100%;
  padding-top: ${rh(24)}px;
  padding-bottom: ${rh(24)}px;
  height: 100%;
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
export const MenuController = styled.View`
  height: ${rh(60)}px;
  flex-direction: row;
  align-items: center;
`;
interface MenuType {
  select?: string;
  title?: string;
}
export const MenuElement = styled(TouchableOpacity)<MenuType>`
  margin-left: 10px;
  height: ${rpx(33)}px;
`;
interface TextType {
  select?: string;
  title?: string;
}

export const Box = styled.View<TextType>`
  flex: 1;
  background-color: ${props => (props.select === props.title ? colors.orangeWithOpacity : colors.blogGrey)};
  border-radius: 25px;
  margin-right: 10px;
  height: 30px;
`;

export const MenuText = styled.Text<TextType>`
  color: ${props => (props.select === props.title ? colors.orange : colors.Grey_60)};
  font-size: ${rpx(18)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  margin-top: ${rh(3)}px;
  font-family: ${FontFamily.sourceSansProSemiBold};
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
  flex: 1;
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
