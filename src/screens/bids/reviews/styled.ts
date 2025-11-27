import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {FontFamily, rh, rpx, rw} from '../../../style/Dimen';
import {IBackGroundColor} from '../../../style/types';
import {IButton} from '../../../types';

const screenHeight = Dimensions.get('window').height;
const {white, gray, primaryThemeColor, redDark, redLight, grey, skipColor, disabledPrimaryTheme, tangoOrange} = colors;

export const Container = styled.View`
  flex: 1;
  background-color: ${white};
  margin-horizontal: ${rw(15)}px;
`;

export const SubContainer = styled.ScrollView`
  flex: 1;
`;

export const RatingsContainer = styled.View`
  margin-top: ${rh(21)}px;
  align-items: center;
  flex-direction: row;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(25)}px;
`;

export const DateText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  font-weight: 400;
  line-height: ${rh(20)}px;
  margin-left: ${rw(10)}px;
`;

export const ReviewContainer = styled.View`
  margin-top: ${rh(18)}px;
  flex: 1;
`;

export const DescriptionText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  font-weight: 400;
  line-height: ${rh(24)}px;
`;

export const ImageContainer = styled.ScrollView`
  flex-direction: row;
  padding-vertical: ${rpx(15)}px;
  flex: 1;
`;

export const ImageList = styled.View`
  flex: 1;
`;

export const AttachedImage = styled.Image`
  width: ${rpx(110)}px;
  height: ${rpx(110)}px;
  margin-right: ${rpx(8)}px;
`;

export const MainContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(10)}px;
  justify-content: flex-end;
  flex: 1;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
`;

export const UserProfileImage = styled.Image`
  height: ${rpx(29.63)}px;
  width: ${rw(29.63)}px;
  border-radius: ${rpx(25)}px;
  background-color: ${primaryThemeColor};
  margin-horizontal: ${rw(15)}px;
`;

export const CommentContainer = styled.View`
  width: ${rw(261)}px;
  border-width: ${rw(0.2)}px;
  border-color: ${grey};
  border-radius: ${rpx(5)}px;
`;

export const UserName = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  font-weight: 400;
  line-height: ${rh(24)}px;
  padding-vertical: ${rh(10)}px;
  padding-horizontal: ${rh(10)}px;
  flex: 1;
`;

export const CommentText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: 400;
  line-height: ${rh(22)}px;
  padding-bottom: ${rh(10)}px;
  padding-horizontal: ${rh(10)}px;
`;

export const TimeText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(14)}px;
  font-weight: 400;
  line-height: ${rh(17.68)}px;
  padding-bottom: ${rh(10)}px;
  padding-horizontal: ${rh(10)}px;
  text-align: right;
  color: ${gray};
`;

export const ButtonSubContainer = styled.View`
  height: ${rh(44)}px;
  background-color: ${white};
  border-color: ${skipColor};
  border-radius: ${rpx(4)}px;
  margin-top: ${rh(10)}px;
`;

export const SubmitButton = styled.TouchableOpacity<IButton>`
  background-color: ${props => (props.selected ? primaryThemeColor : disabledPrimaryTheme)};
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

export const Divider = styled.View`
  margin-vertical: ${rh(10)}px;
  background-color: ${gray};
  height: ${rh(1)}px;
`;

export const MainSubContainer = styled.View`
  border-radius: ${rpx(4)}px;
  elevation: 2;
  box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${rpx(4)}px;
  background-color: white;
`;

export const BodyContainer = styled.ImageBackground`
  flex: 1;
  background-color: ${white};
`;

export const InputFieldContainer = styled.View`
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export const ScreenNoContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const UnderlineText = styled.Text`
  color: ${tangoOrange};
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(16)}px;
  font-weight: normal;
  text-decoration: underline;
  text-decoration-color: ${tangoOrange};
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

export const SpaceBetweenText = styled.View`
  margin-top: ${rh(10)}px;
`;

export const AddText = styled.TouchableOpacity``;

export const PROContainer = styled.View`
  flex-direction: row;
  margin-top: ${rh(10)}px;
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const TouchableIcon = styled.View`
  align-items: flex-end;
  margin-top: ${rh(10)}px;
`;

export const MoreContainer = styled.TouchableOpacity``;

export const TransparentView = styled.View`
  background-color: ${colors.transparent};
  flex: 1;
  background-color: ${colors.modalBackground};
`;

export const ViewContainer = styled.View`
  background-color: ${colors.white};
  margin-top: auto;
  margin-bottom: auto;
  margin-horizontal: ${rpx(39)}px;
  border-radius: ${rpx(8)}px;
`;

export const TextContainer = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(18)}px;
`;

export const ViewMain = styled.View`
  padding-horizontal: ${rpx(25)}px;
  padding-vertical: ${rpx(30)}px;
`;

export const OptionString = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  text-align: center;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(10)}px;
`;

export const AwardContainer = styled.View`
  flex-direction: row;
`;

export const AwardSubView = styled.TouchableOpacity<IBackGroundColor>`
  background-color: ${props => props.color};
  width: 50%;
  padding-vertical: ${rh(13)}px;
  border-color: ${colors.gray_shadow};
  border-top-width: ${rh(1)}px;
  align-items: center;
`;

export const CenterSubView = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
`;

export const CancelText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.Dusty_Gray};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(14)}px;
`;

export const CompletedText = styled.Text`
  color: ${white};
  font-size: ${rpx(14)}px;
  font-family: ${FontFamily.oxygenBold};
  text-align: center;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const MainLoaderContainer = styled.View`
  height: ${rh(screenHeight - 250)}px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const BidTagContainer = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  flex-direction: row;
`;

export const ReportTag = styled.View`
  flex-direction: row;
  background-color: ${redLight};
  color: ${white};
  border-radius: ${rpx(20)}px;
  align-self: flex-start;
  height: ${rh(28)}px;
  margin-top: ${rh(10)}px;
  padding-horizontal: ${rw(15)}px;
  margin-right: ${rh(5)}px;
`;

export const BidTagText = styled.Text`
  color: ${redDark};
  border-radius: ${rpx(20)}px;
  margin: auto;
  font-family: ${FontFamily.sourceSansProSemiBold};
`;
