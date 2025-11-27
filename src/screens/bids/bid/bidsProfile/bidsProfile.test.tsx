/**
 * @format
 */
import configureStore from 'redux-mock-store';
import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import BidsProfile from './bidsProfile';
import {strings} from '../../../../constants/strings';
import {localStrings} from '../../../../localization/localStrings';
import {bidDetailResponseDummyData, dummyFileDataProps, fileDummyData} from '../../../../../jest/dummyData';
import {navigation} from '../../../../redux/types';

jest.useFakeTimers();
const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const callGetBidsDetailMethod = jest.fn();
const callProfessionalDetailMethod = jest.fn();

export const route = {
  reset: jest.fn(),
  navigate: jest.fn(),
  getParam: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(),
  setOptions: jest.fn(),
  dispatch: jest.fn(),
  route: jest.fn(),
  state: {},
  params: {data: bidDetailResponseDummyData},
};

const initialEmptyState = {
  auth: {isApiInProgress: true},
  id: 0,
  status: 0,
  bidDetail: {isApiInProgress: false, payload: bidDetailResponseDummyData},
  isApiInProgress: {isApiInProgress: false},
  callGetBidsDetailProps: callGetBidsDetailMethod,
  callProfessionalDetailProps: callProfessionalDetailMethod,
};

// Note: test renderer must be required after react-native.
describe('renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <BidsProfile
        navigation={navigation}
        route={route}
        id={0}
        status={localStrings.bidDeclined}
        bidsDetailResponseProps={bidDetailResponseDummyData}
      />
    </Provider>,
  );
  it('should renders correctly bid tab view ', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should check make call button event', async () => {
    await act(async () => {
      const makeCallButtonWrapper = wrapper.root.findByProps({testID: strings.makeCallButton});
      await makeCallButtonWrapper.props.onPress();
      expect(makeCallButtonWrapper).toBeTruthy();
    });
  });
  it('should check back button event', async () => {
    await act(async () => {
      const backButtonWrapper = wrapper.root.findByProps({testID: strings.backButton});
      await backButtonWrapper.props.onPress();
      expect(backButtonWrapper).toBeTruthy();
    });
  });
  it('should show toggle button event', async () => {
    await act(async () => {
      const showToggleButtonWrapper = wrapper.root.findByProps({testID: strings.showToggleButton});
      await showToggleButtonWrapper.props.onPress();
      expect(showToggleButtonWrapper).toBeTruthy();
    });
  });
  it('should close toggle button event', async () => {
    await act(async () => {
      const closeToggleButtonWrapper = wrapper.root.findByProps({testID: strings.closeToggleButton});
      await closeToggleButtonWrapper.props.onPress();
      expect(closeToggleButtonWrapper).toBeTruthy();
    });
  });
  it('should navigation button event', async () => {
    await act(async () => {
      const navigationButtonWrapper = wrapper.root.findByProps({testID: strings.navigationButton});
      await navigationButtonWrapper.props.onPress();
      expect(navigationButtonWrapper).toBeTruthy();
    });
  });
  it('should set modal button event', async () => {
    await act(async () => {
      const modalButtonWrapper = wrapper.root.findByProps({testID: strings.modalButton});
      await modalButtonWrapper.props.onPress();
      expect(modalButtonWrapper).toBeTruthy();
    });
  });
  it('should set award project button event', async () => {
    await act(async () => {
      const projectAwardButtonWrapper = wrapper.root.findByProps({testID: strings.projectAwardButton});
      await projectAwardButtonWrapper.props.onPress();
      expect(projectAwardButtonWrapper).toBeTruthy();
    });
  });
});
