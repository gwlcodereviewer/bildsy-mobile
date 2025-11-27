import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {rh, rpx, FontFamily} from '../../../style/Dimen';

export const CardsViewContainer = styled.View`
  flex: 1;
  height: 100%;
`;
export const CardView = styled.TouchableOpacity`
  border-radius: ${rpx(4)}px;
  background-color: ${colors.white};
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
  elevation: 5;
  flex-direction: column;
  padding: ${rpx(16)}px;
  margin-top: ${rh(8)}px;
  margin-bottom: ${rh(8)}px;
`;
export const TitleText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  padding-top: ${rh(3)}px;
  padding-bottom: ${rh(3)}px;
  color: ${colors.black};
`;
export const NormalDescriptionsText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.black};
  padding-top: ${rh(3)}px;
  padding-bottom: ${rh(3)}px;
`;
export const DateContainer = styled.View`
  padding-top: ${rh(3)}px;
  padding-bottom: ${rh(3)}px;
`;
export const DateText = styled.Text`
  width: 100%;
  text-align: right;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
`;
