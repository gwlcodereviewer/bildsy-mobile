import React, {useState, useEffect} from 'react';
import {ActivityIndicator, LogBox, TouchableOpacity, Linking, Platform, View} from 'react-native';
import ReadMore from 'react-native-read-more-text';
import moment from 'moment';
import {connect} from 'react-redux';
import {strings} from '../../../constants/strings';
import {IStoreBidList} from '../../../redux/types';
import colors from '../../../style/colors';
import {
  RowContainer,
  LogoImage,
  ListCheckView,
  BidTag,
  BidTagText,
  BottomCardContainer,
  ListContainerView2,
  ListContainerView,
} from '../../../style/index';
import {callGetBidsList, callProfessionalDetailById} from '../../../redux/actions/auth';
import {
  ControlContainer,
  InputFieldContainer,
  SpaceBetweenText,
  SpaceInList,
  DetailsText,
  DetailsTitle,
  CompanyDetails,
  ProName,
  CompanyCardView,
  DetailsTextContainer,
  CardDetailsContainer,
  ColumnContainer,
  ValueText,
  CompanyCardView2,
  NoBidsAvailable,
  NoBidsAvailableText,
  ShowMoreLessText,
  MainLoaderContainer,
} from './bidsStyled';
import {
  INavigation,
  BidsProfessionalsResponseType,
  IBidListRoot,
  InvitedProfessional,
  IBidsProfessionalsResponseTypeRoot,
  AvailableBid,
} from '../../../types';
import {showToastMessage, bidStatusArray, VALIDATION_REGEX} from '../../../utils';
import {localStrings} from '../../../localization/localStrings';
import styles from '../../../style/style';
import {BidTagRowContainer} from '../styled';
import Call from '../../../assets/svg/Call';
import Badge from '../../../assets/svg/Badge';
import ProfessionalsModelView from '../../../components/professionalsModalView';
import {NAV_BIDS_DETAIL} from '../../../navigation/navConstants';
import pngImages from '../../../assets/images/pngImages';
import {BID_STATUS_BID_AWARDED} from '../../../constants/utils/constantData';

