// eslint-disable import/no-extraneous-dependencies /

import {NativeModules} from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import SignUp from './index';
import {strings} from '../../constants/strings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const signUpAPIMethod = jest.fn();
const initialEmptyState = {
  auth: {isApiInProgress: true},
  signUpAPI: signUpAPIMethod,
  signUpAuth: {isSignUpApiInProgress: true},
};
const navigation = {
  reset: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
  route: jest.fn(),
  state: {},
};
const auth = {
  isApiInProgress: false,
  isApiDone: false,
  message: '',
  payload: {},
  isLogin: false,
  status: '',
  isSignUp: false,
};

describe('Renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <SignUp
        navigation={navigation}
        auth={auth}
        contryObjProps={{
          countryIndex: 0,
          countryName: 'Select Country',
        }}
      />
    </Provider>,
  );
  it('Renders correctly SignUp view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userFirstName})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userLastName})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userEmail})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.password})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userSuiteAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userCity})).toBeTruthy();
  });
  it('Set first name value on change', async () => {
    await act(async () => {
      const inputBoxFirstName = wrapper.root.findByProps({testID: strings.userFirstName});
      const tempFirstName = 'test';
      await inputBoxFirstName.props.onChangeText(tempFirstName);
      expect(inputBoxFirstName.props.inputValue).toBe(tempFirstName);
    });
  });
  it('Set last name value on change', async () => {
    await act(async () => {
      const inputBoxLastName = wrapper.root.findByProps({testID: strings.userLastName});
      const tempLastName = 'user';
      await inputBoxLastName.props.onChangeText(tempLastName);
      expect(inputBoxLastName.props.inputValue).toBe(tempLastName);
    });
  });
  it('Set email value on change', async () => {
    await act(async () => {
      const inputBoxEmail = wrapper.root.findByProps({testID: strings.userEmail});
      const tempEmail = 'testu0989@gmail.com';
      await inputBoxEmail.props.onChangeText(tempEmail);
      expect(inputBoxEmail.props.inputValue).toBe(tempEmail);
    });
  });
  it('Set password value on change', async () => {
    await act(async () => {
      const inputBoxPassword = wrapper.root.findByProps({testID: strings.password});
      const tempPassword = 'Bildsy@11';
      await inputBoxPassword.props.onChangeText(tempPassword);
      expect(inputBoxPassword.props.inputValue).toBe(tempPassword);
    });
  });
  it('Set confirm password value on change', async () => {
    await act(async () => {
      const inputBoxConfirmPassword = wrapper.root.findByProps({testID: strings.userNewConfirmPassword});
      const tempConfirmPassword = 'Bildsy@11';
      await inputBoxConfirmPassword.props.onChangeText(tempConfirmPassword);
      expect(inputBoxConfirmPassword.props.inputValue).toBe(tempConfirmPassword);
    });
  });
  it('Set address value on change', async () => {
    await act(async () => {
      const inputBoxAddress = wrapper.root.findByProps({testID: strings.userAddress});
      const tempAddress = '11, test address';
      await inputBoxAddress.props.onChangeText(tempAddress);
      expect(inputBoxAddress.props.inputValue).toBe(tempAddress);
    });
  });
  it('Set suite address value on change', async () => {
    await act(async () => {
      const inputBoxSuiteAddress = wrapper.root.findByProps({testID: strings.userSuiteAddress});
      const tempSuiteAddress = 'suite address';
      await inputBoxSuiteAddress.props.onChangeText(tempSuiteAddress);
      expect(inputBoxSuiteAddress.props.inputValue).toBe(tempSuiteAddress);
    });
  });
  it('Set city value on change', async () => {
    await act(async () => {
      const inputBoxCity = wrapper.root.findByProps({testID: strings.userCity});
      const tempCity = 'city';
      await inputBoxCity.props.onChangeText(tempCity);
      expect(inputBoxCity.props.inputValue).toBe(tempCity);
    });
  });
  it('Set zip code value on change', async () => {
    await act(async () => {
      const inputBoxZipCode = wrapper.root.findByProps({testID: strings.userZipCode});
      const tempZipCode = '12345';
      await inputBoxZipCode.props.onChangeText(tempZipCode);
      expect(inputBoxZipCode.props.inputValue).toBe(tempZipCode);
    });
  });
  it('Set phone value on change', async () => {
    await act(async () => {
      const inputBoxPhone = wrapper.root.findByProps({testID: strings.userPhone});
      const tempPhone = '91548678958';
      await inputBoxPhone.props.onChangeText(tempPhone);
      expect(inputBoxPhone.props.inputValue).toBe(tempPhone);
    });
  });
  it('check blur handler on first name field', async () => {
    await act(async () => {
      const firstNameInput = wrapper.root.findByProps({testID: strings.userFirstName});
      await firstNameInput.props.onBlurHandler();
      expect(firstNameInput).toBeTruthy();
    });
  });
  it('check blur handler on last name field', async () => {
    await act(async () => {
      const lastNameInput = wrapper.root.findByProps({testID: strings.userLastName});
      await lastNameInput.props.onBlurHandler();
      expect(lastNameInput).toBeTruthy();
    });
  });
  it('check blur handler on email field', async () => {
    await act(async () => {
      const emailInput = wrapper.root.findByProps({testID: strings.userEmail});
      await emailInput.props.onBlurHandler();
      expect(emailInput).toBeTruthy();
    });
  });
  it('check blur handler on password field', async () => {
    await act(async () => {
      const passwordInput = wrapper.root.findByProps({testID: strings.password});
      await passwordInput.props.onBlurHandler();
      expect(passwordInput).toBeTruthy();
    });
  });
  it('check blur handler on confirm password field', async () => {
    await act(async () => {
      const confirmPasswordInput = wrapper.root.findByProps({testID: strings.userNewConfirmPassword});
      await confirmPasswordInput.props.onBlurHandler();
      expect(confirmPasswordInput).toBeTruthy();
    });
  });
  it('check blur handler on city field', async () => {
    await act(async () => {
      const cityInput = wrapper.root.findByProps({testID: strings.userCity});
      await cityInput.props.onBlurHandler();
      expect(cityInput).toBeTruthy();
    });
  });
  it('check blur handler on zip code field', async () => {
    await act(async () => {
      const zipCodeInput = wrapper.root.findByProps({testID: strings.userZipCode});
      await zipCodeInput.props.onBlurHandler();
      expect(zipCodeInput).toBeTruthy();
    });
  });
  it('check right icon on press method', async () => {
    await act(async () => {
      const passwordToggle = wrapper.root.findByProps({testID: strings.password});
      await passwordToggle.props.onPressRightIcon();
      expect(passwordToggle).toBeTruthy();
    });
  });
  it('check confirm password right icon on press method', async () => {
    await act(async () => {
      const confirmPasswordToggle = wrapper.root.findByProps({testID: strings.userNewConfirmPassword});
      await confirmPasswordToggle.props.onPressRightIcon();
      expect(confirmPasswordToggle).toBeTruthy();
    });
  });
  it('check SignUp button event', async () => {
    await act(async () => {
      const signUpButtonWrapper = wrapper.root.findByProps({testID: strings.signUpButton});
      await signUpButtonWrapper.props.onPress();
      expect(signUpButtonWrapper).toBeTruthy();
    });
  });
  it('check google button event', async () => {
    await act(async () => {
      const googleBtnWrapper = wrapper.root.findByProps({testID: strings.googleBtn});
      await googleBtnWrapper.props.onPress();
      expect(googleBtnWrapper).toBeTruthy();
    });
  });
  it('check apple button event', async () => {
    await act(async () => {
      const appleBtnWrapper = wrapper.root.findByProps({testID: strings.appleBtn});
      await appleBtnWrapper.props.onPress();
      expect(appleBtnWrapper).toBeTruthy();
    });
  });
  it('check login button event', async () => {
    await act(async () => {
      const loginBtnWrapper = wrapper.root.findByProps({testID: strings.loginButton});
      await loginBtnWrapper.props.onPress();
      expect(loginBtnWrapper).toBeTruthy();
    });
  });
  it('check navigation button event', async () => {
    await act(async () => {
      const navigationButtonWrapper = wrapper.root.findByProps({testID: strings.navigationButton});
      await navigationButtonWrapper.props.onPress();
      expect(navigationButtonWrapper).toBeTruthy();
    });
  });
  it('check address model button event', async () => {
    await act(async () => {
      const modelButtonWrapper = wrapper.root.findByProps({testID: strings.modelButton});
      await modelButtonWrapper.props.onSelect();
      expect(modelButtonWrapper).toBeTruthy();
    });
  });
});
