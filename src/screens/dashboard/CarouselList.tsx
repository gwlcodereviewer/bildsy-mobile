import {ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {
  BottomElementsContainer,
  CarouselContainer,
  ProductImage,
  DescText,
  ProfileViewContainer,
  ProfileViewImage,
  ProfileDetailsContainer,
  ProfileName,
  AuthorName,
  ProfileDate,
  LoaderView,
  ViewContainer,
} from './carouselStyled';
import {callFeaturedArticlesAPI} from '../../redux/actions/auth';
import {IStore} from '../../redux/types';
import {IDashboardFeatureArticles, INavigation} from '../../style/types';
import {showToastMessage} from '../../utils';
import colors from '../../style/colors';
import {NAV_BLOG_DETAILS} from '../../navigation/navConstants';
import {strings} from '../../constants/strings';

interface Props {
  callFeaturedArticlesAPI: () => Promise<any>;
  navigation?: INavigation;
}

const CarousalList: React.FC<Props> = (props: Props) => {
  const myGlobal: any = global;
  const {callFeaturedArticlesAPI: _callFeaturedArticlesAPI, navigation} = props;
  const [items, setItems] = useState<IDashboardFeatureArticles[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);

  useEffect(() => {
    setIsAPIinProgress(true);
    _callFeaturedArticlesAPI()
      .then(res => {
        if (res.Data && res.Success) {
          setIsAPIinProgress(false);
          setItems(res.Data.BlogPost);
        }
        if (!res.Success && res.Message) {
          setIsAPIinProgress(false);
          showToastMessage(res.Message, '');
        }
      })
      .catch(error => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error.Message);
      });
  }, [myGlobal.tab]);

  const renderItem = (item: any, index: number) => {
    const data = item;
    return (
      <CarouselContainer>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate(NAV_BLOG_DETAILS, {id: item.Id});
          }}>
          <ProductImage source={{uri: data.DefaultPictureModel.ImageUrl}} resizeMode="cover" />
          <BottomElementsContainer>
            <DescText numberOfLines={1} ellipsizeMode="tail">
              {data?.Title && `${data?.Title}`}
            </DescText>
            <ProfileViewContainer>
              <ProfileViewImage source={{uri: data.CustomerAvatar}} resizeMode="cover" />
              <ProfileDetailsContainer>
                <ProfileName>By- {data.CreatedByName}</ProfileName>
                <ProfileDate>{data.CreatedByValue}</ProfileDate>
                <AuthorName numberOfLines={1} ellipsizeMode="tail">
                  {data?.CompanyName && `Author at ${data?.CompanyName}`}
                </AuthorName>
              </ProfileDetailsContainer>
            </ProfileViewContainer>
          </BottomElementsContainer>
        </TouchableOpacity>
      </CarouselContainer>
    );
  };
  return (
    <ViewContainer>
      <Carousel
        layout={'default'}
        // ref={ref => (this.carousel = ref)}
        data={items}
        sliderWidth={50}
        itemWidth={280}
        renderItem={({item, index}: any) => renderItem(item, index)}
        onSnapToItem={index => setActiveIndex(index)}
      />
      {isAPIinProgress && (
        <LoaderView>
          <ActivityIndicator size="small" color={colors.primaryThemeColor} />
        </LoaderView>
      )}
    </ViewContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});

const mapDispatchToProps = {
  callFeaturedArticlesAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(CarousalList);