interface Props {
  navigation?: INavigation;
  callGetBidsList: (param: number) => Promise<IBidListRoot>;
  callProfessionalDetailById: (param: number) => Promise<IBidsProfessionalsResponseTypeRoot>;
  route?: INavigation;
  id?: number;
  status?: string;
  bidsListResponse?: any;
  isApiInProgress: boolean;
  showNoBidsSectionProps?: boolean;
}
const Bids: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callGetBidsList: pCallGetBidsList,
    callProfessionalDetailById: pCallProfessionalDetailById,
    id,
    bidsListResponse,
    isApiInProgress,
    showNoBidsSectionProps,
  } = props;
  const {
    estimatedStartDate,
    estimatedCompletion,
    amount,
    company,
    contact,
    placedOn,
    descriptions,
    noBidsAvailable,
    blankDash,
  } = localStrings;

  const [showNoBidsSection, setShowNoBidsSection] = useState<boolean>(showNoBidsSectionProps || false);
  const [getProfessionalAPIInProg, setGetProfessionalAPIInProg] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [proData, setProData] = useState<BidsProfessionalsResponseType>();

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const renderTruncatedFooter = (handlePress: any) => (
    <ShowMoreLessText onPress={handlePress}>{localStrings.readMore}</ShowMoreLessText>
  );

  const renderRevealedFooter = (handlePress: any) => (
    <ShowMoreLessText onPress={handlePress}>{localStrings.readLess}</ShowMoreLessText>
  );

  useEffect(() => {
    if (bidsListResponse) {
      if (
        bidsListResponse?.Data?.AvailableBid.length === 0 &&
        bidsListResponse?.Data?.InvitedProfessionals.length === 0
      ) {
        setShowNoBidsSection(true);
      } else {
        setShowNoBidsSection(false);
      }
    }
  }, [bidsListResponse]);

  useEffect(() => {
    navigation?.addListener('focus', () => {
      getBidsList();
    });
    getBidsList();
  }, [id, navigation]);

  /**
   * Function for opening dialer.
   * @param mobileNumber mobile number given by professional.
   */
  const makeCall = (mobileNumber: string) => {
    let PhoneNumber = '';
    let theNumber = '';
    theNumber = mobileNumber.replace(VALIDATION_REGEX.phoneNumber, '');
    if (Platform.OS === 'android') {
      PhoneNumber = `tel:${theNumber}`;
    } else {
      PhoneNumber = `telprompt:${theNumber}`;
    }
    Linking.openURL(PhoneNumber);
  };
  /**
   * function for getting professionals list.
   */
  const getBidsList = () => {
    pCallGetBidsList(id || 0);
  };
  const onSelectBids = async (bidId: number, placedTimeInDay: string) => {
    navigation?.navigate(NAV_BIDS_DETAIL, {bidId, placedTimeInDay});
  };

  const handleTextReady = () => {};

  const changeToggleValue = () => {
    setToggle(!toggle);
  };

  const getProfessionalData = (res: {CustomerId: number; ProfessionalId: number}) => {
    setGetProfessionalAPIInProg(true);
    if (res.CustomerId) {
      pCallProfessionalDetailById(res.CustomerId)
        .then(response => {
          setGetProfessionalAPIInProg(false);
          setProData(response.Data);
          setToggle(!toggle);
        })
        .catch(error => {
          setGetProfessionalAPIInProg(false);
          showToastMessage(strings.error, error.message);
        });
    } else {
      pCallProfessionalDetailById(res.ProfessionalId)
        .then(response => {
          setGetProfessionalAPIInProg(false);
          setProData(response.Data);
          setToggle(!toggle);
        })
        .catch(error => {
          setGetProfessionalAPIInProg(false);
          showToastMessage(strings.error, error.message);
        });
    }
  };

  return (
    <ControlContainer>
      <ProfessionalsModelView data={proData} changeToggleValue={changeToggleValue} toggle={toggle} />
      {isApiInProgress ? (
        <MainLoaderContainer>
          <ActivityIndicator size="large" color={colors.primaryThemeColor} />
        </MainLoaderContainer>
      ) : (
        <>
          {showNoBidsSection ? (
            <NoBidsAvailable>
              <NoBidsAvailableText>{noBidsAvailable}</NoBidsAvailableText>
            </NoBidsAvailable>
          ) : (
            <>
              {bidsListResponse?.Data?.AvailableBid?.map((item: AvailableBid, idx: number) => {
                const bidsArray = item ? item.Status : BID_STATUS_BID_AWARDED;
                const {color} = bidStatusArray[bidsArray];
                const {statusColor} = bidStatusArray[bidsArray];
                const {statusValue} = bidStatusArray[bidsArray];
                return (
                  <InputFieldContainer key={idx}>
                    {statusValue === localStrings.bidDeclined ? (
                      <>
                        <ListContainerView2>
                          <ListCheckView marginBottom={0}>
                            <RowContainer>
                              <BidTagRowContainer>
                                <BidTag color={color}>
                                  <BidTagText statusColor={statusColor}>{statusValue}</BidTagText>
                                </BidTag>
                                {item.Phone !== undefined && item.Phone !== null ? (
                                  <TouchableOpacity onPress={() => makeCall(`${item.Phone}`)}>
                                    {<Call color={colors.primaryThemeColor} />}
                                  </TouchableOpacity>
                                ) : (
                                  <Call color={colors.disabledPrimaryTheme} />
                                )}
                              </BidTagRowContainer>
                            </RowContainer>
                          </ListCheckView>
                          <CompanyCardView>
                            <BidTagRowContainer>
                              <>
                                <LogoImage
                                  style={styles.companyLogo}
                                  source={item.CompanyLogo ? {uri: item.CompanyLogo} : pngImages.bitMapGroup6}
                                />
                                <CompanyDetails>
                                  <DetailsText numberOfLines={1}>{company}</DetailsText>
                                  <DetailsTitle numberOfLines={1} ellipsizeMode="tail">
                                    {item.CompanyName}
                                  </DetailsTitle>
                                </CompanyDetails>
                              </>
                              <Badge />
                            </BidTagRowContainer>
                          </CompanyCardView>
                          <SpaceInList marginTop={1} />
                          <CardDetailsContainer>
                            <DetailsTextContainer>
                              <ColumnContainer>
                                <BottomCardContainer>
                                  <TouchableOpacity
                                    onPress={() => {
                                      getProfessionalData(item);
                                    }}>
                                    <DetailsText numberOfLines={1} lineHeight={20}>
                                      {contact}
                                    </DetailsText>
                                    <ProName numberOfLines={1} ellipsizeMode="tail">
                                      {item.CustomerName}
                                    </ProName>
                                  </TouchableOpacity>
                                </BottomCardContainer>
                                <BottomCardContainer>
                                  <DetailsText>{placedOn}</DetailsText>
                                  <DetailsTitle>{blankDash}</DetailsTitle>
                                </BottomCardContainer>
                              </ColumnContainer>
                              <ColumnContainer>
                                <BottomCardContainer>
                                  <DetailsText>{amount}</DetailsText>
                                  <DetailsTitle>{blankDash}</DetailsTitle>
                                </BottomCardContainer>
                              </ColumnContainer>
                            </DetailsTextContainer>
                          </CardDetailsContainer>
                        </ListContainerView2>
                      </>
                    ) : (
                      <ListContainerView
                        onPress={() => {
                          onSelectBids(item.BidId, item.BidTimeInDays);
                        }}>
                        <ListCheckView marginBottom={0}>
                          <RowContainer>
                            <BidTagRowContainer>
                              <BidTag color={color}>
                                <BidTagText statusColor={statusColor}>{statusValue}</BidTagText>
                              </BidTag>
                              {item.Phone !== undefined && item.Phone !== null ? (
                                <TouchableOpacity onPress={() => makeCall(`${item.Phone}`)}>
                                  {<Call color={colors.primaryThemeColor} />}
                                </TouchableOpacity>
                              ) : (
                                <Call color={colors.disabledPrimaryTheme} />
                              )}
                            </BidTagRowContainer>
                          </RowContainer>
                        </ListCheckView>
                        <CompanyCardView>
                          <BidTagRowContainer>
                            <>
                              <LogoImage
                                style={styles.companyLogo}
                                source={item.CompanyLogo ? {uri: item.CompanyLogo} : pngImages.bitMapGroup6}
                              />
                              <CompanyDetails>
                                <DetailsText numberOfLines={1}>{company}</DetailsText>
                                <DetailsTitle numberOfLines={1} ellipsizeMode="tail">
                                  {item.CompanyName}
                                </DetailsTitle>
                              </CompanyDetails>
                            </>
                            <Badge />
                          </BidTagRowContainer>
                        </CompanyCardView>
                        <SpaceInList marginTop={1} />
                        <CardDetailsContainer>
                          <DetailsTextContainer>
                            <ColumnContainer>
                              <BottomCardContainer>
                                <TouchableOpacity
                                  onPress={() => {
                                    getProfessionalData(item);
                                  }}>
                                  <DetailsText>{contact}</DetailsText>
                                  <ProName numberOfLines={1} ellipsizeMode="tail">
                                    {item.CustomerName}
                                  </ProName>
                                </TouchableOpacity>
                              </BottomCardContainer>
                              <BottomCardContainer>
                                <DetailsText>{placedOn}</DetailsText>
                                <DetailsTitle>{item.BidTimeInDays}</DetailsTitle>
                              </BottomCardContainer>
                            </ColumnContainer>
                            <ColumnContainer>
                              <BottomCardContainer>
                                <DetailsText>{estimatedStartDate}</DetailsText>
                                <DetailsTitle>{moment(item.ProjectStartOnUTC).format('LL')}</DetailsTitle>
                              </BottomCardContainer>
                              <BottomCardContainer>
                                <DetailsText>{estimatedCompletion}</DetailsText>
                                <DetailsTitle>{moment(item.ProjectDeliveredOnUTC).format('LL')}</DetailsTitle>
                              </BottomCardContainer>
                            </ColumnContainer>
                            <ColumnContainer>
                              <BottomCardContainer>
                                <DetailsText>{amount}</DetailsText>
                                <DetailsTitle>{item.BidPrice}</DetailsTitle>
                              </BottomCardContainer>
                            </ColumnContainer>
                          </DetailsTextContainer>
                        </CardDetailsContainer>
                        <SpaceInList marginTop={1} />
                        <CardDetailsContainer>
                          <ColumnContainer>
                            <DetailsTextContainer>
                              <DetailsText>{descriptions}</DetailsText>
                              <ReadMore
                                numberOfLines={3}
                                renderTruncatedFooter={renderTruncatedFooter}
                                renderRevealedFooter={renderRevealedFooter}
                                onReady={handleTextReady}>
                                <ValueText>{item.ProposalDescription}</ValueText>
                              </ReadMore>
                            </DetailsTextContainer>
                          </ColumnContainer>
                        </CardDetailsContainer>
                      </ListContainerView>
                    )}
                    <SpaceBetweenText />
                  </InputFieldContainer>
                );
              })}
            </>
          )}
          {/* *********************Professional Cards********************* */}
          <>
            {bidsListResponse?.Data?.InvitedProfessionals.map((item: InvitedProfessional, idx: number) => {
              const color = colors.lightOrange;
              const statusColor = colors.darkOrange;
              const colorBidLost = colors.lightPink;
              const statusColorBidLost = colors.redArchive;

              return (
                <InputFieldContainer key={idx}>
                  <ListContainerView2>
                    <ListCheckView marginBottom={0}>
                      <RowContainer>
                        <BidTagRowContainer>
                          {item?.NoAvailableBidStatus !== strings.bidPending ? (
                            <BidTag color={colorBidLost}>
                              <BidTagText statusColor={statusColorBidLost}>
                                {item.NoAvailableBidStatus ? item.NoAvailableBidStatus : strings.bidPending}
                              </BidTagText>
                            </BidTag>
                          ) : (
                            <BidTag color={color}>
                              <BidTagText statusColor={statusColor}>
                                {item.NoAvailableBidStatus ? item.NoAvailableBidStatus : strings.bidPending}
                              </BidTagText>
                            </BidTag>
                          )}
                          {item.Phone !== undefined && item.Phone !== null ? (
                            <TouchableOpacity testID={strings.makeCallButton} onPress={() => makeCall(`${item.Phone}`)}>
                              {<Call color={colors.primaryThemeColor} />}
                            </TouchableOpacity>
                          ) : (
                            <Call color={colors.disabledPrimaryTheme} />
                          )}
                        </BidTagRowContainer>
                      </RowContainer>
                    </ListCheckView>
                    <CompanyCardView2>
                      <BidTagRowContainer>
                        <>
                          <LogoImage
                            style={styles.companyLogo}
                            source={item.CompanyLogo ? {uri: item.CompanyLogo} : pngImages.bitMapGroup6}
                          />
                          <CompanyDetails>
                            <DetailsText numberOfLines={1}>{company}</DetailsText>
                            <DetailsTitle>{item.CompanyName}</DetailsTitle>
                          </CompanyDetails>
                        </>
                        <Badge />
                      </BidTagRowContainer>
                    </CompanyCardView2>
                    <SpaceInList marginTop={1} />
                    <CardDetailsContainer>
                      <DetailsTextContainer>
                        <ColumnContainer>
                          <TouchableOpacity
                            testID={strings.getProfessionalDataBtn}
                            onPress={() => {
                              getProfessionalData(item);
                            }}>
                            <BottomCardContainer>
                              <DetailsText numberOfLines={1} lineHeight={20}>
                                {contact}
                              </DetailsText>
                              <ProName>{item.ProfessionalName}</ProName>
                            </BottomCardContainer>
                          </TouchableOpacity>
                          <BottomCardContainer>
                            <DetailsText>{placedOn}</DetailsText>
                            <DetailsTitle>{blankDash}</DetailsTitle>
                          </BottomCardContainer>
                        </ColumnContainer>
                        <ColumnContainer>
                          <BottomCardContainer>
                            <DetailsText>{amount}</DetailsText>
                            <DetailsTitle>{blankDash}</DetailsTitle>
                          </BottomCardContainer>
                        </ColumnContainer>
                      </DetailsTextContainer>
                    </CardDetailsContainer>
                    <SpaceInList marginTop={1} />
                    <CardDetailsContainer />
                  </ListContainerView2>
                  <SpaceBetweenText />
                </InputFieldContainer>
              );
            })}
          </>
        </>
      )}
    </ControlContainer>
  );
};

const mapStateToProps = (store: IStoreBidList) => ({
  bidsListResponse: store?.bids?.payload,
  isApiInProgress: store?.bids?.isApiInProgress,
});
const mapDispatchToProps = {
  callGetBidsList,
  callProfessionalDetailById,
};
export default connect(mapStateToProps, mapDispatchToProps)(Bids);
