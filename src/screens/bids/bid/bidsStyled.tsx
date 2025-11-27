import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../../style/Dimen';
import {IVerticalMargin, IFontSize} from '../../../style/types';

const screenHeight = Dimensions.get('window').height;
export const ControlContainer = styled.ScrollView`
  background-color: ${colors.white};
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  flex: 1;
  flex-grow: 1;
`;
export const ToggleWrapper = styled.TouchableOpacity``;
export const Image = styled.Image`
  height: ${rh(30)}px;
  width: ${rw(30)}px;
  border-radius: ${rpx(50)}px;
`;

export const PhoneRowContainer = styled.View`
  flex-direction: row;
  margin-left: ${rw(-3)}px;
`;

export const ListContainerView = styled.View`
  margin-top: ${rh(20)}px;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(3)}px;
  border-color: ${colors.wild_Sand};
`;
export const InputFieldContainer = styled.View`
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
`;
export const SpaceBetweenText = styled.View`
  margin-top: ${rh(10)}px;
`;

export const SpaceInList = styled.View<IVerticalMargin>`
  margin-top: ${props => (props.marginTop ? rh(props.marginTop) : rh(10))}px;
  height: ${rh(5)}px;
  background-color: ${colors.wild_Sand};
`;
export const CompanyDetails = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: ${rh(10)}px;
  padding-right: ${rh(10)}px;
  flex: 1;
`;
export const DetailsText = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.grey};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
`;
export const FullRowText = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.grey};
  flex-wrap: wrap;
  width: 100%;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
`;
export const DetailsTitle = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
`;

export const ProName = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  flex-wrap: wrap;
  width: ${rw(150)}px;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
  padding-right: ${rw(10)}px;
  text-transform: capitalize;
`;
export const ShowMoreLessText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  font-weight: 600;
  margin-top: ${rh(5)}px;
`;

export const CompanyContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const ValueText = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  width: 100%;
  line-height: ${props => (props.lineHeight ? rpx(props.lineHeight) : rpx(18))}px;
`;
export const MainLoaderContainer = styled.View`
  height: ${rh(screenHeight - 250)}px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const DetailsSubContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
`;
export const CompanyCardView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${rh(12)}px;
  padding-bottom: ${rh(12)}px;
  padding-right: ${rw(14)}px;
  padding-left: ${rw(14)}px;
`;
export const CompanyCardView2 = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${rh(12)}px;
  padding-bottom: ${rh(12)}px;
  padding-right: ${rw(14)}px;
  padding-left: ${rw(14)}px;
`;
export const DetailsTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
export const DetailsTextContainer2 = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const CardDetailsContainer = styled.View`
  padding-right: ${rw(14)}px;
  padding-left: ${rw(14)}px;
  flex-direction: row;
`;
export const ColumnContainer = styled.View`
  flex-direction: row;
  flex: 1;
  width: 100%;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;
export const ProfileRowContainer = styled.View`
  flex-direction: column;
  margin-top: ${rh(10)}px;
  margin-left: ${rw(10)}px;
  margin-right: ${rw(10)}px;
  align-items: center;
  justify-content: center;
`;
export const ProfileDescContainer = styled.View`
  flex-direction: column;
  margin-left: ${rw(10)}px;
`;
export const ProfileMainContainer = styled.View`
  flex-direction: column;
  margin: ${rw(20)}px;
`;
export const ProfileImage = styled.Image`
  height: ${rpx(92)}px;
  width: ${rpx(92)}px;
  border-radius: ${rpx(46)}px;
  border-width: ${rpx(5)}px;
  margin-top: ${rh(0)}px;
  border-color: ${colors.profileRadius};
`;
export const TypeText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  line-height: 20px;
  margin-top: ${rh(10)}px;
  height: ${rh(20)}px;
`;

export const ProfileName = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(16)}px;
  color: ${colors.primaryThemeColor};
  margin-top: ${rw(8)}px;
  height: ${rh(20)}px;
  text-align: center;
`;

export const ProfessionalName = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(16)}px;
  color: ${colors.primaryThemeColor};
  margin-top: ${rw(8)}px;
  line-height: ${rh(20)}px;
  text-align: center;
  text-transform: capitalize;
`;
export const TimeText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  line-height: 20px;
  margin-top: ${rh(8)}px;
  height: ${rh(20)}px;
`;
export const ViewProfileText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  color: ${colors.tangoOrange};
  line-height: 20px;
  margin-top: ${rh(8)}px;
  height: ${rh(20)}px;
  width: 100%;
  text-align: center;
`;

export const ProposalText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  font-size: ${rpx(16)}px;
  color: ${colors.black};
  line-height: 20px;
  margin-top: ${rh(8)}px;
  height: ${rh(20)}px;
`;
export const ProposalDescText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  line-height: 18px;
  margin-top: ${rh(8)}px;
  height: auto;
`;
export const DetailsTitleLong = styled.Text<IFontSize>`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${props => (props.fontSize ? rpx(props.fontSize) : rpx(14))}px;
  color: ${colors.black};
  padding-right: ${rw(20)}px;
  height: auto;
  flex-wrap: wrap;
  width: 100%;
`;
export const TransparentView = styled.View`
  background-color: ${colors.transparent};
  flex: 1;
  background-color: ${colors.modalBackground};
`;

export const ViewContainer = styled.View`
  background-color: ${colors.white};
  margin-top: auto;
  margin-bottom: auto;
  margin-horizontal: ${rpx(30)}px;
  border-radius: ${rpx(8)}px;
`;

export const ViewMain = styled.View`
  padding-horizontal: ${rpx(25)}px;
  padding-vertical: ${rpx(30)}px;
  align-items: flex-start;
`;

export const TextContainer = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-weight: bold;
  text-align: center;
  font-size: ${rpx(22)}px;
`;

export const OptionString = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  color: ${colors.black};
  text-align: center;
  font-size: ${rpx(16)}px;
  margin-top: ${rh(10)}px;
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
  margin: 20px;
`;
export const AwardSubView = styled.TouchableOpacity<backGroundColor>`
  background-color: ${props => props.color};
  padding-vertical: ${rh(13)}px;
  padding-horizontal: ${rpx(25)}px;
  border-width: 1px;
  border-color: ${colors.primaryThemeColor};
  border-radius: ${rpx(4)}px;
  width: ${rpx(120)}px;
`;
interface completeBox {
  color: string;
}
export const CompletedText = styled.Text<completeBox>`
  color: ${props => props.color};
  font-size: ${rpx(14)}px;
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
export const NoBidsAvailable = styled.View`
  height: ${rh(screenHeight - 250)}px;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
`;
export const NoBidsAvailableText = styled.Text`
  font-family: ${FontFamily.oxygenBold};
  font-size: ${rpx(20)}px;
`;
export const ColumnDetailsContainer = styled.View`
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
`;
export const ProfileImageDescContainer = styled.View`
  padding-horizontal: ${rw(10)}px;
`;
