import styled from 'styled-components/native';
import colors from '../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../style/Dimen';

export const PageTitleContainer = styled.View`
  flex-direction: row;
  height: ${rh(44)}px;
  background-color: transparent;
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  margin-top: ${rh(24)}px;
  margin-bottom: ${rh(10)}px;
  align-items: center;
`;
export const PageTitle = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(20)}px;
  font-weight: normal;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
`;
export const MainBody = styled.View`
  flex: 1;
  width: 100%;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  background-color: white;
  padding-left: ${rw(24)}px;
  padding-right: ${rw(24)}px;
  padding-top: ${rh(24)}px;
  padding-bottom: ${rh(24)}px;
`;
export const LabelTextContainer = styled.View`
  flex: 0.2;
  flex-wrap: wrap;
`;

export const LabelText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  height: ${rh(20)}px;
  letter-spacing: ${rpx(0)}px;
  line-height: ${rpx(20)}px;
  margin-bottom: ${rh(22)}px;
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
`;
export const TitleText = styled.Text`
  padding-bottom: ${rh(22)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  font-weight: 600;
`;
export const ButtonContainer = styled.View`
  position: absolute;
  bottom: ${rh(30)}px;
  align-self: center;
  width: 100%;
`;
export const RowContainer = styled.View`
  flex-direction: row;
`;
interface IButton {
  selected?: boolean;
}
export const ClickableText = styled.Text<IButton>`
  padding-bottom: ${rh(22)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${props => (props.selected ? colors.primaryThemeColor : colors.disableResend)};
  font-size: ${rpx(16)}px;
  font-weight: 800;
`;
