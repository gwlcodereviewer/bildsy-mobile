import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Keyboard, KeyboardAvoidingView, LogBox, Modal, TouchableWithoutFeedback} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import pngImages from '../../../assets/images/pngImages';
import CalendarIcon from '../../../assets/svg/CalendarIcon';
import MoreIcon from '../../../assets/svg/MoreIcon';
import FloatingLabelInput from '../../../components/floatingLabelInput';
import {strings} from '../../../constants/strings';
import {TODAY, YESTERDAY} from '../../../constants/utils/constantData';
import {ASYNC_CONST} from '../../../helpers/constants';
import {localStrings} from '../../../localization/localStrings';
import {NAV_ADD_REVIEW_SCREEN} from '../../../navigation/navConstants';
import {callAddReviewComment, callGetProReview, callReportConversation} from '../../../redux/actions/review';
import {ICommentConversation, ICommentRequest, IReviewResponse, IStore} from '../../../redux/types';
import colors from '../../../style/colors';
import styles from '../../../style/style';
import {INavigation} from '../../../types';
import {isIOS, VALIDATION_REGEX} from '../../../utils';
import {
  AddText,
  AttachedImage,
  AwardContainer,
  AwardSubView,
  BidTagContainer,
  BidTagText,
  BodyContainer,
  ButtonSubContainer,
  ButtonText,
  CancelText,
  CenterSubView,
  CommentContainer,
  CommentText,
  CompletedText,
  Container,
  DateContainer,
  DateText,
  DescriptionText,
  Divider,
  HeaderContainer,
  ImageContainer,
  ImageList,
  InputFieldContainer,
  InputFieldWrapper,
  MainContainer,
  MainLoaderContainer,
  MainSubContainer,
  MoreContainer,
  NormalText,
  OptionString,
  PROContainer,
  ProfileContainer,
  RatingsContainer,
  ReportTag,
  ReviewContainer,
  ScreenNoContentContainer,
  SpaceBetweenText,
  SubContainer,
  SubmitButton,
  TextContainer,
  TimeText,
  TouchableIcon,
  TransparentView,
  UnderlineText,
  UserName,
  UserProfileImage,
  ViewContainer,
  ViewMain,
} from './styled';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  id?: number;
  callGetProReview: (params: number) => Promise<IReviewResponse>;
  reviewResponse?: IReviewResponse;
  isAPIinProgress?: boolean;
  isApiDone?: boolean;
  isListAPIinProgress?: boolean;
  callAddReviewComment: (params: ICommentRequest) => Promise<IReviewResponse>;
  callReportConversation: (params: ICommentConversation) => Promise<IReviewResponse>;
}

