import styled from 'styled-components/native';
import colors from '../../style/colors';
import {rh, rpx, rw} from '../../style/Dimen';

export const ContainerImage = styled.ImageBackground`
  background-color: ${colors.primaryThemeColor};
  flex: 1;
`;
export const Container = styled.View`
  flex: 1;
`;
export const TransparentView = styled.View`
  background-color: transparent;
  flex: 1;
`;
export const InLineView = styled.View`
  background-color: transparent;
`;
export const ScreenHolder = styled.View`
  background-color: white;
  height: ${rh(522)}px;
  border-top-left-radius: ${rh(33)}px;
  border-top-right-radius: ${rh(33)}px;
`;
export const ImageViewContainer = styled.View`
  position: absolute;
  top: ${rh(90)}px;
  align-self: center;
  align-items: center;
`;
export const ImageIL = styled.Image``;

export const HeadingText = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(22)}px;
  margin-top: ${rh(90)}px;
  font-family: 'Oxygen-Bold';
`;
export const DescText = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  margin-top: ${rh(10)}px;
  text-align: center;

  font-family: 'SourceSansPro-Regular';
`;
export const SkipText = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(18)}px;
  margin-left: ${rw(30)}px;
  text-align: center;
  font-family: 'Oxygen-Regular';
`;
export const NextText = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(18)}px;
  margin-right: ${rw(30)}px;
  text-align: center;
  font-family: 'Oxygen-Regular';
`;
export const BottomPanelContainer = styled.View`
  position: absolute;
  top: 90%;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;
export const ViewPageContainer = styled.View`
  background-color: transparent;
`;

export const PagerIndicator = styled.View`
  background-color: transparent;
  flex-direction: row;
`;
export const PagerIndicatorSelected = styled.View`
  background-color: #ed772f;
  height: 8px;
  width: 8px;
  border-radius: 4px;
  margin: 5px;
`;
export const PagerIndicatorNormal = styled.View`
  background-color: #828282;
  height: 8px;
  width: 8px;
  border-radius: 4px;
  margin: 5px;
`;
