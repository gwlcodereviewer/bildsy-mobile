// eslint-disable import/no-extraneous-dependencies /

import {NativeModules} from 'react-native';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AddressScreen from './index';
import {strings} from '../../../constants/strings';

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
      <AddressScreen navigation={navigation} auth={auth} />
    </Provider>,
  );
  it('Renders correctly SignUp view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userSuiteAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.userCity})).toBeTruthy();
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
  it('check Signup button event', async () => {
    await act(async () => {
      const signUpButtonWrapper = wrapper.root.findByProps({testID: strings.signUpBtn});
      await signUpButtonWrapper.props.onPress();
      expect(signUpButtonWrapper).toBeTruthy();
    });
  });
});
