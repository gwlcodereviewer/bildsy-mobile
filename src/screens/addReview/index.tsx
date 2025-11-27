import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, LogBox} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import {AirbnbRating} from 'react-native-ratings';
import {connect} from 'react-redux';
import pngImages from '../../assets/images/pngImages';
import BackIcon from '../../assets/svg/BackIcon';
import CloseIcon from '../../assets/svg/CloseIcon';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {strings} from '../../constants/strings';
import {DESCRIPTION_LIMIT, imagePickerOptions} from '../../constants/utils/constantData';
import {localStrings} from '../../localization/localStrings';
import {callAddProReview} from '../../redux/actions/review';
import {IAddReviewPayload, IPostedFiles, IReviewResponse, IStore} from '../../redux/types';
import colors from '../../style/colors';
import {INavigation} from '../../types';
import {onImageLibraryPress, openDeviceCamera, showToastMessage, VALIDATION_REGEX} from '../../utils';
import {
  AddImageContainer,
  AddImageViewContainer,
  AttachedImage,
  BackButtonContainer,
  BaseText,
  BodyContainer,
  ButtonSubContainer,
  ButtonText,
  CloseContainer,
  Container,
  Header,
  HeaderBackSection,
  HeaderContainer,
  ImageContainer,
  ImageList,
  InputFieldWrapper,
  MainAddContainer,
  NormalText,
  PictureText,
  RatingsContainer,
  RatingText,
  ReviewContainer,
  SubContainer,
  SubmitButton,
} from './styled';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
  isAPIinProgress?: boolean;
  callAddProReview: (param: IAddReviewPayload) => Promise<IReviewResponse>;
}

interface IFormInput {
  description: string;
  descriptionError: string;
}
const cancelIndex = 2;

