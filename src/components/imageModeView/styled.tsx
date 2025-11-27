import styled from 'styled-components/native';
import colors from '../../style/colors';

import {rh, rpx, rw, FontFamily} from '../../style/Dimen';

export const ParentViewContainer = styled.View`
  background-color: ${colors.white};
  margin-top: auto;
  margin-bottom: auto;
  margin-horizontal: ${rpx(20)}px;
  padding-horizontal: ${rpx(25)}px;
  padding-vertical: ${rpx(20)}px;
  border-radius: ${rpx(20)}px;
  border-color: ${colors.Grey_20};
  border-width: ${rpx(2)}px;
`;

export const HeaderModalView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const TextModalView = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  align-self: center;
  font-size: ${rpx(18)}px;
`;

export const ImageContainer = styled.Image`
  width: ${rw(90)}px;
  height: ${rh(90)}px;
  border-radius: ${rpx(50)}px;
  align-self: center;
  margin-top: ${rh(20)}px;
  border-width: ${rpx(5)}px;
  border-color: ${colors.Grey_10};
`;

export const ImageViewContainer = styled.Image`
  width: ${rw(250)}px;
  height: ${rh(250)}px;
  align-self: center;
  margin-top: ${rh(20)}px;
  border-width: ${rpx(1)}px;
  border-color: ${colors.Grey_10};
`;

export const TransparentView = styled.View`
  flex: 1;
  background-color: rgba(3, 3, 3, 0.2);
`;
