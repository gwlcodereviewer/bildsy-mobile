import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';
import {IInputText} from '../floatingLabelInput/types';

export const InputText = styled.TextInput<IInputText>`
  width: 100%;
  font-size: ${rpx(16)}px;
  color: ${props => (props.color ? props.color : colors.black)};
  padding-horizontal: ${props => (props.isBottomBorderOnly ? rw(5) : rw(14))}px;
  flex: ${props => (props.isRightIcon ? 0.9 : 1)};
  font-family: ${FontFamily.oxygenRegular};
`;

type multiline = {
  multiline: boolean;
};
export const InputSubContainer = styled.View<multiline>`
  flex-direction: row;
  align-items: center;
  height: ${props => (props.multiline === true ? rh(90) : rh(50))}px;
`;

export const RightIconView = styled.TouchableOpacity`
  position: absolute;
  top: ${rh(14)}px;
  right: ${rw(10)}px;
  flex: 0.1;
`;

export const RightIconImage = styled.Image`
  width: ${rw(20)}px;
  height: ${rh(20)}px;
`;

export const LeftIconView = styled(Pressable)`
  left: ${rw(16)}px;
  justify-content: center;
  margin-right: ${rw(10)}px;
`;

export const RightButton = styled(Pressable)`
  justify-content: center;
  margin-bottom: ${rh(8)}px;
  margin-right: ${rw(8)}px;
`;

export const SmallBorderButton = styled(Pressable)`
  border-radius: ${rpx(8)}px;
  border-width: ${rw(1)}px;
  border-style: solid;
  justify-content: center;
  padding-left: ${rw(29)}px;
  padding-right: ${rw(29)}px;
  padding-top: ${rh(9)}px;
  padding-bottom: ${rh(9)}px;
  align-self: flex-end;
  margin-bottom: ${rh(3)}px;
  margin-left: auto;
`;

export const SmallText = styled.Text`
  font-size: ${rpx(12)}px;
  line-height: ${rh(17)}px;
`;
