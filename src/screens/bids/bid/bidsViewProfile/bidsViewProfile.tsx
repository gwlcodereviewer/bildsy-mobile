/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect, useRef} from 'react';
import {Modal, ActivityIndicator, Animated, LogBox, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {connect} from 'react-redux';
import {strings} from '../../../../constants/strings';
import {IStore} from '../../../../redux/types';
import colors from '../../../../style/colors';
import {BottomCardContainer, MainLoaderContainer, PageTitle} from '../../../../style/index';
import {callBidsProfessionalDetail} from '../../../../redux/actions/auth';

import {
  ControlContainer,
  ProfileDescContainer,
  ProfileRowContainer,
  ProfileImage,
  ProfessionalName,
  ProposalText,
  ProposalDescText,
  ProfileMainContainer,
  RowContainer,
  DetailsText,
  DetailsTitle,
  DetailsTitleLong,
  PhoneRowContainer,
  ColumnContainer,
  ColumnDetailsContainer,
  ProfileImageDescContainer,
} from '../bidsStyled';
import {INavigation} from '../../../../types';
import {showToastMessage, makeCall} from '../../../../utils';
import {localStrings} from '../../../../localization/localStrings';
import {PageTitleContainer2, ProjectTitleSubContainer, ProjectContainer} from '../../styled';
import BackIcon from '../../../../assets/svg/BackIcon';
import pngImages from '../../../../assets/images/pngImages';
import Call from '../../../../assets/svg/Call';

interface Props {
  navigation?: INavigation;
  callBidsProfessionalDetail: (param: number) => Promise<any>;
  id?: number;
  status?: string;
  bidsProfessionalDetailResponseProps?: any;
  route?: INavigation;
}
const BidsViewProfile: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callBidsProfessionalDetail: _callBidsProfessionalDetail,
    id,
    bidsProfessionalDetailResponseProps,
    route,
  } = props;

  const [bidsProfessionalDetailResponse, setBidsProfessionalDetailResponse] = useState<any>(
    bidsProfessionalDetailResponseProps,
  );
  const [isGetBidsAPIInProgress, setIsGetBidsAPIInProgress] = useState<boolean>(false);
  const [bidsDetailResponse, setBidsDetailResponse] = useState<any>();

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {
    setBidsDetailResponse(route?.params?.data);
    getBidsProfessionalDetail(route?.params?.data?.BidId);
  }, [id]);
  /**
   * function for getting professionals list.
   * @param id project Id
   */
  const getBidsProfessionalDetail = (bidId: number) => {
    _callBidsProfessionalDetail(bidId)
      .then((res: any) => {
        if (res.Success) {
          setBidsProfessionalDetailResponse(res.Data);
        }
      })
      .catch((error: any) => {
        setIsGetBidsAPIInProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };

  const PageHeaderContainer = () => (
    <PageTitleContainer2>
      <TouchableOpacity
        onPress={() => {
          navigation?.goBack();
        }}>
        <BackIcon />
      </TouchableOpacity>
      <ProjectTitleSubContainer>
        <PageTitle>{localStrings.profile}</PageTitle>
      </ProjectTitleSubContainer>
    </PageTitleContainer2>
  );

  return (
    <ProjectContainer source={pngImages.backgroundThemeImage} resizeMode="cover">
      <PageHeaderContainer />
      <ControlContainer>
        {bidsProfessionalDetailResponse && (
          <>
            <ProfileRowContainer>
              <ProfileImage
                source={
                  bidsProfessionalDetailResponse.AvatarUrl
                    ? {uri: bidsProfessionalDetailResponse.AvatarUrl}
                    : pngImages.bitMapGroup6
                }
                resizeMode="cover"
              />
              <ProfileImageDescContainer>
                <ProfessionalName numberOfLines={1} ellipsizeMode="tail">
                  {bidsProfessionalDetailResponse.ProfessionalName}
                </ProfessionalName>
              </ProfileImageDescContainer>
            </ProfileRowContainer>
            <ProfileMainContainer>
              <ColumnDetailsContainer>
                <ProposalText>{localStrings.aboutMe}</ProposalText>
                <ProposalDescText>{bidsProfessionalDetailResponse.AboutMe}</ProposalDescText>
              </ColumnDetailsContainer>
              <RowContainer>
                <BottomCardContainer>
                  <DetailsText>{localStrings.companyName}</DetailsText>
                  <DetailsTitle numberOfLines={1} ellipsizeMode="tail">
                    {bidsProfessionalDetailResponse.CompanyName}
                  </DetailsTitle>
                </BottomCardContainer>
                <BottomCardContainer>
                  <DetailsText>{localStrings.memberSince}</DetailsText>
                  <DetailsTitle>{moment(bidsProfessionalDetailResponse.CustomerSince).format('LL')}</DetailsTitle>
                </BottomCardContainer>
              </RowContainer>
              <RowContainer>
                <BottomCardContainer>
                  <DetailsText>{localStrings.phone}</DetailsText>
                  <TouchableOpacity
                    testID={strings.makeCallButton}
                    onPress={() => {
                      makeCall(bidsProfessionalDetailResponse.Phone);
                    }}>
                    <PhoneRowContainer>
                      <Call color={colors.primaryThemeColor} />
                      <DetailsTitle>{bidsProfessionalDetailResponse.Phone}</DetailsTitle>
                    </PhoneRowContainer>
                  </TouchableOpacity>
                </BottomCardContainer>
              </RowContainer>
              <ColumnContainer>
                <BottomCardContainer>
                  <DetailsText>{localStrings.localAddress}</DetailsText>
                  <DetailsTitleLong numberOfLines={5} ellipsizeMode="tail">
                    {bidsProfessionalDetailResponse.StreetAddress}
                  </DetailsTitleLong>
                </BottomCardContainer>
              </ColumnContainer>
            </ProfileMainContainer>
          </>
        )}
      </ControlContainer>
    </ProjectContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callBidsProfessionalDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(BidsViewProfile);
