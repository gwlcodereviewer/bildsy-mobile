import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

export const ViewContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const CarouselContainer = styled.TouchableOpacity`
  elevation: 9;
  background-color: ${colors.white};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: ${rh(22)}px;
  height: auto;
`;
export const ProductImage = styled.Image`
  width: 100%;
  height: ${rh(200)}px;
  border-radius: ${rpx(4)}px;
`;

export const ProfileImage = styled.Image`
  height: ${rpx(92)}px;
  width: ${rpx(92)}px;
  border-radius: ${rpx(46)}px;
  border-width: ${rpx(5)}px;
  margin-top: ${rh(0)}px;
  border-color: ${colors.profileRadius};
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

export const ReadMoreLink = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.orange};
  text-transform: capitalize;
  line-height: ${rpx(20)}px;
  margin-top: ${rw(0)}px;
`;
export const ProfileDate = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  margin-top: ${rh(3)}px;
`;
export const HeadingText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(18)}px;
  color: ${colors.primaryThemeColor};
  line-height: ${rpx(24)}px;
  margin-bottom: ${rh(3)}px;
`;
export const LoaderView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;
