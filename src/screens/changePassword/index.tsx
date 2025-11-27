import React, {useState, useEffect} from 'react';
import {ActivityIndicator, KeyboardAvoidingView, BackHandler, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IStore, IHomeOwnerChangePasswordPayload} from '../../redux/types';
import {localStrings} from '../../localization/localStrings';
import {strings} from '../../constants/strings';
import FloatingLabelInput from '../../components/floatingLabelInput';
import {SaveButtonText, CancelButtonText} from '../../style';
import pngImages from '../../assets/images/pngImages';
import {callChangePasswordAPI, callSignOutAPI} from '../../redux/actions/auth';
import {ASYNC_CONST, ASYNC_CONST_QB} from '../../helpers/constants';
import {
  isIOS,
  checkValidPassword,
  equalPasswordAndConfirmSetPassword,
  showToastMessage,
  VALIDATION_REGEX,
  checkValidPasswordWithOutSpecialChar,
  isValidPasswordWithOutSpecialChar,
  clearUserData,
} from '../../utils';
import {
  InputFieldWrapper,
  Container,
  Header,
  NormalText,
  LogoImage,
  BackButtonContainer,
  BottomContainer,
  BottomElementsContainer,
  ValidateMatchContainer,
  CancelButton,
  SaveButton,
  ChangePasswordButton,
  SignOutButton,
  PasswordValidateContainer,
  Text1,
  Text2,
  CircleView,
  MainBodyScroll,
  HeadingText,
  CheckIcon,
} from './styled';
import {INavigation} from '../../style/types';

import styles from '../../style/style';
import colors from '../../style/colors';
import {NAV_PROFILE_DETAILS, NAV_LOGIN} from '../../navigation/navConstants';
import ConfirmModal from '../bids/ConfirmModal';

interface Props {
  navigation?: INavigation;
  callChangePasswordAPI: (param: IHomeOwnerChangePasswordPayload) => Promise<any>;
  callSignOutAPI: () => Promise<any>;
  isInvitedUserValue?: string;
}

const myGlobal: any = global;

interface IFormInput {
  oldPassword: string;
  oldPasswordError: string;
  newPassword: string;
  newPasswordError: string;
  newConfirmPassword: string;
  newConfirmPasswordError: string;
}

