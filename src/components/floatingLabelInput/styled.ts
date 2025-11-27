import styled from 'styled-components/native';
import colors from '../../style/colors';
import {rh, rpx, rw} from '../../style/Dimen';
import {IInputHeader, IInputText} from './types';

type IContainerSize = {
  flex?: number;
};

export const InputContainer = styled.View<IContainerSize>`
  margin-vertical: ${rh(6)}px;
`;

export const InputWrapper = styled.View<IInputText>`
  border-width: ${rw(1)}px;
  background-color: ${props => (props.borderColor ? props.backgroundColor : colors.white)};
  height: ${props => (props.multiline === true ? `${rh(110)}px` : `${rh(50)}px`)};

  width: ${props => (props.width ? `${rw(props.width)}px` : '100%')};
  border: ${colors.skipColor};
  border-radius: ${rpx(4)}px;
`;

export const SimpleLabel = styled.Text`
  position: absolute;
  background-color: transparent;
  left: ${rw(5)}px;
  font-size: ${rpx(16)}px;
  color: ${colors.Grey_80};
  bottom: ${rh(10)}px;
`;

export const ErrorText = styled.Text`
  font-size: ${rpx(14)}px;
  color: ${colors.sunsetOrange};
  margin-top: ${rh(5)}px;
`;

export const InputHeader = styled.Text<IInputHeader>`
  font-size: ${rpx(16)}px;
  line-height: ${rh(40)}px;
  color: ${props => (props.color ? props.color : colors.Grey_80)};
  font-weight: 500;
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(8)}px;
`;

export const SimpleView = styled.View``;

export const Required = styled.Text`
  font-size: ${rpx(16)}px;
  line-height: ${rh(20)}px;
  color: ${colors.sunsetOrange};
  font-weight: 500;
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(8)}px;
`;
