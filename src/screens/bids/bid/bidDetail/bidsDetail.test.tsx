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
import BidsDetail from './bidsDetail';
import {strings} from '../../../../constants/strings';
import {localStrings} from '../../../../localization/localStrings';
import {bidDetailResponseDummyData, fileDummyData} from '../../../../../jest/dummyData';

jest.useFakeTimers();
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
const callGetBidsDetailMethod = jest.fn();
const callProfessionalDetailMethod = jest.fn();

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
      <BidsDetail
        navigation={navigation}
        route={navigation}
        id={0}
        status={localStrings.bidDeclined}
        fileDataProps={fileDummyData}
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
  it('should check get professional detail button event', async () => {
    await act(async () => {
      const getProfessionalButtonWrapper = wrapper.root.findByProps({testID: strings.getProfessionalDataButton});
      await getProfessionalButtonWrapper.props.onPress();
      expect(getProfessionalButtonWrapper).toBeTruthy();
    });
  });
  it('should check list dialog button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.listDialogButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
  it('should back button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.backButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
});
