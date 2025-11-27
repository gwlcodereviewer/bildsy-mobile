import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';

const commonLineHeight = rpx(24);

export const ViewContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;
export const ViewSubContainer = styled.View``;
export const MainContent = styled.View`
  flex: 1;
`;
export const MainContainer = styled.View`
  margin-top: ${rh(20)}px;
  justify-content: center;
  width: 100%;
`;
export const MainCardContainer = styled.View`
  flex: 1;
  width: 100%;
  height: ${rh(350)}px;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(20)}px;
  padding-left: ${rw(0.5)}px;
  padding-right: ${rw(0.5)}px;
`;
export const ImageContainer = styled.View`
  flex: 1;
  elevation: 9;
  height: ${rh(200)}px;
  background-color: ${colors.white};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;
export const AdvertiseText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(20)}px;
  color: ${colors.black};
`;
export const CardImage = styled.Image`
  width: 100%;
  height: ${rh(200)}px;
  border-width: ${rpx(1)}px;
  border-color: transparent;
  border-radius: ${rpx(4)}px;
`;
export const OverImageTextContainer = styled.View`
  position: absolute;
  top: ${rh(160)}px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.primaryThemeColor};
  height: ${rh(40)}px;
  opacity: 0.7;
  justify-content: center;
`;
export const OverImageText = styled.Text`
  color: ${colors.white};
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.sourceSansProSemiBold};
  line-height: ${rpx(24)}px;
  align-items: center;
`;
export const CardBottomContainer = styled.View`
  background-color: ${colors.white};
  flex: 1;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
  border-width: ${rpx(1)}px;
  border-color: transparent;
  border-radius: ${rpx(4)}px;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
  height: ${rh(55)}px;
  padding-top: ${rh(2)}px;
  padding-bottom: ${rh(3)}px;
`;
export const CardTitle = styled.Text`
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.primaryThemeColor};
  line-height: ${commonLineHeight}px;
`;

export const BottomButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(10)}px;
  align-items: center;
`;
export const LinkText = styled.Text`
  color: ${colors.tangoOrange};
  text-decoration: underline;
  text-decoration-color: ${colors.tangoOrange};
  font-size: ${rpx(16)}px;
  line-height: ${commonLineHeight}px;
`;
export const ButtonContainer = styled.View`
  background: ${colors.primaryThemeColor};
  padding-top: ${rh(4)}px;
  padding-bottom: ${rh(4)}px;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  border-width: ${rpx(1)}px;
  border-color: transparent;
  border-radius: ${rpx(4)}px;
`;
export const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${rpx(16)}px;
  line-height: ${commonLineHeight}px;
`;
export const OtherTypeAdsContainer = styled.View`
  flex: 1;
  width: 100%;
  border-width: ${rpx(1)}px;
  border-color: transparent;
  border-radius: ${rpx(4)}px;
  justify-content: center;
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(10)}px;
  height: ${rh(185)}px;
`;
export const SecondAdsSubContainer = styled.View`
  flex-direction: row;
  height: ${rh(165)}px;
  border-color: transparent;
  border-radius: ${rpx(4)}px;
  background-color: ${colors.white};
  elevation: 9;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
`;
export const SideImageCardContainer = styled.View`
  width: 35%;
  flex: 1;
  height: 100%;
`;
export const SideCardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-color: transparent;
  border-top-left-radius: ${rpx(4)}px;
  border-bottom-left-radius: ${rpx(4)}px;
`;
export const SideTextContainer = styled.View`
  width: 65%;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(15)}px;
  padding-left: ${rw(10)}px;
  padding-right: ${rw(10)}px;
`;
export const SideTitleText = styled.Text`
  font-size: ${rpx(16)}px;
  padding-bottom: ${rh(15)}px;
  font-family: ${FontFamily.sourceSansProSemiBold};
  color: ${colors.primaryThemeColor};
`;
export const SideButtonContainer = styled.View`
  padding-top: ${rh(15)}px;
`;
export const PaddingContainer = styled.View`
  padding-top: ${rh(20)}px;
  padding-bottom: ${rh(20)}px;
  padding-left: ${rw(14)}px;
  padding-right: ${rw(14)}px;
`;
export const ButtonBottomContainer = styled.View`
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  border-width: ${rpx(1)}px;
  border-color: transparent;
  border-radius: ${rpx(4)}px;
  bottom: ${rh(1)}px;
  position: absolute;
  width: 100%;
`;
export const HeaderModalView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const CrossIconContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-content: flex-end;
  justify-content: flex-end;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  padding-top: ${rh(10)}px;
`;
export const MainModalSubContainer = styled.View`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
`;
