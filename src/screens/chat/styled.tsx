import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';
import {IInputToolbarView} from '../../style/types';

export const TouchableItem = styled.TouchableOpacity;
export const ChatImage = styled.Image`
  margin-top: ${rh(2)}px;
  height: ${rh(60)}px;
  width: ${rw(100)}px;
`;
export const ChatView = styled.View`
  align-items: center;
  padding: ${rh(10)}px;
`;

export const PageTitle = styled.Text`
  color: ${colors.white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(20)}px;
  font-weight: normal;
  padding-left: ${rw(15)}px;
  padding-right: ${rw(15)}px;
`;
export const InputToolbarView = styled.View<IInputToolbarView>`
  align-items: center;
  position: ${props => (props.position ? props.position : 'absolute')};
  bottom: ${props => (props.bottom ? rh(props.bottom) : rh(0))}px;
  background-color: white;
  left: ${rh(-10)}px;
  right: ${rh(5)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: ${rh(8)}px;
  padding-horizontal: ${rh(5)}px;
`;
