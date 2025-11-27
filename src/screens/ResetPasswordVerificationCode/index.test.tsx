/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ResetPasswordVerificationCode from './index';
import {strings} from '../../constants/strings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const showToastMessage = jest.fn();
const callVerificationCodeAPI = jest.fn();
const callResetPasswordEmailSendAPI = jest.fn();

const initialEmptyState = {
  auth: {isApiInProgress: true},
  showToastMessage,
  callVerificationCodeAPI,
  callResetPasswordEmailSendAPI,
};
let wrapper: renderer.ReactTestRenderer;
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
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <ResetPasswordVerificationCode navigation={navigation} route={route} />
      </Provider>,
    );
  });
  it('Renders correctly ResetPasswordVerificationCode view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('check text change on otp field', async () => {
    await act(async () => {
      const userOtpInput = wrapper.root.findByProps({testID: strings.userOtp});
      const tempOtp = '1234';
      userOtpInput.props.handleTextChange(tempOtp);
      await expect(userOtpInput).toBeTruthy();
    });
  });
  it('check verify button event', async () => {
    await act(async () => {
      const verifyBtnWrapper = wrapper.root.findByProps({testID: strings.verifyAndProceed});
      await verifyBtnWrapper.props.onPress();
      expect(verifyBtnWrapper).toBeTruthy();
    });
  });
  it('check resend button event', async () => {
    await act(async () => {
      const resendBtnWrapper = wrapper.root.findByProps({testID: strings.resendBtn});
      await resendBtnWrapper.props.onPress();
      expect(resendBtnWrapper).toBeTruthy();
    });
  });
  it('check back button event', async () => {
    await act(async () => {
      const backBtnWrapper = wrapper.root.findByProps({testID: strings.backIconBtn});
      await backBtnWrapper.props.onPress();
      expect(backBtnWrapper).toBeTruthy();
    });
  });
  it('check timer status event', () => {
    const countDownWrapper = wrapper.root.findByProps({until: 300});
    countDownWrapper.props.onFinish();
    expect(countDownWrapper).toBeTruthy();
  });
});
