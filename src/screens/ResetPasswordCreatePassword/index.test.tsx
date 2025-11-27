/* eslint-disable import/no-extraneous-dependencies */

import {NativeModules} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {act} from '@testing-library/react-hooks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {string} from 'prop-types';
import ResetPasswordCreatePassword from './index';
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
  signUpAuth: '',
  signUpAPI: signUpAPIMethod,
  resetPassword: {isApiInProgress: true},
  projectAndProfessionalAPI: {payload: {}},
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
const route = {
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

describe('Renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <ResetPasswordCreatePassword navigation={navigation} route={route} />
    </Provider>,
  );
  it('Renders correctly ResetPasswordCreatePassword view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('check new password input box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.mandatoryNewPassword})).toBeTruthy();
  });
  it('check confirm password input box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.mandatoryConfirmNewPassword})).toBeTruthy();
  });

  const inputBoxNewPassword = wrapper.root.findByProps({testID: strings.mandatoryNewPassword});
  const tempNewPassword = 'test@123';
  const inputBoxConfirmNewPassword = wrapper.root.findByProps({testID: strings.mandatoryConfirmNewPassword});
  const tempConfirmNewPassword = 'test@123';

  it('Set new password value on change', async () => {
    await act(async () => {
      await inputBoxNewPassword.props.onChangeText(tempNewPassword);
      expect(inputBoxNewPassword.props.inputValue).toBe(tempNewPassword);
    });
  });
  it('Set new confirm password value on change', async () => {
    await act(async () => {
      await inputBoxConfirmNewPassword.props.onChangeText(tempConfirmNewPassword);
      expect(inputBoxConfirmNewPassword.props.inputValue).toBe(tempConfirmNewPassword);
    });
  });
  it('check new password and confirm password value should be equal', async () => {
    await act(async () => {
      inputBoxConfirmNewPassword.props.onChangeText(tempConfirmNewPassword);
      inputBoxNewPassword.props.onChangeText(tempNewPassword);
      expect(inputBoxConfirmNewPassword.props.inputValue).toEqual(inputBoxNewPassword.props.inputValue);
    });
  });
  it('check reset button event', async () => {
    await act(async () => {
      const resetBtnWrapper = wrapper.root.findByProps({testID: strings.resetPassword});
      resetBtnWrapper.props.onPress();
      expect(resetBtnWrapper).toBeTruthy();
    });
  });
  it('check eye icon event on password field', async () => {
    await act(async () => {
      inputBoxNewPassword.props.onPressRightIcon();
      await expect(inputBoxNewPassword).toBeTruthy();
    });
  });
  it('check eye icon event on confirm password field', async () => {
    await act(async () => {
      inputBoxConfirmNewPassword.props.onPressRightIcon();
      await expect(inputBoxConfirmNewPassword).toBeTruthy();
    });
  });
  it('check blur handler on confirm password field', async () => {
    await act(async () => {
      inputBoxConfirmNewPassword.props.onBlurHandler();
      await expect(inputBoxConfirmNewPassword).toBeTruthy();
    });
  });
  it('check blur handler on password field', async () => {
    await act(async () => {
      inputBoxNewPassword.props.onBlurHandler();
      await expect(inputBoxNewPassword).toBeTruthy();
    });
  });
});
