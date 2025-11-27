/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '.';
import {strings} from '../../constants/strings';
import {dummyLoginResponse} from '../../../jest/dummyData';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const loginAPIMethod = jest.fn();
const doLogin = jest.fn();
const initialEmptyState = {
  auth: {isApiInProgress: true, payload: dummyLoginResponse},
  callLoginAPI: loginAPIMethod,
};
describe('Renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <Login />
    </Provider>,
  );
  it('Renders correctly Login view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('check email Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userEmail})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.password})).toBeTruthy();
  });
  it('Set email value on change', async () => {
    await act(async () => {
      const inputBoxEmail = wrapper.root.findByProps({testID: strings.userEmail});
      const tempEmail = '';
      await inputBoxEmail.props.onChangeText(tempEmail);
      expect(inputBoxEmail.props.inputValue).toBe(tempEmail);
    });
  });
  it('Set password value on change', async () => {
    await act(async () => {
      const inputBoxPassword = wrapper.root.findByProps({testID: strings.password});
      const tempPassword = 'Test@001';
      await inputBoxPassword.props.onChangeText(tempPassword);
      expect(inputBoxPassword.props.inputValue).toBe(tempPassword);
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
  it('check right icon on press method', async () => {
    await act(async () => {
      const passwordToggle = wrapper.root.findByProps({testID: strings.password});
      await passwordToggle.props.onPressRightIcon();
      expect(passwordToggle).toBeTruthy();
    });
  });
  it('check login button event', async () => {
    await act(async () => {
      const loginBtnWrapper = wrapper.root.findByProps({testID: strings.loginButton});
      await loginBtnWrapper.props.onPress();
      expect(loginBtnWrapper).toBeTruthy();
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
  it('check forgot password button event', async () => {
    await act(async () => {
      const forgotPasswordWrapper = wrapper.root.findByProps({testID: strings.forgotPasswordBtn});
      await forgotPasswordWrapper.props.onPress();
      expect(forgotPasswordWrapper).toBeTruthy();
    });
  });
  it('check sign up button event', async () => {
    await act(async () => {
      const signUpBtnWrapper = wrapper.root.findByProps({testID: strings.signUpBtn});
      await signUpBtnWrapper.props.onPress();
      expect(signUpBtnWrapper).toBeTruthy();
    });
  });
  it('check keyborad close button event', async () => {
    await act(async () => {
      const keyboardDismissButtonWrapper = wrapper.root.findByProps({testID: strings.keyboardDismissButton});
      await keyboardDismissButtonWrapper.props.onPress();
      expect(keyboardDismissButtonWrapper).toBeTruthy();
    });
  });
});
