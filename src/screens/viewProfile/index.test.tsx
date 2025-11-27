/* eslint-disable import/no-extraneous-dependencies */

import {NativeModules} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {act} from '@testing-library/react-hooks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {string} from 'prop-types';
import ViewProfileScreen from './index';
import {strings} from '../../constants/strings';
import {dummyUserDetail} from '../../../jest/dummyData';
import {localStrings} from '../../localization/localStrings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const callGetUserProfileAPIMethod = jest.fn();
const callSignOutAPIMethod = jest.fn();
const initialEmptyState = {
  callGetUserProfileAPI: callGetUserProfileAPIMethod,
  callSignOutAPI: callSignOutAPIMethod,
  userDetailResponse: {dummyUserDetail},
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
      <ViewProfileScreen navigation={navigation} />
    </Provider>,
  );
  it('should renders correctly view profile view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should check change password button event', async () => {
    await act(async () => {
      const changePasswordWrapper = wrapper.root.findByProps({testID: strings.changePasswordBtn});
      await changePasswordWrapper.props.onPress();
      expect(changePasswordWrapper).toBeTruthy();
    });
  });
  it('should check sign out button event', async () => {
    await act(async () => {
      const signOutWrapper = wrapper.root.findByProps({testID: strings.signOutBtn});
      await signOutWrapper.props.onPress();
      expect(signOutWrapper).toBeTruthy();
    });
  });

  it('should check edit profile button event', async () => {
    await act(async () => {
      const editProfileWrapper = wrapper.root.findByProps({testID: strings.editProfileBtn});
      await editProfileWrapper.props.onPress();
      expect(editProfileWrapper).toBeTruthy();
    });
  });
  it('should check delete account button event', async () => {
    await act(async () => {
      const deleteAccountWrapper = wrapper.root.findByProps({testID: localStrings.deleteAccount});
      await deleteAccountWrapper.props.onPress();
      expect(deleteAccountWrapper).toBeTruthy();
    });
  });
});
