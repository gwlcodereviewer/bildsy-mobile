import styled from 'styled-components/native';
import colors from '../../style/colors';

import {rh, rpx, rw, FontFamily} from '../../style/Dimen';

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const InputFiledWrapper = styled.View`
  padding-top: ${rh(10)}px;
`;
export const DropDownWrapper = styled.View`
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(12)}px;
`;
export const AttachmentsNotFound = styled.Text`
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  font-family: ${FontFamily.oxygenRegular};
  padding-left: ${rw(20)}px;
  padding-bottom: ${rw(20)}px;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;
export const CenteredViewCheck = styled.View`
  flex: 1;
  padding-top: 30%;
  padding-bottom: 20%;
  align-items: center;
  margin-top: ${rh(22)}px;
  background-color: ${colors.modalBackground};
`;
export const ScrollViewContainer = styled.ScrollView`
  width: 100%;
`;
export const ModalView = styled.View`
  width: 90%;
  background-color: ${colors.white};
  border-radius: ${rpx(20)}px;
`;

/** Professional list user model */
export const ToggleWrapper = styled.TouchableOpacity``;

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

export const NameTextModal = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  align-self: center;
  font-size: ${rpx(20)}px;
  margin-vertical: ${rh(10)}px;
  text-transform: capitalize;
`;

export const AboutMeText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-size: ${rpx(18)}px;
`;

export const HorizontalView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubView = styled.View`
  margin-bottom: ${rh(8)}px;
  flex: 0.48;
`;

interface color {
  color?: string;
}

export const SmallText = styled.Text<color>`
  font-size: ${rpx(14)}px;
  color: ${props => props.color};
  margin-top: ${rh(5)}px;
`;

export const BadgeContainerProfile = styled.View`
  margin: ${rpx(5)}px;
  position: absolute;
  top: ${rh(110)}px;
  right: ${rw(118)}px;
`;

export const AssignTouchableOpacity = styled.TouchableOpacity`
  background-color: ${colors.midnightExpress};
  justify-content: center;
  margin-top: ${rh(14)}px;
`;

export const AssignText = styled.Text`
  color: ${colors.white};
  text-align: center;
  margin-vertical: ${rh(10)}px;
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(14)}px;
`;
