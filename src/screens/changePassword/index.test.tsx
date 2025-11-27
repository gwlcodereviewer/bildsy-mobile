/* eslint-disable import/no-extraneous-dependencies */
/**
 * @format
 */
import configureStore from 'redux-mock-store';
import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {act} from '@testing-library/react-hooks';
import ChangePassword from '.';
import {localStrings} from '../../localization/localStrings';
import {strings} from '../../constants/strings';

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const navigation = {
  reset: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  isFocused: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  state: jest.fn(),
  push: jest.fn(),
  setOptions: jest.fn(),
  route: jest.fn(),
};

const callChangePasswordAPIMethod = jest.fn();
const callSignOutAPIMethod = jest.fn();

const initialEmptyState = {
  auth: {isApiInProgress: true},
  callChangePasswordAPI: callChangePasswordAPIMethod,
  callSignOutAPI: callSignOutAPIMethod,
  isInvitedUserValue: 'false',
};

// Note: test renderer must be required after react-native.
describe('renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <ChangePassword navigation={navigation} isInvitedUserValue={'false'} />
    </Provider>,
  );

  const inputCurrentBoxPassword = wrapper.root.findByProps({testID: strings.currentPassword});
  it('should check blur handler on current password field', async () => {
    await inputCurrentBoxPassword.props.onBlurHandler();
    expect(inputCurrentBoxPassword).toBeTruthy();
  });
  it('should set current password value on change', async () => {
    await act(async () => {
      const tempValue = 'A123abcd';
      await inputCurrentBoxPassword.props.onChangeText(tempValue);
      expect(inputCurrentBoxPassword.props.inputValue).toBe(tempValue);
    });
  });
  const inputBoxNewPassword = wrapper.root.findByProps({testID: strings.newPassword});
  it('should check blur handler on new password field', async () => {
    await inputBoxNewPassword.props.onBlurHandler();
    expect(inputBoxNewPassword).toBeTruthy();
  });
  it('should set new password value on change', async () => {
    await act(async () => {
      const tempValue = 'A123abcd';
      await inputBoxNewPassword.props.onChangeText(tempValue);
      expect(inputBoxNewPassword.props.inputValue).toBe(tempValue);
    });
  });

  const inputBoxPassword = wrapper.root.findByProps({testID: strings.confirmNewPassword});

  it('should check blur handler on confirm new password field', async () => {
    await inputBoxPassword.props.onBlurHandler();
    expect(inputBoxPassword).toBeTruthy();
  });
  it('should set confirm new password value on change', async () => {
    await act(async () => {
      const tempValue = 'A123abcd';
      await inputBoxPassword.props.onChangeText(tempValue);
      expect(inputBoxPassword.props.inputValue).toBe(tempValue);
    });
  });
  it('should check signout button event', async () => {
    await act(async () => {
      const signOutWrapper = wrapper.root.findByProps({testID: strings.signOutButton});
      await signOutWrapper.props.onPress();
      expect(signOutWrapper).toBeTruthy();
    });
  });
  it('should check update password button event', async () => {
    await act(async () => {
      const nextWrapper = wrapper.root.findByProps({testID: strings.updateButton});
      await nextWrapper.props.onPress();
      expect(nextWrapper).toBeTruthy();
    });
  });
  it('should set old password value on change', async () => {
    await act(async () => {
      const inputBoxConfirmPassword = wrapper.root.findByProps({testID: strings.userOldPassword});
      const tempConfirmPassword = 'Bildsy@11';
      await inputBoxConfirmPassword.props.onChangeText(tempConfirmPassword);
      expect(inputBoxConfirmPassword.props.inputValue).toBe(tempConfirmPassword);
    });
  });
  it('should set new update password value on change', async () => {
    await act(async () => {
      const inputBoxConfirmPassword = wrapper.root.findByProps({testID: strings.userNewPassword});
      const tempConfirmPassword = 'Bildsy@11';
      await inputBoxConfirmPassword.props.onChangeText(tempConfirmPassword);
      expect(inputBoxConfirmPassword.props.inputValue).toBe(tempConfirmPassword);
    });
  });
  it('should set confirm update password value on change', async () => {
    await act(async () => {
      const inputBoxConfirmPassword = wrapper.root.findByProps({testID: strings.userNewConfirmPassword});
      const tempConfirmPassword = 'Bildsy@11';
      await inputBoxConfirmPassword.props.onChangeText(tempConfirmPassword);
      expect(inputBoxConfirmPassword.props.inputValue).toBe(tempConfirmPassword);
    });
  });
  it('should check blur handler on old password field', async () => {
    await act(async () => {
      const confirmPasswordInput = wrapper.root.findByProps({testID: strings.userOldPassword});
      await confirmPasswordInput.props.onBlurHandler();
      expect(confirmPasswordInput).toBeTruthy();
    });
  });
  it('should check blur handler on new update password field', async () => {
    await act(async () => {
      const confirmPasswordInput = wrapper.root.findByProps({testID: strings.userNewPassword});
      await confirmPasswordInput.props.onBlurHandler();
      expect(confirmPasswordInput).toBeTruthy();
    });
  });
  it('should check blur handler on confirm update password field', async () => {
    await act(async () => {
      const confirmPasswordInput = wrapper.root.findByProps({testID: strings.userNewConfirmPassword});
      await confirmPasswordInput.props.onBlurHandler();
      expect(confirmPasswordInput).toBeTruthy();
    });
  });
  it('should check right icon on press method', async () => {
    await act(async () => {
      const passwordToggle = wrapper.root.findByProps({testID: strings.userOldPassword});
      await passwordToggle.props.onPressRightIcon();
      expect(passwordToggle).toBeTruthy();
    });
  });
  it('should check right icon for new password on press method', async () => {
    await act(async () => {
      const passwordToggle = wrapper.root.findByProps({testID: strings.userNewPassword});
      await passwordToggle.props.onPressRightIcon();
      expect(passwordToggle).toBeTruthy();
    });
  });
  it('should check right icon for confirm password on press method', async () => {
    await act(async () => {
      const passwordToggle = wrapper.root.findByProps({testID: strings.userNewConfirmPassword});
      await passwordToggle.props.onPressRightIcon();
      expect(passwordToggle).toBeTruthy();
    });
  });
});
