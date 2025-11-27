import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../style/colors';
import {rh, rpx, rw, FontFamily} from '../../../style/Dimen';
import {IHorizontalMargin, IVerticalMargin, IFontSize} from '../../../style/types';

const screenHeight = Dimensions.get('window').height;
export const ControlContainer = styled.ScrollView`
  background-color: ${colors.white};
  margin-top: ${rh(11)}px;
  border-top-left-radius: ${rpx(33)}px;
  border-top-right-radius: ${rpx(33)}px;
  flex: 1;
  flex-grow: 1;
`;
export const InputFieldContainer = styled.View`
  padding-left: ${rw(20)}px;
  padding-right: ${rw(20)}px;
  padding-top: ${rh(20)}px;
`;
export const SpaceBetweenText = styled.View`
  margin-top: ${rh(10)}px;
`;

export const CompanyLogoImage = styled.Image`
  height: ${rh(40)}px;
  width: ${rw(40)}px;
  border-radius: ${rpx(50)}px;
`;
export const SpaceInList = styled.View<IVerticalMargin>`
  margin-top: ${props => (props.marginTop ? rh(props.marginTop) : rh(10))}px;
  height: ${rh(5)}px;
  background-color: ${colors.wild_Sand};
`;
export const ConfirmContainerView = styled.View`
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(3)}px;
  border-color: ${colors.wild_Sand};
  width: 100%;
`;
export const ProjectDetailText = styled.Text`
  font-family: ${FontFamily.oxygenRegular};
  color: ${colors.black};
  font-size: ${rpx(18)}px;
`;
export const ListConfirmContainerView = styled.View`
  margin-top: ${rh(10)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const TypeAnsList = styled.Text<IHorizontalMargin>`
  font-family: ${FontFamily.sourceSansProRegular};
  margin-left: ${props => (props.marginLeft ? props.marginLeft : rw(0))}px;
  margin-right: ${props => (props.marginRight ? props.marginRight : rw(0))}px;
  color: ${colors.grey};
  font-size: ${rpx(14)}px;
  margin-top: ${rh(3)}px;
  text-align: left;
  flex-wrap: wrap;
  flex: 1;
`;
export const ProjectDetailView = styled.View`
  margin-top: ${rh(20)}px;
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const DescriptionText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  color: ${colors.grey};
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  font-size: ${rpx(14)}px;
  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(5)}px;
  background-color: ${colors.transparent};
`;
export const ProfessionalDetailView = styled.View`
  background-color: ${colors.alabaster};
`;
export const ProfessionalDetailText = styled.Text`
  font-family: ${FontFamily.sourceSansProSemiBold};
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  text-align: right;
  background-color: ${colors.transparent};
`;
export const CompanyDetails = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: ${rh(10)}px;
  padding-right: ${rh(10)}px;
  flex: 1;
`;
export const BottomCardContainer = styled.View`
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  text-transform: capitalize;
`;
export const ToggleWrapper = styled.TouchableOpacity``;

export const ProfileImage = styled.Image`
  height: ${rh(30)}px;
  width: ${rw(30)}px;
  border-radius: ${rpx(50)}px;
`;

export const ProfessionalContainer = styled.View``;
export const CompanyContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const AttachmentListContainer = styled.TouchableOpacity`
  margin-left: ${rw(20)}px;
  margin-right: ${rw(20)}px;
  margin-top: ${rh(20)}px;
  justify-content: center;
`;
export const AttachmentList = styled.View`
  width: 100%;
  border-color: ${colors.skipColor};
  align-content: center;
  align-items: center;
  height: ${rh(30)}px;
  flex-direction: row;
  flex-wrap: wrap;
`;
export const AttachmentName = styled.Text`
  color: ${colors.black};
  padding-right: ${rw(5)}px;
  line-height: ${rpx(20)}px;
  flex: 1;
`;
export const AttachmentImageContainer = styled.View`
  align-items: flex-start;
  padding-right: ${rw(5)}px;
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
export const BidTagContainer = styled.View`
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  flex-direction: row;
`;
export const ShowMoreLessText = styled.Text`
  color: ${colors.tangoOrange};
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  font-weight: 600;
  margin-top: ${rh(5)}px;
`;

export const TouchableContainer = styled.TouchableOpacity``;
export const NoProjectAvailable = styled.View`
  background-color: ${colors.athens_Gray};
  padding-top: ${rh(10)}px;
  padding-bottom: ${rh(10)}px;
  margin-top: ${rh(10)}px;
  margin-bottom: ${rh(10)}px;
`;
export const NoProjectAvailableText = styled.Text`
  font-family: ${FontFamily.sourceSansProRegular};
  font-size: ${rpx(16)}px;
  font-weight: 600;
  color: ${colors.black};
  text-align: center;
`;
