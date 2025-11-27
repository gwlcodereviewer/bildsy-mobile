import React, {useState, useEffect} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';
import {strings} from '../../constants/strings';
import pngImages from '../../assets/images/pngImages';
import {
  Container,
  Header,
  NormalText,
  LogoImage,
  BackButtonContainer,
  BottomContainer,
  BlogImage,
  BottomElementsContainer,
  CalendarImage,
  DateText,
  HeadingText,
  DateRowContainer,
  MainLoaderContainer,
  BlogDetail,
  TitleText,
  TitleDetails,
} from './styled';
import {INavigation} from '../../types';
import {NAV_BLOGS_SCREEN} from '../../navigation/navConstants';
import {blogDetail} from '../../redux/actions/auth';
import {showToastMessage} from '../../utils';
import colors from '../../style/colors';
import styles from '../../style/style';
import {IStore} from '../../redux/types';
import {localStrings} from '../../localization/localStrings';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  blogDetail: (id: number) => Promise<any>;
}

const myGlobal: any = global;

const BlogDetailScreen: React.FC<Props> = (props: Props) => {
  const {route, blogDetail: pBlogDetail} = props;
  const [res, setRes] = useState<any>();
  const [isAPIInProgress, setAPIInProgress] = useState<boolean>(false);

  const onPressPrevious = () => {
    myGlobal.tab = NAV_BLOGS_SCREEN;
    props.navigation?.navigate(localStrings.blogs);
  };

  useEffect(() => {
    setAPIInProgress(true);
    pBlogDetail(route?.params.id)
      .then((response: {Success: boolean; Message: string}) => {
        if (response.Success) {
          setRes(response);
          setAPIInProgress(false);
        } else {
          showToastMessage(strings.error, response.Message);
          setAPIInProgress(false);
        }
      })
      .catch((error: {Message: string}) => {
        showToastMessage(strings.error, error.Message);
        setAPIInProgress(false);
      });
    setAPIInProgress(false);
  }, [route?.params?.id]);

  if (isAPIInProgress) {
    return (
      <MainLoaderContainer>
        <ActivityIndicator size="large" color={colors.midnight} style={styles.activityIndicator} />
      </MainLoaderContainer>
    );
  }
  return (
    <>
      {!isAPIInProgress && (
        <Container source={pngImages.backgroundThemeImage} resizeMode="cover">
          <Header>
            <BackButtonContainer>
              <TouchableOpacity testID={strings.backIconButton} onPress={() => onPressPrevious()}>
                <LogoImage source={pngImages.backButtonIcon} />
              </TouchableOpacity>
            </BackButtonContainer>
            <NormalText>{strings.blogDetails}</NormalText>
          </Header>
          <BlogDetail>
            <BottomContainer>
              <BlogImage source={{uri: res?.Data?.DefaultPictureModel?.ImageUrl}} resizeMode="cover" />
              <BottomElementsContainer>
                <DateRowContainer>
                  <CalendarImage source={pngImages.blogCalender} resizeMode="cover" />
                  <DateText>{moment(res?.Data?.CreatedOn).format('LL')}</DateText>
                </DateRowContainer>
                <DateRowContainer>
                  <TitleText>{localStrings.by}</TitleText>
                  <TitleDetails>{res?.Data?.CreatedByName}</TitleDetails>
                </DateRowContainer>
                <HeadingText>{res?.Data?.Title}</HeadingText>
                <RenderHtml
                  contentWidth={100}
                  source={{
                    html: res?.Data?.Body,
                  }}
                  enableExperimentalMarginCollapsing={true}
                />
              </BottomElementsContainer>
            </BottomContainer>
          </BlogDetail>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  blogDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailScreen);
