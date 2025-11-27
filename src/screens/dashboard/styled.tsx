import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';
import {IVerticalMargin} from '../../style/types';

export const DashBoardContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${colors.primaryThemeColor};
`;
export const HeaderPanel = styled.View`
  height: ${rh(65)}px;
`;
export const BottomContainer = styled.ScrollView`
  flex: 1;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  height: 100%;
`;
export const MainContainer = styled.View`
  border-radius: ${rpx(4)}px;
  margin-top: 10%;
  flex: 1;
  height: 100%;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
  elevation: 5;
  flex-direction: column;
`;
export const CreateProjectContainer = styled.View`
  flex-direction: row;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(10)}px;
  border-radius: ${rpx(4)}px;
`;
export const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
export const ImageContainerRight = styled.View`
  margin-top: -${rh(9)}px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;
export const FirstProjectText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.primaryThemeColor};
  font-size: ${rpx(20)}px;
  line-height: ${rpx(26)}px;
`;

export const CreateProjectText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  color: ${colors.primaryThemeColor};
  font-size: ${rpx(26)}px;
  line-height: ${rpx(26)}px;
  margin-top: ${rw(12)}px;
`;
export const ArrowImage = styled.Image`
  height: ${rpx(36)}px;
  width: ${rpx(36)}px;

  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(12)}px;
`;
export const IllustrationImage = styled.Image``;
export const RecentArticlePanel = styled.View<IVerticalMargin>`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => (props.marginTop ? rh(props.marginTop) : rh(30))}px;
  margin-bottom: ${rh(10)}px;
`;
export const RecentArticleText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(20)}px;
  color: ${colors.black};
`;
export const ViewAllText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  align-self: flex-end;
`;

export const AdvertiseView = styled.Text`
  background-color: ${colors.Grey_20};
  margin-top: ${rh(26)}px;
  margin-bottom: ${rh(26)}px;
  height: ${rpx(204)}px;
  border-radius: ${rpx(4)}px;
`;

export const BlogView = styled.Text`
  margin-bottom: ${rh(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(15)}px;
  line-height: ${rpx(20)}px;
`;
export const ProjectName = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(18)}px;
  line-height: ${rpx(24)}px;
  font-family: ${FontFamily.oxygenBold};
  margin-top: 2%;
  margin-bottom: 1%;
`;
export const ProjectListCardMainContainer = styled.View`
  padding-top: ${rh(20)}px;
  padding-bottom: ${rh(20)}px;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(10)}px;
  elevation: 5;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${rpx(4)}px;
`;
export const TextWrapper = styled.View`
  padding-top: 1%;
  padding-top: 1%;
`;
export const ProjectDetails = styled.Text<IVerticalMargin>`
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  letter-spacing: ${rpx(0)}px;
`;
export const ProjectMainContainer = styled.View`
  border-radius: ${rpx(4)}px;
  width: 100%;
  background-color: ${colors.white};
  height: 95%;
  border-radius: ${rpx(4)}px;
`;
export const ListContainer = styled.View`
  border-radius: ${rpx(4)}px;
  margin-top: 10%;
  flex: 1;
  height: 100%;
  background-color: ${colors.transparent};
  background: transparent;
  flex-direction: column;
  box-shadow: 5px 8px 10px rgba(0, 0, 0, 0.2);
`;
