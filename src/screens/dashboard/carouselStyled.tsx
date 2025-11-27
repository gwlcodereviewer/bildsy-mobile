import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ViewContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const CarouselContainer = styled.View`
  flex: 1;
  elevation: 9;
  background-color: white;
  height: ${rh(361)}px;
  width: ${rw(260)}px;
  margin-bottom: ${rh(30)}px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;
export const ProductImage = styled.Image`
  height: ${rh(220)}px;
`;
export const BottomElementsContainer = styled.View`
  margin-top: ${rh(20)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  margin-bottom: ${rh(20)}px;
`;
export const DescText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.primaryThemeColor};
`;
export const ProfileViewContainer = styled.View`
  margin-top: ${rh(11)}px;
  flex-direction: row;
`;
export const ProfileViewImage = styled.Image`
  height: ${rpx(32)}px;
  width: ${rpx(32)}px;
  border-radius: ${rpx(16)}px;
`;
export const ProfileDetailsContainer = styled.View`
  margin-left: ${rw(15)}px;
`;
export const ProfileName = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  text-transform: capitalize;
`;
export const AuthorName = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  width: ${rpx(170)}px;
`;
export const ProfileDate = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  margin-top: ${rh(3)}px;
`;

export const LoaderView = styled.View`
  width: 100%;
  height: ${rh(300)}px;
  align-items: center;
  justify-content: center;
`;
