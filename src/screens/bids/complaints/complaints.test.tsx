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
import Complaints from './complaints';
import {strings} from '../../../constants/strings';
import {localStrings} from '../../../localization/localStrings';
import {dummyFileDataProps} from '../../../../jest/dummyData';
import {navigation, route} from '../../../redux/types';

jest.useFakeTimers();
const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const callGetCreateComplaintPopupMethod = jest.fn();
const callCreateComplaintMethod = jest.fn();
const callUploadFilesAPIMethod = jest.fn();
const hideCreateComplaint = jest.fn();

const initialEmptyState = {
  auth: {isApiInProgress: true},
  id: 0,
  status: 0,
  bidsDetailResponse: {},
  callGetCreateComplaintPopup: callGetCreateComplaintPopupMethod,
  callCreateComplaint: callCreateComplaintMethod,
  callUploadFilesAPI: callUploadFilesAPIMethod,
};

// Note: test renderer must be required after react-native.
describe('renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <Complaints
        navigation={navigation}
        route={route}
        id={0}
        status={localStrings.bidDeclined}
        hideCreateComplaint={hideCreateComplaint}
        isComplaintResolvedValue={false}
        fileDataProps={dummyFileDataProps}
      />
    </Provider>,
  );
  it('should renders correctly complaint tab view ', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.description})).toBeTruthy();
  });
  it('should check dropdown button event', async () => {
    await act(async () => {
      const dropdownButtonWrapper = wrapper.root.findByProps({testID: strings.complaintReasonsDropDown});
      await dropdownButtonWrapper.props.onSelect();
      expect(dropdownButtonWrapper).toBeTruthy();
    });
  });
  it('should check blur handler on description field', async () => {
    await act(async () => {
      const lastNameInput = wrapper.root.findByProps({testID: strings.description});
      await lastNameInput.props.onBlurHandler();
      expect(lastNameInput).toBeTruthy();
    });
  });
  it('should check submit button event', async () => {
    await act(async () => {
      const submitButtonWrapper = wrapper.root.findByProps({testID: strings.submitButton});
      await submitButtonWrapper.props.onPress();
      expect(submitButtonWrapper).toBeTruthy();
    });
  });
  it('should check hide complaint button event', async () => {
    await act(async () => {
      const submitButtonWrapper = wrapper.root.findByProps({testID: strings.hideComplaintButton});
      await submitButtonWrapper.props.onPress();
      expect(submitButtonWrapper).toBeTruthy();
    });
  });
  it('should check remove document event', async () => {
    await act(async () => {
      const removeDocButtonWrapper = wrapper.root.findByProps({testID: strings.removeDocButton});
      await removeDocButtonWrapper.props.onPress();
      expect(removeDocButtonWrapper).toBeTruthy();
    });
  });
  it('should check description text field event', async () => {
    await act(async () => {
      const descriptionFieldsWrapper = wrapper.root.findByProps({testID: strings.description});
      await descriptionFieldsWrapper.props.onChangeText();
      expect(descriptionFieldsWrapper).toBeTruthy();
    });
  });
});
