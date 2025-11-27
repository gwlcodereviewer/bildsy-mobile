// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {localStrings} from '../../localization/localStrings';
import {IStoreUserProfileDetails} from '../../redux/types';
import {INavigation} from '../../types';
import pngImages from '../../assets/images/pngImages';
import {
  Header,
  DrawerButtonContainer,
  NormalText,
  Container,
  BottomContainer,
  TextHeading,
  SubmitButton,
  BottomElementsContainer,
  HelpAttachmentName,
  HelpAttachmentContainer,
  HelpAttachmentIcon,
  ButtonText,
  HelpAttachmentOuterContainer,
  FileUploadButtonText,
  ButtonContainer,
  ClearButtonContainer,
  ClearButtonText,
} from './styled';
import {strings} from '../../constants/strings';
import DrawerIcon from '../../assets/svg/drawer/DrawerIcon';
import {isEmailOrPhoneValid, isIOS, showToastMessage} from '../../utils';
import colors from '../../style/colors';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {NAV_DASHBOARD_SCREEN} from '../../navigation/navConstants';
import BackIcon from '../../assets/svg/BackIcon';
import {ASYNC_CONST} from '../../helpers/constants';
import {URLS} from '../../constants/server';
import {
  DIGIT_0,
  DIGIT_5,
  FORM_DATA_DESCRIPTION,
  FORM_DATA_EMAIL,
  FORM_DATA_NAME,
  FORM_DATA_PRIORITY,
  FORM_DATA_PRIORITY_VALUE,
  FORM_DATA_STATUS,
  FORM_DATA_STATUS_VALUE,
  FORM_DATA_SUBJECT,
  FRESH_DESK_UPLOAD_20MB_LIMIT,
  HELP_DESK_AUTHORIZATION,
  MULTI_PART_FORM_DATA,
} from '../../constants/utils/constantData';

