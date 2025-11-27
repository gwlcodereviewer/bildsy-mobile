import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Dimensions, ActivityIndicator, Modal} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {
  MainCardContainer,
  MainContainer,
  ImageContainer,
  CardImage,
  OverImageTextContainer,
  OverImageText,
  CardBottomContainer,
  CardTitleContainer,
  CardTitle,
  ButtonContainer,
  LinkText,
  BottomButtonContainer,
  ButtonText,
  OtherTypeAdsContainer,
  SecondAdsSubContainer,
  SideImageCardContainer,
  SideCardImage,
  SideTextContainer,
  SideTitleText,
  MainContent,
  SideButtonContainer,
  ViewContainer,
  ViewSubContainer,
  PaddingContainer,
  ButtonBottomContainer,
  HeaderModalView,
  CrossIconContainer,
  MainModalSubContainer,
} from './advertiseStyle';
import {showToastMessage} from '../../utils';
import {callDashboardAdsAPI, callGetAdsProfessionalDetail, callAdsLead} from '../../redux/actions/auth';
import {IStore} from '../../redux/types';
import {strings} from '../../constants/strings';
import styles from '../../style/style';
import ProfessionalsModelView from '../../components/professionalsModalView';
import colors from '../../style/colors';
import {ModalMainContainer, ModalSubContainer} from '../../style';
import {TouchableContainer} from '../bids/styled';
import {rpx} from '../../style/Dimen';
import {INavigation} from '../../style/types';
import {AdsProfessionals} from '../../types';