const AddReview: React.FC<Props> = (props: Props) => {
  const {navigation, isAPIinProgress, callAddProReview: _callAddProReview, route} = props;
  const {id} = route?.params;
  const {tangoOrange, white} = colors;
  const {submit, addDescription, rating, addPicture, uptoEight, addReview, closeIconBtn, submitBtn} = strings;
  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [cameraImageData, setCameraImageData] = useState<IPostedFiles[]>([]);
  const actionSheet = useRef<any>();
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [formInput, setFormInput] = useState<IFormInput>({
    description: '',
    descriptionError: '',
  });

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const validateDescription = () => {
    let errorMsg = formInput.description === '' ? localStrings.required : '';

    if (formInput.description === '') {
      errorMsg = localStrings.required;
    } else if (formInput.description.length > DESCRIPTION_LIMIT) {
      errorMsg = `${localStrings.max} ${DESCRIPTION_LIMIT} ${localStrings.characters}`;
    }
    setFormInput({
      ...formInput,
      descriptionError: errorMsg,
    });
  };

  const onChangeDescription = (text: string) => {
    setIsButtonDisable(true);
    if (text.trim() || formInput.description !== '') {
      setFormInput({
        ...formInput,
        description: text,
        descriptionError: '',
      });
      if (text.length > DESCRIPTION_LIMIT) {
        setFormInput({
          ...formInput,
          description: text,
          descriptionError: `${localStrings.max} ${DESCRIPTION_LIMIT} ${localStrings.characters}`,
        });
        setIsButtonDisable(true);
      } else if (text !== '') {
        setFormInput({
          ...formInput,
          description: text,
          descriptionError: '',
        });
        setIsButtonDisable(false);
      }
    } else {
      setFormInput({
        ...formInput,
        description: '',
        descriptionError: localStrings.required,
      });
      setIsButtonDisable(true);
    }
  };

  /**
   * desc: function to select Image from device
   * @param buttonIndex
   */
  const selectImageAction = (index: number) => {
    if (index === 0) {
      openDeviceCamera(cameraImageData).then((res: any) => {
        if (res) {
          setCameraImageData([...res]);
        }
      });
    } else if (index === 1) {
      onImageLibraryPress().then((res: any) => {
        if (res) {
          setCameraImageData([...cameraImageData, res]);
        }
      });
    }
  };

  /**
   * Function to open action sheet for image picker
   */
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };

  /**
   * Function to Delete image
   */
  const removeImage = index => {
    // eslint-disable-next-line array-callback-return, consistent-return
    const result = cameraImageData.filter((item, itemIndex) => {
      if (itemIndex !== index) {
        return item;
      }
    });
    setCameraImageData(result);
  };

  /**
   * Function to Add review for PRO
   */
  const onSubmit = () => {
    const postedData = cameraImageData.map(item => {
      const response = {
        fileBase64String: item?.fileBase64Path,
        fileName: item?.fileName,
        fileType: item?.fileType,
        fileUri: item?.fileUri,
        FilePath: item?.FilePath,
      };
      return response;
    });

    const reqParams = {
      projectId: id || 0,
      rating: ratingCount,
      description: formInput.description,
      postedFiles: postedData,
    };
    _callAddProReview(reqParams)
      .then(res => {
        if (res.Success) {
          navigation?.goBack();
          showToastMessage(strings.success, res.Message);
        } else if (!res.Success) {
          showToastMessage(strings.error, res.Message);
        }
      })
      .catch(error => {
        showToastMessage(strings.error, error.message);
      });
  };

  /**
   * Function to Render the HO review section
   */
  const ReviewSection = () => (
    <ReviewContainer>
      <PictureText>
        {addPicture} <BaseText>{uptoEight}</BaseText>
      </PictureText>
      {cameraImageData.length < 8 && (
        <MainAddContainer>
          <AddImageContainer onPress={showActionSheet}>
            <AddImageViewContainer source={pngImages.addImage} resizeMode="cover" />
          </AddImageContainer>
        </MainAddContainer>
      )}
      <ImageContainer horizontal={true} showsHorizontalScrollIndicator={false}>
        {cameraImageData.map((item, index) => (
          <ImageList key={index}>
            <AttachedImage source={{uri: item?.fileUri}} />
            <CloseContainer testID={closeIconBtn} onPress={() => removeImage(index)}>
              <CloseIcon />
            </CloseContainer>
          </ImageList>
        ))}
      </ImageContainer>
    </ReviewContainer>
  );

  return (
    <HeaderContainer source={require('../../assets/images/combined_shape.png')} resizeMode="cover">
      <Header>
        <BackButtonContainer>
          <HeaderBackSection
            testID={strings.backIconBtn}
            onPress={() => {
              navigation?.goBack();
            }}>
            <BackIcon />
          </HeaderBackSection>
        </BackButtonContainer>
        <NormalText>{addReview}</NormalText>
      </Header>
      <BodyContainer>
        <Container>
          <SubContainer>
            <RatingText>{rating}</RatingText>
            <RatingsContainer>
              <AirbnbRating
                count={5}
                defaultRating={0}
                size={22}
                showRating={false}
                selectedColor={tangoOrange}
                isDisabled={false}
                onFinishRating={rate => {
                  setRatingCount(rate);
                }}
              />
            </RatingsContainer>
            <InputFieldWrapper>
              <FloatingLabelInput
                label={addDescription}
                inputValue={formInput.description}
                onChangeText={(text: string) => {
                  onChangeDescription(text);
                }}
                numberOfLines={10}
                multiline={true}
                onBlurHandler={() => validateDescription()}
                errorText={formInput.descriptionError}
              />
            </InputFieldWrapper>
            <ReviewSection />
          </SubContainer>
          <ButtonSubContainer>
            <SubmitButton testID={submitBtn} selected={!isButtonDisable} disabled={isButtonDisable} onPress={onSubmit}>
              <ButtonText>
                {!isAPIinProgress ? submit : ''}
                {isAPIinProgress && <ActivityIndicator size="small" color={white} />}
              </ButtonText>
            </SubmitButton>
          </ButtonSubContainer>
        </Container>
        <ActionSheet
          ref={actionSheet}
          options={imagePickerOptions}
          cancelButtonIndex={cancelIndex}
          destructiveButtonIndex={cancelIndex}
          onPress={(index: number) => {
            selectImageAction(index);
          }}
        />
      </BodyContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = (store: IStore) => ({
  isAPIinProgress: store?.addProReview?.isApiInProgress,
});

const mapDispatchToProps = {
  callAddProReview,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
