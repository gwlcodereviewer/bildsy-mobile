import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const Container = styled.View`
  flex: 1;
`;
export const UserProfileContainer = styled(Pressable)`
  flex: 1;
  margin-top: ${rh(-5)}px;
  padding-top: ${rh(40)}px;
  padding-left: ${rw(20)}px;
  background-color: ${colors.primaryThemeColor};
`;
export const MainLoaderContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ProductImage = styled.Image`
  height: ${rh(50)}px;
  width: ${rh(50)}px;
`;

export const HelpButton = styled.View`
  margin-bottom: ${rh(10)}px;
  margin-left: ${rh(10)}px;
`;

export const UserProfileImage = styled.Image`
  height: ${rpx(50)}px;
  width: ${rpx(50)}px;
  border-radius: ${rpx(25)}px;
  background-color: ${colors.primaryThemeColor};
  margin-right: ${rw(15)}px;
`;
export const ImageContainer = styled.View`
  flex-direction: row;
`;
export const LabelName = styled.Text`
  align-self: center;
  border-radius: ${rpx(14)}px;
  color: ${colors.white};
  border-width: ${rpx(1)}px;
  border-color: ${colors.white};
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(5)}px;
  font-size: ${rpx(14)}px;
  font-family: ${FontFamily.sourceSansProRegular};
`;

export const VersionName = styled.Text`
  color: ${colors.black};
  padding-left: ${rw(30)}px;
  padding-right: ${rw(15)}px;
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(5)}px;
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.sourceSansProSemiBold};
`;
export const UserName = styled.Text`
  color: ${colors.white};
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.sourceSansProSemiBold};
  margin-top: ${rh(11)}px;
  font-weight: 600;
  text-transform: capitalize;
`;
export const UserEmail = styled.Text`
  color: ${colors.white};
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  margin-top: ${rh(11)}px;
  padding-bottom: ${rh(15)}px;
`;
export const ListContainer = styled.View`
  background-color: ${colors.white};
`;
interface IListItemProps {
  isSelected: boolean;
}
export const ListItemContainer = styled(Pressable)<IListItemProps>`
  background-color: ${props => (props.isSelected ? colors.orangeWithOpacity : colors.white)};
  padding-left: ${rw(22)}px;
  align-items: center;
  flex-direction: row;
  margin-top: ${10}px;
  height: ${rh(48)}px;
  margin-right: ${rw(19)}px;
  border-radius: ${rpx(4)}px;
`;
export const ItemText = styled.Text<IListItemProps>`
  color: ${props => (props.isSelected ? colors.darkBlack : colors.darkBlack)};
  font-size: ${rpx(16)}px;
  font-family: ${props => (props.isSelected ? FontFamily.sourceSansProSemiBold : FontFamily.sourceSansProRegular)};
  margin-left: ${rw(20)}px;
`;
export const SignOutItemText = styled.Text<IListItemProps>`
  color: ${props => (props.isSelected ? colors.darkBlack : colors.darkBlack)};
  font-size: ${rpx(16)}px;
  font-family: ${props => (props.isSelected ? FontFamily.sourceSansProSemiBold : FontFamily.sourceSansProRegular)};
  margin-left: ${rw(20)}px;
`;
export const SignOutContainer = styled.TouchableOpacity`
  padding-left: ${rw(22)}px;
  align-items: center;
  flex-direction: row;
  margin-top: ${10}px;
  height: ${rh(48)}px;
  margin-right: ${rw(19)}px;
  border-radius: ${rpx(4)}px;
`;