interface Props {
  navigation?: INavigation;
  callDashboardAdsAPI: () => Promise<any>;
  callGetAdsProfessionalDetail: (param: number) => Promise<any>;
  callAdsLead: (param: number) => Promise<any>;
}
interface AdsData {
  WebsiteUrl: string;
  ButtonText?: string;
  ButtonTypeId?: number;
  Id: number;
  Description?: string;
}
const AdvertiseList: React.FC<Props> = (props: Props) => {
  const {
    callDashboardAdsAPI: _callDashboardAdsAPI,
    callGetAdsProfessionalDetail: _callGetAdsProfessionalDetail,
    callAdsLead: _callAdsLead,
    navigation,
  } = props;
  const isFocused = useIsFocused();
  const myGlobal: any = global;
  const [adsDataList, setAdsDataList] = useState([]);
  const [isAdsAvailable, setIsAdsAvailable] = useState(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const sliderWidth = Dimensions.get('window').width;
  const [toggle, setToggle] = useState<boolean>(false);
  const [adsData, setAdsData] = useState<AdsProfessionals>();
  const [getProfessionalAPIInProg, setGetProfessionalAPIInProg] = useState<boolean>(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (isFocused) {
      _callDashboardAdsAPI()
        .then(async res => {
          if (res.Data && res.Success) {
            setAdsDataList(res.Data);
            if (res.Data.length > 0) {
              setIsAdsAvailable(true);
            } else {
              setIsAdsAvailable(false);
            }
          }
        })
        .catch(error => {});
    }
  }, [isFocused]);

  const adsLeadCount = (addId: number) => {
    console.log(addId);
    _callAdsLead(addId)
      .then(res => {
        if (res.Success) {
          setGetProfessionalAPIInProg(false);
        }
      })
      .catch(error => {
        setGetProfessionalAPIInProg(false);
      });
  };

  const changeToggleValue = () => {
    setToggle(!toggle);
  };
  const CloseIcon = () => <Icon name="close" size={rpx(24)} color={colors.black} />;
  const getProfessionalData = (addId: number) => {
    setGetProfessionalAPIInProg(true);
    console.log(addId);
    _callGetAdsProfessionalDetail(addId)
      .then(res => {
        if (res.Success) {
          adsLeadCount(addId);
          setGetProfessionalAPIInProg(false);
          setAdsData(res.Data);
          setToggle(!toggle);
        }
        setGetProfessionalAPIInProg(false);
      })
      .catch(error => {
        setGetProfessionalAPIInProg(false);
        showToastMessage(strings.error, error.message);
      });
  };
  const Buttons = (data: AdsData) => (
    <BottomButtonContainer>
      <TouchableOpacity
        onPress={() =>
          InAppBrowser.open(data.WebsiteUrl, {
            dismissButtonStyle: 'cancel',
          })
        }>
        <LinkText>{strings.visitUs}</LinkText>
      </TouchableOpacity>
      <ButtonContainer>
        <TouchableOpacity
          onPress={() => {
            getProfessionalData(data.Id);
          }}>
          <ButtonText>
            {!getProfessionalAPIInProg && (data.ButtonTypeId === 1 ? strings.hireMe : strings.contactMe)}
            {getProfessionalAPIInProg && (
              <ActivityIndicator size="small" color={colors.white} style={styles.hireMeActivityIndicator} />
            )}
          </ButtonText>
        </TouchableOpacity>
      </ButtonContainer>
    </BottomButtonContainer>
  );

  /**
   * Description modal
   */
  const DescriptionModal = () => (
    <Modal animationType="slide" transparent={true} visible={showDescriptionModal}>
      <ModalMainContainer>
        <MainModalSubContainer>
          <ModalSubContainer>
            <HeaderModalView>
              <CrossIconContainer>
                <TouchableOpacity
                  onPress={() => {
                    setShowDescriptionModal(false);
                  }}>
                  <CloseIcon />
                </TouchableOpacity>
              </CrossIconContainer>
            </HeaderModalView>
            <PaddingContainer>
              <CardTitle>{description}</CardTitle>
            </PaddingContainer>
          </ModalSubContainer>
        </MainModalSubContainer>
      </ModalMainContainer>
    </Modal>
  );
  /**
   * Card view
   * @param item contain all data.
   * @param index of a node.
   */
  const AdvertiseListCard = (item: any, index: number) => {
    const data = item;

    return (
      <MainContent>
        <ProfessionalsModelView data={adsData} changeToggleValue={changeToggleValue} toggle={toggle} />
        {DescriptionModal()}

        {data.WebTemplateId === 1 || data.WebTemplateId === 2 ? (
          <>
            <MainCardContainer>
              <ImageContainer>
                <TouchableContainer
                  onPress={async () => {
                    setDescription(item.Description);
                    setShowDescriptionModal(true);
                  }}>
                  <CardImage source={{uri: data.AdImageURL}} />
                  <OverImageTextContainer>
                    <OverImageText numberOfLines={1} ellipsizeMode="tail">
                      {data.Headline}
                    </OverImageText>
                  </OverImageTextContainer>
                  <CardBottomContainer>
                    <CardTitleContainer>
                      <CardTitle numberOfLines={2} ellipsizeMode="tail">
                        {data.Description}
                      </CardTitle>
                    </CardTitleContainer>
                  </CardBottomContainer>
                </TouchableContainer>

                <ButtonBottomContainer>
                  <Buttons {...data} />
                </ButtonBottomContainer>
              </ImageContainer>
            </MainCardContainer>
          </>
        ) : (
          <OtherTypeAdsContainer>
            <SecondAdsSubContainer>
              <SideImageCardContainer>
                <SideCardImage source={{uri: data.AdImageURL}} />
              </SideImageCardContainer>
              <SideTextContainer>
                <TouchableOpacity
                  onPress={async () => {
                    setDescription(item.Description);
                    setShowDescriptionModal(true);
                  }}>
                  <SideTitleText numberOfLines={1} ellipsizeMode="tail">
                    {data.Headline}
                  </SideTitleText>
                  <CardTitleContainer>
                    <CardTitle numberOfLines={2} ellipsizeMode="tail">
                      {data.Description}
                    </CardTitle>
                  </CardTitleContainer>
                </TouchableOpacity>
                <SideButtonContainer>
                  <Buttons {...data} />
                </SideButtonContainer>
              </SideTextContainer>
            </SecondAdsSubContainer>
          </OtherTypeAdsContainer>
        )}
      </MainContent>
    );
  };

  return (
    <ViewContainer>
      {isAdsAvailable && (
        <ViewSubContainer>
          <MainContainer>
            <Carousel
              layout={'default'}
              data={adsDataList}
              sliderWidth={sliderWidth - 50}
              itemWidth={sliderWidth - 50}
              renderItem={({item, index}: any) => AdvertiseListCard(item, index)}
              onSnapToItem={index => setActiveSlide(index)}
              autoplay={false}
            />
          </MainContainer>
          <Pagination
            dotsLength={adsDataList.length}
            activeDotIndex={activeSlide}
            dotStyle={styles.pagerDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </ViewSubContainer>
      )}
    </ViewContainer>
  );
};
const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});

const mapDispatchToProps = {
  callDashboardAdsAPI,
  callGetAdsProfessionalDetail,
  callAdsLead,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdvertiseList);
