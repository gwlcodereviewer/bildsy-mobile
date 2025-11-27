/* eslint-disable import/no-extraneous-dependencies */

import {NativeModules} from 'react-native';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {string} from 'prop-types';
import ResetPasswordSendEmail from './index';
import {strings} from '../../constants/strings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initialEmptyState = {
  resetPassword: {isApiInProgress: true},
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

describe('Renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <ResetPasswordSendEmail navigation={navigation} />
    </Provider>,
  );

  it('check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userEmail})).toBeTruthy();
  });
  it('should set email value on change', async () => {
    await act(async () => {
      const inputBoxEmail = wrapper.root.findByProps({testID: strings.userEmail});
      const tempEmail = 'testu0989@gmail.com';
      await inputBoxEmail.props.onChangeText(tempEmail);
      expect(inputBoxEmail.props.inputValue).toBe(tempEmail);
    });
  });
  it('should check recover button event', async () => {
    await act(async () => {
      const recoverButtonWrapper = wrapper.root.findByProps({testID: strings.recoverButton});
      await recoverButtonWrapper.props.onPress();
      expect(recoverButtonWrapper).toBeTruthy();
    });
  });
  it('should check keyboard dismiss button event', async () => {
    await act(async () => {
      const keyboardDismissButtonWrapper = wrapper.root.findByProps({testID: strings.keyboardDismissButton});
      await keyboardDismissButtonWrapper.props.onPress();
      expect(keyboardDismissButtonWrapper).toBeTruthy();
    });
  });
  it('should check back button event', async () => {
    await act(async () => {
      const backButtonWrapper = wrapper.root.findByProps({testID: strings.backIconBtn});
      await backButtonWrapper.props.onPress();
      expect(backButtonWrapper).toBeTruthy();
    });
  });
});