const ChangePassword: React.FC<Props> = (props: Props) => {
  const {
    navigation,
    callChangePasswordAPI: pCallChangePasswordAPI,
    callSignOutAPI: pCallSignOutAPI,
    isInvitedUserValue,
  } = props;
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [isLowerCaseValue, setIsLowerCaseValue] = useState<boolean>(false);
  const [isUpperCaseValue, setIsUpperCaseValue] = useState<boolean>(false);
  const [isOneNumberValue, setIsOneNumberValue] = useState<boolean>(false);
  const [isInvitedUser, setIsInvitedUser] = useState<any>(isInvitedUserValue || 'false');
  const [isAPIinProgress, setIsAPIinProgress] = useState<boolean>(false);
  const {currentPasswordIsRequired, newPasswordIsRequired, confirmNewPasswordIsRequired} = localStrings;
  const [formInput, setFormInput] = useState<IFormInput>({
    oldPassword: '',
    oldPasswordError: '',
    newPassword: '',
    newPasswordError: '',
    newConfirmPassword: '',
    newConfirmPasswordError: '',
  });
  const [encryptOldPassword, setEncryptOldPassword] = useState<boolean>(true);
  const [encryptPassword, setEncryptPassword] = useState<boolean>(true);
  const [encryptConfirmPassword, setEncryptConfirmPassword] = useState<boolean>(true);
  const [toggleConfirmModal, setToggleConfirmModal] = useState<boolean>(false);
  /**
   * function for calling API
   */
  const updatePassword = async () => {
    setIsAPIinProgress(true);
    const {oldPassword, newPassword, newConfirmPassword} = formInput;
    pCallChangePasswordAPI({
      oldPassword,
      newPassword,
      confirmPassword: newConfirmPassword,
    })
      .then(async (res: any) => {
        setIsAPIinProgress(false);
        if (res.Success) {
          showToastMessage(strings.success, res.Message);
          AsyncStorage.setItem(ASYNC_CONST.invitedUser, 'false');
          signOut();
        }
      })
      .catch((error: {message: string}) => {
        setIsAPIinProgress(false);
        showToastMessage(strings.error, error.message);
      });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isInvitedUser === 'true') {
      const backAction = () => {
        Alert.alert('', 'Please set your password before proceeding further.', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }
  }, [isInvitedUser]);

  useEffect(() => {
    if (
      formInput.oldPassword &&
      formInput.newPassword &&
      !isValidPasswordWithOutSpecialChar(formInput.newPassword) &&
      formInput.newConfirmPassword &&
      !formInput.newConfirmPasswordError
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  });
  /**
   * Form validation start
   */

  const onChangeOldPassword = (text: string) => {
    if (text) {
      const errorMsg = checkValidPassword(text);
      if (errorMsg !== '') {
        setFormInput({
          ...formInput,
          oldPassword: text,
          oldPasswordError: '',
        });
      } else {
        setFormInput({
          ...formInput,
          oldPassword: text,
          oldPasswordError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        oldPassword: '',
        oldPasswordError: currentPasswordIsRequired,
      });
    }
  };

  const validateOldPassword = () => {
    if (formInput.oldPassword === '') {
      setFormInput({
        ...formInput,
        oldPasswordError: currentPasswordIsRequired,
      });
    }
  };

  const validateConfirmPassword = () => {
    if (formInput.newConfirmPassword === '') {
      setFormInput({
        ...formInput,
        newConfirmPasswordError: confirmNewPasswordIsRequired,
      });
    }
  };

  const onChangeConfirmPassword = (text: string) => {
    if (text) {
      setFormInput({
        ...formInput,
        newConfirmPassword: text,
      });
    } else {
      setFormInput({
        ...formInput,
        newConfirmPassword: '',
        newConfirmPasswordError: confirmNewPasswordIsRequired,
      });
    }
  };

  const validatePassword = () => {
    if (formInput.newPassword === '') {
      setFormInput({
        ...formInput,
        newPasswordError: newPasswordIsRequired,
      });
    }
  };

  const onChangePassword = (text: string) => {
    const lowerCase = VALIDATION_REGEX.lowerCase.test(text);
    const upperCase = VALIDATION_REGEX.upperCase.test(text);
    const numberCase = VALIDATION_REGEX.numberCase.test(text);
    setIsLowerCaseValue(lowerCase);
    setIsUpperCaseValue(upperCase);
    setIsOneNumberValue(numberCase);
    if (text) {
      const errorMsg = checkValidPasswordWithOutSpecialChar(formInput.newPassword);
      if (errorMsg !== '') {
        setFormInput({
          ...formInput,
          newPassword: text,
          newPasswordError: '',
        });
      } else {
        setFormInput({
          ...formInput,
          newPassword: text,
          newPasswordError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        newPassword: '',
        newPasswordError: newPasswordIsRequired,
      });
    }
  };

  const onSetPassword = (text: string) => {
    if (text) {
      const errorMsg = checkValidPasswordWithOutSpecialChar(text);
      if (errorMsg !== '') {
        setFormInput({
          ...formInput,
          newPassword: text,
          newPasswordError: errorMsg,
        });
      } else {
        setFormInput({
          ...formInput,
          newPassword: text,
          newPasswordError: '',
        });
      }
    } else {
      setFormInput({
        ...formInput,
        newPassword: '',
        newPasswordError: newPasswordIsRequired,
      });
    }
  };

  useEffect(() => {
    async function onLoad() {
      const userStatus = await AsyncStorage.getItem(ASYNC_CONST.invitedUser);
      await setIsInvitedUser(userStatus);
    }
    onLoad();
  }, []);

  useEffect(() => {
    if (formInput.newPassword !== '' && formInput.newConfirmPassword !== '') {
      const errorMsg = equalPasswordAndConfirmSetPassword(formInput.newPassword, formInput.newConfirmPassword);
      setFormInput({
        ...formInput,
        newConfirmPasswordError: errorMsg,
      });
    }
  }, [formInput.newPassword, formInput.newConfirmPassword]);

  const onPressPrevious = () => {
    props?.navigation?.navigate(NAV_PROFILE_DETAILS);
  };

  /**
   * function that toggle old password.
   */
  const toggleOldPassword = () => {
    setEncryptOldPassword(!encryptOldPassword);
  };

  /**
   * function that toggle password.
   */
  const togglePassword = () => {
    setEncryptPassword(!encryptPassword);
  };

  /**
   * function that toggle confirm password.
   */
  const toggleConfirmPassword = () => {
    setEncryptConfirmPassword(!encryptConfirmPassword);
  };

  const signOut = () => {
    pCallSignOutAPI()
      .then(async (res: {Success: boolean}) => {
        if (res.Success) {
          clearUserData(() => {
            navigation?.reset({
              index: 0,
              routes: [{name: NAV_LOGIN}],
            });
          });
        }
      })
      .catch((error: {message: string | undefined}) => {
        console.log(error.message);
      });
  };
  return (
    <Container source={pngImages.backgroundThemeImage} resizeMode="cover">
      {isInvitedUser === 'false' ? (
        <>
          <Header>
            <BackButtonContainer>
              <TouchableOpacity testID={strings.backIconButton} onPress={() => onPressPrevious()}>
                <LogoImage source={pngImages.backButtonIcon} />
              </TouchableOpacity>
            </BackButtonContainer>
            <NormalText>{strings.changePassword}</NormalText>
          </Header>
          <KeyboardAvoidingView
            behavior={isIOS() ? 'padding' : 'height'}
            style={styles.keyBoardView}
            keyboardVerticalOffset={isIOS() ? 20 : 0}>
            <MainBodyScroll>
              <BottomContainer>
                <BottomElementsContainer>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.currentPassword}
                      enableFocus={formInput.oldPassword !== ''}
                      label={strings.currentPassword}
                      onChangeText={(text: string) => {
                        onChangeOldPassword(text);
                      }}
                      encrypt={encryptOldPassword}
                      inputValue={formInput.oldPassword}
                      onBlurHandler={() => validateOldPassword()}
                      errorText={formInput.oldPasswordError}
                      isShowOpenEye={true}
                      onPressRightIcon={() => toggleOldPassword()}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.newPassword}
                      encrypt={encryptPassword}
                      inputValue={formInput.newPassword}
                      onChangeText={(text: string) => {
                        onChangePassword(text);
                      }}
                      label={strings.newPassword}
                      onBlurHandler={() => validatePassword()}
                      errorText={formInput.newPasswordError}
                      isShowOpenEye={true}
                      onPressRightIcon={() => togglePassword()}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.confirmNewPassword}
                      encrypt={encryptConfirmPassword}
                      inputValue={formInput.newConfirmPassword}
                      onChangeText={(text: string) => {
                        onChangeConfirmPassword(text);
                      }}
                      label={strings.confirmNewPassword}
                      onBlurHandler={() => validateConfirmPassword()}
                      errorText={formInput.newConfirmPasswordError}
                      isShowOpenEye={true}
                      onPressRightIcon={() => toggleConfirmPassword()}
                    />
                  </InputFieldWrapper>
                  <PasswordValidateContainer>
                    <HeadingText>{localStrings.passwordMatching}-</HeadingText>
                    {isLowerCaseValue ? (
                      <ValidateMatchContainer>
                        <CircleView />
                        <CheckIcon source={pngImages.checkIcon} resizeMode="cover" />
                        <Text2>{localStrings.checkLowerCase}</Text2>
                      </ValidateMatchContainer>
                    ) : (
                      <ValidateMatchContainer>
                        <CircleView />
                        <Text1>{localStrings.checkLowerCase}</Text1>
                      </ValidateMatchContainer>
                    )}
                    {isUpperCaseValue ? (
                      <ValidateMatchContainer>
                        <CircleView />
                        <CheckIcon source={pngImages.checkIcon} resizeMode="cover" />
                        <Text2>{localStrings.checkUpperCase}</Text2>
                      </ValidateMatchContainer>
                    ) : (
                      <ValidateMatchContainer>
                        <CircleView />
                        <Text1>{localStrings.checkUpperCase}</Text1>
                      </ValidateMatchContainer>
                    )}
                    {isOneNumberValue ? (
                      <ValidateMatchContainer>
                        <CircleView />
                        <CheckIcon source={pngImages.checkIcon} resizeMode="cover" />
                        <Text2>{localStrings.checkNumber}</Text2>
                      </ValidateMatchContainer>
                    ) : (
                      <ValidateMatchContainer>
                        <CircleView />
                        <Text1>{localStrings.checkNumber}</Text1>
                      </ValidateMatchContainer>
                    )}
                    {formInput.newPassword.length >= 8 ? (
                      <ValidateMatchContainer>
                        <CircleView />
                        <CheckIcon source={pngImages.checkIcon} resizeMode="cover" />
                        <Text2>{localStrings.checkEightCharacter}</Text2>
                      </ValidateMatchContainer>
                    ) : (
                      <ValidateMatchContainer>
                        <CircleView />
                        <Text1>{localStrings.checkEightCharacter}</Text1>
                      </ValidateMatchContainer>
                    )}
                  </PasswordValidateContainer>
                  <TouchableOpacity testID={strings.cancel} onPress={() => onPressPrevious()}>
                    <CancelButton>
                      <CancelButtonText>{localStrings.cancel}</CancelButtonText>
                    </CancelButton>
                  </TouchableOpacity>
                  <ChangePasswordButton
                    testID={strings.changePassword}
                    selected={isValidForm}
                    disabled={!isValidForm}
                    onPress={() => {
                      updatePassword();
                    }}>
                    <SaveButtonText>
                      {!isAPIinProgress && strings.changePassword}
                      {isAPIinProgress && <ActivityIndicator size="small" color={colors.white} />}
                    </SaveButtonText>
                  </ChangePasswordButton>
                </BottomElementsContainer>
              </BottomContainer>
            </MainBodyScroll>
          </KeyboardAvoidingView>
        </>
      ) : (
        <>
          <Header>
            <BackButtonContainer>
              <TouchableOpacity>
                <LogoImage source={pngImages.backButtonIcon} />
              </TouchableOpacity>
            </BackButtonContainer>
            <NormalText>{strings.setPassword}</NormalText>
          </Header>
          <KeyboardAvoidingView
            behavior={isIOS() ? 'padding' : 'height'}
            style={styles.keyBoardView}
            keyboardVerticalOffset={isIOS() ? 20 : 0}>
            <MainBodyScroll>
              <BottomContainer>
                <BottomElementsContainer>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userOldPassword}
                      enableFocus={formInput.oldPassword !== ''}
                      label={strings.currentPassword}
                      onChangeText={(text: string) => {
                        onChangeOldPassword(text);
                      }}
                      encrypt={encryptOldPassword}
                      inputValue={formInput.oldPassword}
                      onBlurHandler={() => validateOldPassword()}
                      errorText={formInput.oldPasswordError}
                      isShowOpenEye={true}
                      onPressRightIcon={() => toggleOldPassword()}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userNewPassword}
                      encrypt={encryptPassword}
                      inputValue={formInput.newPassword}
                      onChangeText={(text: string) => {
                        onSetPassword(text);
                      }}
                      label={strings.newPassword}
                      onBlurHandler={() => validatePassword()}
                      errorText={formInput.newPasswordError}
                      isShowOpenEye={true}
                      onPressRightIcon={() => togglePassword()}
                    />
                  </InputFieldWrapper>
                  <InputFieldWrapper>
                    <FloatingLabelInput
                      testID={strings.userNewConfirmPassword}
                      encrypt={encryptConfirmPassword}
                      inputValue={formInput.newConfirmPassword}
                      onChangeText={(text: string) => {
                        onChangeConfirmPassword(text);
                      }}
                      label={strings.confirmNewPassword}
                      onBlurHandler={() => validateConfirmPassword()}
                      errorText={formInput.newConfirmPasswordError}
                      isShowOpenEye={true}
                      onPressRightIcon={() => toggleConfirmPassword()}
                    />
                  </InputFieldWrapper>
                  <SaveButton
                    testID={strings.updateButton}
                    selected={isValidForm}
                    disabled={!isValidForm}
                    onPress={updatePassword}>
                    <SaveButtonText>
                      {!isAPIinProgress && strings.setPasswordButton}
                      {isAPIinProgress && <ActivityIndicator size="small" color={colors.white} />}
                    </SaveButtonText>
                  </SaveButton>
                  <TouchableOpacity testID={strings.signOutButton} onPress={() => setToggleConfirmModal(true)}>
                    <SignOutButton>
                      <CancelButtonText>{localStrings.signOut}</CancelButtonText>
                    </SignOutButton>
                  </TouchableOpacity>
                </BottomElementsContainer>
              </BottomContainer>
            </MainBodyScroll>
          </KeyboardAvoidingView>
        </>
      )}
      <ConfirmModal
        toggle={toggleConfirmModal}
        message={localStrings.signOutConfirmation}
        changeToggleValue={(toggleValue: boolean) => {
          setToggleConfirmModal(toggleValue);
        }}
        onConfirm={() => {
          signOut();
        }}
      />
    </Container>
  );
};

const mapStateToProps = (store: IStore) => ({
  auth: store.auth,
});
const mapDispatchToProps = {
  callChangePasswordAPI,
  callSignOutAPI,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
