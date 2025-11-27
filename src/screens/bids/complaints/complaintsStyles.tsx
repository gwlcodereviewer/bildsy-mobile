import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../../style/Dimen';

export const ControlContainer = styled.ScrollView`
  flex: 1;
  display: flex;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
`;
export const InputFieldContainer = styled.View`
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const ToggleWrapper = styled.TouchableOpacity``;

export const ProfileImage = styled.Image`
  height: ${rh(30)}px;
  width: ${rw(30)}px;
  border-radius: ${rpx(15)}px;
`;
export const TextTitleContainer = styled.View`
  padding-top: ${rh(20)}px;
  padding-bottom: ${rh(20)}px;
`;
export const TextTitle = styled.Text`
  font-size: ${rpx(18)}px;
  color: ${colors.primaryThemeColor};
  font-family: ${FontFamily.oxygenBold};
`;
export const ScreenNoContentContainer = styled.View`
  flex: 1;
  padding-bottom: 30%;
  align-items: center;
  justify-content: center;
`;
export const ScreenMainContainer = styled.View`
  flex: 1;
  padding-bottom: 30%;
`;
export const UnderlineText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: normal;
  text-decoration: underline;
  text-decoration-color: ${colors.tangoOrange};
  padding-horizontal: ${rw(4)}px;
`;
export const NormalText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: normal;
  color: ${colors.black};
  padding-top: ${rh(5)}px;
  padding-bottom: ${rh(5)}px;
`;
export const AddIconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  bottom: ${rh(0)}px;
`;
