import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../style/Dimen';
import {IVerticalMargin, IFontSize} from '../../style/types';

export const TransparentView = styled.View`
  background-color: ${colors.transparent};
  flex: 1;
  background-color: ${colors.modalBackground};
  position: relative;
`;

export const ViewContainer = styled.View`
  background-color: ${colors.white};
  margin-top: auto;
  margin-bottom: auto;
  margin-horizontal: ${rw(30)}px;
  border-radius: ${rpx(8)}px;
`;

export const ViewMain = styled.View`
  padding-horizontal: ${rw(25)}px;
  padding-vertical: ${rh(25)}px;
  align-items: flex-start;
`;

export const TextContainer = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(24)}px;
`;

export const OptionString = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  color: ${colors.black};
  font-size: ${rpx(17)}px;
  margin-top: ${rh(15)}px;
`;

export const CancelText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.primaryBlue};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(14)}px;
`;

interface backGroundColor {
  color: string;
  borderColor?: string;
}
export const AwardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${rpx(20)}px;
`;
export const AwardSubView = styled.TouchableOpacity<backGroundColor>`
  background-color: ${props => props.color};
  padding-vertical: ${rh(10)}px;
  padding-horizontal: ${rw(25)}px;
  border-width: ${rw(1)}px;
  border-color: ${props => (props.borderColor ? props.borderColor : colors.primaryBlue)};
  border-radius: ${rpx(4)}px;
  width: ${rw(120)}px;
`;
interface completeBox {
  color: string;
}
export const CompletedText = styled.Text<completeBox>`
  color: ${props => props.color};
  font-size: ${rpx(16)}px;
  font-family: ${FontFamily.oxygenBold};
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const CenterSubView = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
`;