const Reviews = (props: Props) => {
  const {
    id,
    navigation,
    callGetProReview: _callGetProReview,
    reviewResponse,
    isAPIinProgress,
    isApiDone,
    callReportConversation: _callReportConversation,
    isListAPIinProgress,
    callAddReviewComment: _callAddReviewComment,
  } = props;
  const {primaryThemeColor, white} = colors;
  const {submit, addComment, addNewReviewButton, submitBtn} = strings;
  const {youHaveNoReview, addAReview, reported, reportChat, cancel, yes, reportComment} = localStrings;
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [isReviewAdded, setIsReviewAdded] = useState<boolean>(false);
  const [commentReport, setCommentReport] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<number>(0);
  const [sendReportModal, setSendReportModal] = useState<boolean>(false);
  const [reportValue, setReportValue] = useState<string>('');
  const [isReportDisable, setIsReportDisable] = useState<boolean>(true);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      _callGetProReview(id || 0);
    });
    if (id) {
      _callGetProReview(id || 0);
    }
    return unsubscribe;
  }, [navigation, id]);

  useEffect(() => {
    if (reviewResponse?.Success && reviewResponse?.Data?.Id !== 0) {
      setIsReviewAdded(true);
    } else {
      setIsReviewAdded(false);
    }
  }, [reviewResponse]);

  useEffect(() => {
    if (isApiDone) {
      setComment('');
      _callGetProReview(id || 0);
    }
  }, [isApiDone]);

  const onsubmit = async () => {
    const loggedUserInfo = await AsyncStorage.getItem(ASYNC_CONST.loggedInUserInfo);
    const userData = JSON.parse(loggedUserInfo || '');
    const reqParams = {
      ratingId: reviewResponse?.Data?.Id || 0,
      description: comment,
      customerId: userData?.customerId,
    };
    _callAddReviewComment(reqParams);
    setComment('');
    _callGetProReview(id || 0);
    setIsButtonDisable(true);
  };

  const onsubmitReport = () => {
    const reqParams = {
      conversationId: conversationId || 0,
      reportedCommentDescription: reportValue,
      isReportedComment: true,
    };
    _callReportConversation(reqParams);
    setReportValue('');
    setSendReportModal(false);
    _callGetProReview(id || 0);
  };
  /**
   * Function to validate the comment
   */
  const onChangeDescription = (text: string) => {
    if (text !== '') {
      const description = text !== '' ? text.trim() : text;
      if (description === '' && comment === '') {
        setComment('');
        setIsButtonDisable(true);
      } else {
        setComment(text);
        setIsButtonDisable(false);
      }
    } else {
      setComment('');
      setIsButtonDisable(true);
    }
  };

  const onChangeComment = (text: string) => {
    setIsReportDisable(true);
    if (text === ' ') {
      setReportValue('');
      setIsReportDisable(true);
    } else if (text) {
      setReportValue(text);
      setIsReportDisable(false);
    } else {
      setReportValue('');
      setIsReportDisable(true);
    }
  };
  /**
   * Function to Render the HO review section
   */
  const ReviewSection = () => (
    <ReviewContainer>
      <DescriptionText>{reviewResponse?.Data?.Description}</DescriptionText>
      <ImageContainer horizontal={true} showsHorizontalScrollIndicator={false}>
        {reviewResponse?.Data?.PostedFiles?.map((item, index) => (
          <ImageList key={index}>
            <AttachedImage source={{uri: item?.FilePath}} />
          </ImageList>
        ))}
      </ImageContainer>
    </ReviewContainer>
  );

  const ShowAlertModal = () => (
    <Modal transparent={true} visible={commentReport}>
      <TransparentView>
        <ViewContainer>
          <ViewMain>
            <TextContainer>{reportComment}</TextContainer>
            <OptionString>{reportChat}</OptionString>
          </ViewMain>
          <AwardContainer>
            <AwardSubView color={colors.white} onPress={() => setCommentReport(false)}>
              <CenterSubView>
                <CancelText>{cancel}</CancelText>
              </CenterSubView>
            </AwardSubView>
            <AwardSubView
              color={colors.primaryBlue}
              onPress={() => {
                setCommentReport(false);
                setSendReportModal(true);
              }}>
              <CompletedText>{yes}</CompletedText>
            </AwardSubView>
          </AwardContainer>
        </ViewContainer>
      </TransparentView>
    </Modal>
  );

  const getShowReportModal = () => (
    <Modal transparent={true} visible={sendReportModal}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TransparentView>
          <ViewContainer>
            <ViewMain>
              <TextContainer>{reportComment}</TextContainer>
              <InputFieldWrapper>
                <FloatingLabelInput
                  label={addComment}
                  inputValue={reportValue}
                  onChangeText={(text: string) => {
                    onChangeComment(text);
                  }}
                  numberOfLines={10}
                  multiline={true}
                />
              </InputFieldWrapper>
            </ViewMain>
            <AwardContainer>
              <AwardSubView
                color={colors.white}
                onPress={() => {
                  setSendReportModal(false);
                  setReportValue('');
                }}>
                <CenterSubView>
                  <CancelText>{cancel}</CancelText>
                </CenterSubView>
              </AwardSubView>
              <AwardSubView
                color={isReportDisable ? colors.disabledPrimaryTheme : colors.primaryBlue}
                onPress={() => {
                  onsubmitReport();
                }}
                disabled={isReportDisable}>
                <CompletedText>{submit}</CompletedText>
              </AwardSubView>
            </AwardContainer>
          </ViewContainer>
        </TransparentView>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const getRightConversationView = item => {
    if (item?.IsReportedComment) {
      return (
        <BidTagContainer>
          <ReportTag>
            <Ionicons name="information-circle-outline" style={styles.errorInfoIcon} />
            <BidTagText>{reported}</BidTagText>
          </ReportTag>
        </BidTagContainer>
      );
    }
    return (
      <TouchableIcon>
        <MoreContainer
          onPress={() => {
            setConversationId(item?.ConversationId);
            setCommentReport(true);
          }}>
          <MoreIcon />
        </MoreContainer>
      </TouchableIcon>
    );
  };

  /**
   * Function to convert time and date
   */
  const getTimeValue = item => {
    const initialMonth = moment(new Date(item?.CreatedDateUtc));
    const currentMonth = moment(new Date());
    const dateValue = moment(item?.CreatedDateUtc).format('L');
    const dateValueNext = moment(new Date()).format('L');
    if (dateValue === dateValueNext) {
      return TODAY;
    }
    if (initialMonth.month() === currentMonth.month()) {
      if (initialMonth.date() === currentMonth.date() - 1) {
        return YESTERDAY;
      }
      return moment(item?.CreatedDateUtc).startOf('hour').fromNow();
    }
    return moment(item?.CreatedDateUtc).startOf('hour').fromNow();
  };

  /**
   * Function to render the PRO comment section
   */
  const getCommentSection = () =>
    reviewResponse?.Data?.RatingConversations.map((item, index) => {
      if (item.IsProConversation) {
        return (
          <PROContainer key={index}>
            <MainSubContainer>
              <CommentContainer>
                <HeaderContainer>
                  <UserName>{item?.Title}</UserName>
                  {getRightConversationView(item)}
                </HeaderContainer>
                <CommentText>{item?.Description}</CommentText>
                <TimeText>{getTimeValue(item)}</TimeText>
              </CommentContainer>
            </MainSubContainer>
            <ProfileContainer>
              <UserProfileImage source={item?.ImageLogo ? {uri: item?.ImageLogo} : pngImages.defaultUserImage} />
            </ProfileContainer>
          </PROContainer>
        );
      }
      return (
        <MainContainer key={index}>
          <ProfileContainer>
            <UserProfileImage source={item?.ImageLogo ? {uri: item?.ImageLogo} : pngImages.defaultUserImage} />
          </ProfileContainer>
          <MainSubContainer>
            <CommentContainer>
              <UserName>{item?.Title}</UserName>
              <CommentText>{item?.Description}</CommentText>
              <TimeText>{getTimeValue(item)}</TimeText>
            </CommentContainer>
          </MainSubContainer>
        </MainContainer>
      );
    });

  return (
    <BodyContainer>
      {/* When no review is added */}
      {isListAPIinProgress ? (
        <MainLoaderContainer>
          <ActivityIndicator size="large" color={colors.primaryThemeColor} />
        </MainLoaderContainer>
      ) : (
        <>
          {!isReviewAdded && (
            <InputFieldContainer>
              <ScreenNoContentContainer>
                <AddText
                  testID={addNewReviewButton}
                  onPress={() => {
                    setIsReviewAdded(false);
                    navigation?.navigate(NAV_ADD_REVIEW_SCREEN, {
                      ...props,
                    });
                  }}>
                  <UnderlineText>{addAReview}</UnderlineText>
                </AddText>
                <NormalText>{youHaveNoReview}</NormalText>
              </ScreenNoContentContainer>
              <SpaceBetweenText />
            </InputFieldContainer>
          )}
          {/* When  review is added */}
          {isReviewAdded && (
            <KeyboardAvoidingView
              behavior={isIOS() ? 'padding' : 'height'}
              style={styles.keyBoardView}
              keyboardVerticalOffset={isIOS() ? 80 : 0}>
              <Container>
                <SubContainer showsVerticalScrollIndicator={false}>
                  <RatingsContainer>
                    <AirbnbRating
                      count={5}
                      defaultRating={reviewResponse?.Data?.Rating}
                      size={22}
                      showRating={false}
                      selectedColor={primaryThemeColor}
                      isDisabled={true}
                    />
                  </RatingsContainer>
                  <DateContainer>
                    <CalendarIcon />
                    <DateText>{moment(reviewResponse?.Data?.CreatedDateUtc).format('LL')}</DateText>
                  </DateContainer>
                  <ReviewSection />
                  <Divider />
                  {getCommentSection()}
                </SubContainer>
                <InputFieldWrapper>
                  <FloatingLabelInput
                    label={addComment}
                    inputValue={comment}
                    onChangeText={(text: string) => {
                      onChangeDescription(text);
                    }}
                    testID={comment}
                    numberOfLines={10}
                    multiline={true}
                  />
                </InputFieldWrapper>
                <ButtonSubContainer>
                  <SubmitButton
                    testID={submitBtn}
                    selected={!isButtonDisable}
                    disabled={isButtonDisable}
                    onPress={() => onsubmit()}>
                    <ButtonText>
                      {!isAPIinProgress && submit}
                      {isAPIinProgress && <ActivityIndicator size="small" color={white} />}
                    </ButtonText>
                  </SubmitButton>
                </ButtonSubContainer>
              </Container>
            </KeyboardAvoidingView>
          )}
        </>
      )}
      <ShowAlertModal />
      {getShowReportModal()}
    </BodyContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  reviewResponse: store?.getProReview?.payload,
  isListAPIinProgress: store?.getProReview?.isApiInProgress,
  isAPIinProgress: store?.addReviewComment?.isApiInProgress,
  isApiDone: store?.addReviewComment?.isApiDone,
});

const mapDispatchToProps = {
  callGetProReview,
  callAddReviewComment,
  callReportConversation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