interface Props {
  navigation?: INavigation;
  route?: INavigation;
}
const HelpPage: React.FC<Props> = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [subjectError, setSubjectError] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [attachmentFiles, setAttachmentFiles] = useState<IFileType[] | null>(null);
  const [attachmentResult, setAttachmentResult] = useState<any>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [limitFileUpload, setLimitFileUpload] = useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [formClear, setFormClear] = useState<boolean>(false);
  interface IFileType {
    fileUrl: string;
    fileType: string;
  }
  let result: Array<any> = [];
  const myGlobal: any = global;
  useEffect(() => {
    checkLogin().then(res => {
      if (res !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  useEffect(() => {
    if (email && !emailError && subject && description) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  });

  const checkLogin = async () => {
    const loggedIn = await AsyncStorage.getItem(ASYNC_CONST.loggedInUserInfo);
    return loggedIn;
  };
  const getDataPicker = async () => {
    result = await DocumentPicker.pickMultiple({
      allowMultiSelection: true,
      type: [DocumentPicker.types.images],
    });

    const fileURIArray: IFileType[] = [];
    if (isIOS()) {
      result.forEach(element => {
        fileURIArray.push({
          fileUrl: element.uri.replace(strings.fileTripleSlash, strings.fileSingleSlash),
          fileType: element.type,
        });
      });
    } else {
      await Promise.all(
        result.map(async element => {
          const stat = await RNFetchBlob.fs.stat(element.uri);
          fileURIArray.push({fileUrl: `${stat.path}`, fileType: element.type});
        }),
      );
    }

    if (result.length > DIGIT_5) {
      setLimitFileUpload(false);
      showToastMessage(strings.information, strings.noOfFileError);
    } else {
      let fileSizeSum = DIGIT_0;

      for (let i = DIGIT_0; i < result.length; ) {
        fileSizeSum += result[i].size;
        i += 1;
      }
      if (fileSizeSum > FRESH_DESK_UPLOAD_20MB_LIMIT) {
        setLimitFileUpload(false);
        showToastMessage(strings.information, strings.fileSizeError);
      } else {
        setLimitFileUpload(true);
        setAttachmentResult(result);
        setAttachmentFiles(fileURIArray);
      }
    }
  };
  const handleResponse = () => {
    showToastMessage(strings.success, strings.supportStaffContact);
    onClearFieldPress();
    if (isLoggedIn) {
      myGlobal.tab = NAV_DASHBOARD_SCREEN;
      props.navigation?.navigate(NAV_DASHBOARD_SCREEN);
      setLoader(false);
      setFormClear(true);
    } else {
      props.navigation?.goBack();
      setLoader(false);
      setFormClear(true);
    }
  };
  const onClearFieldPress = () => {
    setEmail('');
    setSubject('');
    setDescription('');
    setAttachmentFiles(null);
    setEmailError('');
    setSubjectError('');
    setDescriptionError('');
    setName('');
    setAttachmentResult([]);
    setFormClear(true);
    setLoader(false);
    setIsValidForm(false);
  };

  const onSubmitPress = async () => {
    setLoader(true);
    const fileInIOS: {name: string; data: string; filename: string | undefined; type: string}[] = [];
    const fileInAndroid: {name: string; data: string; filename: string | undefined; type: string}[] = [];
    if (attachmentFiles) {
      if (isIOS()) {
        attachmentFiles &&
          attachmentFiles.map(fileObj => {
            const uri = fileObj.fileUrl.replace('file:/', '');
            fileInIOS.push({
              name: 'attachments[]',
              data: RNFetchBlob.wrap(decodeURIComponent(uri)),
              filename: uri.split('/').pop(),
              type: fileObj.fileType,
            });
            return fileInIOS;
          });
      } else {
        attachmentFiles &&
          attachmentFiles.map(fileObj => {
            const uri = fileObj.fileUrl;
            fileInAndroid.push({
              name: 'attachments[]',
              data: RNFetchBlob.wrap(`file:${uri}`),
              filename: uri.split('/').pop(),
              type: fileObj.fileType,
            });
            return fileObj;
          });
      }
    }
    const params = [
      {name: FORM_DATA_NAME, data: name},
      {name: FORM_DATA_EMAIL, data: email},
      {name: FORM_DATA_SUBJECT, data: subject},
      {name: FORM_DATA_STATUS, data: FORM_DATA_STATUS_VALUE},
      {name: FORM_DATA_PRIORITY, data: FORM_DATA_PRIORITY_VALUE},
      {name: FORM_DATA_DESCRIPTION, data: description},
    ];
    const finalParams = [...params, ...fileInIOS, ...fileInAndroid];
    RNFetchBlob.fetch(
      'POST',
      URLS.freshDeskURL,
      {
        Authorization: HELP_DESK_AUTHORIZATION,
        'Content-Type': MULTI_PART_FORM_DATA,
      },
      finalParams,
    )
      .then(() => {
        handleResponse();
      })
      .catch(() => {
        setLoader(false);
        myGlobal.tab = NAV_DASHBOARD_SCREEN;
        showToastMessage(strings.error, strings.ApiErrorMessage);
      });
  };
  // Validation of Email
  const validEmail = (emailID: string) => {
    const errorMessage = isEmailOrPhoneValid(emailID);
    setEmailError(errorMessage);
    if (errorMessage === '') {
      setIsValidForm(false);
      setEmailError(errorMessage);
    } else {
      setIsValidForm(true);
    }
    return emailID;
  };
  // Validation of Subject
  const validSubject = () => {
    if (subject.trim().length > 0) {
      setSubjectError('');
      setIsValidForm(true);
    } else {
      setSubjectError(localStrings.subjectEmptyError);
      setIsValidForm(false);
    }
  };
  // Validation of Description
  const validDescription = () => {
    if (description.trim().length > 0) {
      setDescriptionError('');
      setIsValidForm(true);
    } else {
      setDescriptionError(localStrings.descriptionEmptyError);
      setIsValidForm(false);
    }
  };
  return (
    <Container source={pngImages.backgroundThemeImage} resizeMode="cover">
      <Header>
        <DrawerButtonContainer>
          {isLoggedIn ? (
            <TouchableOpacity
              testID={strings.toggleMenuBtn}
              onPress={() => {
                props?.navigation?.toggleDrawer();
              }}>
              <DrawerIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity testID={strings.backButton} onPress={() => props.navigation?.goBack()}>
              <BackIcon />
            </TouchableOpacity>
          )}
        </DrawerButtonContainer>
        <NormalText>{strings.help}</NormalText>
      </Header>
      <BottomContainer>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <BottomElementsContainer>
            <ClearButtonContainer>
              <TextHeading>{strings.contactUs}</TextHeading>
              <TouchableOpacity testID={strings.clearField} onPress={onClearFieldPress}>
                <ClearButtonText>{strings.clearField}</ClearButtonText>
              </TouchableOpacity>
            </ClearButtonContainer>
          </BottomElementsContainer>
          <BottomElementsContainer>
            <FloatingLabelInput
              testID={strings.fullName}
              label={strings.fullName}
              enableFocus={name !== ''}
              onChangeText={textFieldValue => {
                setName(textFieldValue);
              }}
              inputValue={name}
              maxLength={30}
              autoCapitalize="none"
            />
          </BottomElementsContainer>
          <BottomElementsContainer>
            <FloatingLabelInput
              testID={strings.mandatoryEmailAddress}
              label={strings.mandatoryEmailAddress}
              onChangeText={textFieldValue => {
                if (validEmail(textFieldValue)) {
                  setIsValidForm(false);
                }
                setEmail(textFieldValue);
              }}
              enableFocus={email !== ''}
              inputValue={email}
              onBlurHandler={() => validEmail(email)}
              errorText={emailError}
              autoCapitalize="none"
            />
          </BottomElementsContainer>
          <BottomElementsContainer>
            <FloatingLabelInput
              testID={strings.mandatorySubject}
              label={strings.mandatorySubject}
              onChangeText={textFieldValue => {
                setSubject(textFieldValue);
              }}
              enableFocus={subject !== ''}
              inputValue={subject}
              maxLength={80}
              onBlurHandler={validSubject}
              errorText={subjectError}
              autoCapitalize="none"
            />
          </BottomElementsContainer>
          <BottomElementsContainer>
            <FloatingLabelInput
              testID={strings.mandatoryDescription}
              label={strings.mandatoryDescription}
              onChangeText={textFieldValue => {
                setDescription(textFieldValue);
              }}
              inputValue={description}
              enableFocus={description !== ''}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={5}
              onBlurHandler={validDescription}
              errorText={descriptionError}
            />
          </BottomElementsContainer>
          <HelpAttachmentOuterContainer>
            {attachmentResult.map((res: any, idx: number) => (
              <HelpAttachmentContainer key={idx}>
                <HelpAttachmentIcon source={{uri: res.uri}} />
                <HelpAttachmentName numberOfLines={1} ellipsizeMode="middle">
                  {res.name}
                </HelpAttachmentName>
              </HelpAttachmentContainer>
            ))}
          </HelpAttachmentOuterContainer>
          <ButtonContainer>
            <TouchableOpacity onPress={getDataPicker}>
              <FileUploadButtonText>{strings.maxFileUpload}</FileUploadButtonText>
            </TouchableOpacity>
            <SubmitButton testID={strings.submit} onPress={onSubmitPress} disabled={!isValidForm}>
              <ButtonText>
                {loader ? <ActivityIndicator size="small" color={colors.white} /> : strings.submit}
              </ButtonText>
            </SubmitButton>
          </ButtonContainer>
        </KeyboardAwareScrollView>
      </BottomContainer>
    </Container>
  );
};
export default HelpPage;
