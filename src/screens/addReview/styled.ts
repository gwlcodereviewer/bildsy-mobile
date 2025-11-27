import styled from 'styled-components/native';
import colors from '../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../style/Dimen';
import {IButton} from '../../types';
import {isIOS} from '../../utils';

const {white, skipColor, midnight, black, tangoOrange, disabledPrimaryTheme, primaryThemeColor, transparent} = colors;

export const Container = styled.View`
  flex: 1;
  background-color: ${white};
  margin-horizontal: ${rw(15)}px;
`;

export const SubContainer = styled.ScrollView`
  flex: 1;
`;

export const RatingsContainer = styled.View`
  margin-top: ${rh(15)}px;
  align-items: center;
  flex-direction: row;
  margin-left: ${rw(10)}px;
`;

export const ReviewContainer = styled.View`
  height: ${rh(250)}px;
`;

export const ImageContainer = styled.ScrollView`
  flex-direction: row;
  flex: 1;
`;

export const ImageList = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: ${rh(10)}px;
`;

export const AttachedImage = styled.Image`
  width: ${rpx(110)}px;
  height: ${rpx(110)}px;
  margin-right: ${rpx(12)}px;
`;

export const ButtonSubContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${white};
  border-color: ${skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
`;

export const SubmitButton = styled.TouchableOpacity<IButton>`
  background-color: ${props => (props.selected ? tangoOrange : disabledPrimaryTheme)};
  color: ${white};
  border-radius: ${rpx(4)}px;
  height: ${rpx(44)}px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
`;

export const InputFieldWrapper = styled.View`
  padding-top: ${rh(20)}px;
  margin-bottom: ${rh(5)}px;
`;

export const BodyContainer = styled.View`
  flex: 1;
  background-color: ${white};
  padding-bottom: ${rh(40)}px;
`;

export const RatingText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: 700;
  line-height: ${rh(20.2)}px;
  margin-top: ${rh(15)}px;
`;

export const PictureText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: 700;
  line-height: ${rh(20.2)}px;
  margin-top: ${rh(15)}px;
  margin-bottom: ${rh(15)}px;
`;

export const BaseText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: 400;
  line-height: ${rh(20.2)}px;
  margin-top: ${rh(15)}px;
`;

export const SkipBtnView = styled.TouchableOpacity`
  height: ${rh(44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${rpx(4)}px;
  border-width: ${rpx(1)}px;
  border-color: ${midnight};
`;

export const CancelText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${black};
  font-size: ${rpx(16)}px;
`;

export const AddImageContainer = styled.TouchableOpacity`
  height: ${rpx(70)}px;
`;

export const MainAddContainer = styled.View`
  width: ${rw(100)}px;
`;

export const AddImageViewContainer = styled.Image`
  width: ${rpx(100)}px;
  height: ${rpx(60)}px;
`;

export const CloseContainer = styled.TouchableOpacity`
  position: absolute;
  margin-top: ${rh(-8)}px;
  margin-left: ${isIOS() ? rw(96) : rw(90)}px;
`;

export const HeaderContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${primaryThemeColor};
`;

export const Header = styled.View`
  background-color: ${transparent};
  margin-top: ${rh(20)}px;
  height: ${rh(27)}px;
  width: ${rw(327)}px;
  margin-left: ${rw(24)}px;
  flex-direction: row;
  margin-bottom: ${rh(20)}px;
`;

export const BackButtonContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${transparent};
  padding-right: ${rw(24)}px;
  margin-top: ${rh(5)}px;
`;

export const NormalText = styled.Text`
  color: ${white};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${20}px;
  font-weight: normal;
  height: ${rh(35)}px;
  width: ${rh(133)}px;
`;

export const HeaderBackSection = styled.TouchableOpacity``;
