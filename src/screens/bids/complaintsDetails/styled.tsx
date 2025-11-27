import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../../style/Dimen';
import {IFontSize} from '../../../style/types';

const screenHeight = Dimensions.get('window').height;
export const MainContainer = styled.ScrollView`
  flex: 1;
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  background-color: ${colors.white};
`;
export const ControlContainer = styled.View`
  flex: 1;
  display: flex;
`;
export const InputFieldContainer = styled.View`
  flex-direction: column;
  height: 100%;
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
export const CardsViewContainer = styled.View`
  elevation: 5;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
`;
export const CardView = styled.View`
  background-color: ${colors.white};
  border-radius: ${rpx(4)}px;
  margin-left: ${rw(5)}px;
  margin-right: ${rw(5)}px;
  elevation: 6;
  margin-top: ${rh(20)}px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.7);
  shadow-offset: {
    width: ${rh(0)}px;
    height: ${rh(3)}px;
  }
  shadow-radius: ${rh(4.65)}px;
  flex-direction: column;
  padding: ${rpx(16)}px;
`;
export const TitleText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  line-height: ${rpx(24)}px;
  padding-left: ${rw(16)}px;
  padding-right: ${rw(16)}px;
  color: ${colors.black};
`;
export const ValueText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
  padding-top: ${rh(3)}px;
  padding-bottom: ${rh(3)}px;
  flex: 0.48;
  text-align: right;
`;
export const DateContainer = styled.View`
  padding-top: ${rh(3)}px;
  padding-bottom: ${rh(3)}px;
`;
export const DateText = styled.Text`
  width: 100%;
  text-align: right;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
`;
export const TopBackContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;
export const CardRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${rh(3)}px;
  padding-bottom: ${rh(3)}px;
`;
interface flexSize {
  flex?: number;
}
export const CardTitleText = styled.Text<flexSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  color: ${colors.black};
  flex: ${props => (props.flex ? props.flex : 0.48)};
`;
interface horizontalPadding {
  paddingBottom?: number;
}
export const CardHeaderTitle = styled.Text<horizontalPadding>`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  line-height: ${rpx(24)}px;
  color: ${colors.black};
  padding-bottom: ${props => (props.paddingBottom ? rh(props.paddingBottom) : rh(10))}px;
`;
export const DetailsTitleRaisedAgain = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
  text-transform: capitalize;
`;
export const CustomerName = styled.Text<horizontalPadding>`
  font-family: ${FontFamily.oxygenRegular};
  font-size: ${rpx(18)}px;
  line-height: ${rpx(24)}px;
  color: ${colors.black};
  padding-bottom: ${props => (props.paddingBottom ? rh(props.paddingBottom) : rh(10))}px;
  text-transform: capitalize;
`;

export const DescriptionText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(3)}px;
`;
export const AddAttachmentView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
export const ReplyContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-top: ${rh(14)}px;
  padding-bottom: ${rh(20)}px;
`;
export const TextInputContainer = styled.View`
  width: 100%;
  align-items: flex-start;
`;
export const InputView = styled.TextInput`
  height: ${rh(50)}px;
  width: ${rw(210)}px;
  background-color: ${colors.transparent};
`;
export const InputContainer = styled.View`
  align-items: center;
  border-color: ${colors.primaryThemeColor};
  border-radius: ${rpx(40)}px;
  border-width: ${rpx(1)}px;
  flex-direction: row;
  padding-left: ${rw(16)}px;
  padding-right: ${rw(16)}px;
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
export const IconContainer = styled.View`
  padding-left: ${rw(10)}px;
  padding-right: ${rw(10)}px;
`;
export const ButtonContainer = styled.View`
  align-self: center;
  width: 100%;
`;
export const PendingContainer = styled.View`
  padding-top: ${rh(14)}px;
  padding-bottom: ${rh(14)}px;
`;
export const ConversationTagSection = styled.View`
  padding-top: ${rh(14)}px;
  padding-bottom: ${rh(14)}px;
  background-color: ${colors.gray_shadow};
  padding-left: ${rw(14)}px;
  padding-right: ${rw(14)}px;
`;
export const ConversationTag = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(20)}px;
  line-height: ${rpx(24)}px;
  color: ${colors.black};
  opacity: 1;
`;
export const ConversationDateText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
  padding-bottom: ${rh(3)}px;
`;
export const ConversationText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(20)}px;
  color: ${colors.black};
`;
export const SelectedImageContainer = styled.View`
  background-color: ${colors.lightGray};
`;
export const MainLoaderContainer = styled.View`
  height: ${rh(screenHeight - 250)}px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const AttachmentTouchable = styled.TouchableOpacity`
  flex: 1;
  border-color: ${colors.skipColor};
  align-content: center;
  align-items: center;
  height: ${rh(30)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;
