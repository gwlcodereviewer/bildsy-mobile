/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act} from '@testing-library/react-hooks';
import Filter from './Filter';
import {strings} from '../../../constants/strings';
import {navigation} from '../../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const callGetProjectTypeAPIMethod = jest.fn();
const locationListMethod = jest.fn();
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const initialEmptyState = {
  callGetProjectTypeAPI: callGetProjectTypeAPIMethod,
  locationList: locationListMethod,
};

let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <Filter navigation={navigation} />
      </Provider>,
    );
    it('should go back button event', () => {
      act(() => {
        const backIconButton = wrapper.root.findByProps({testID: strings.backIconButton});
        backIconButton.props.onPress();
        expect(backIconButton).toBeTruthy();
      });
    });
    it('should clear all button event', () => {
      act(() => {
        const ClearIconButton = wrapper.root.findByProps({testID: strings.clearField});
        ClearIconButton.props.onPress();
        expect(ClearIconButton).toBeTruthy();
      });
    });
    it('check search Input Box ', () => {
      expect(wrapper.root.findAllByProps({testID: strings.expectedStartDate})).toBeTruthy();
      expect(wrapper.root.findAllByProps({testID: strings.desiredCompletionDate})).toBeTruthy();
    });
    it('should check dropdown button event', () => {
      const dropdownButtonWrapper = wrapper.root.findByProps({testID: strings.projectLocation});
      dropdownButtonWrapper.props.onSelect();
      expect(dropdownButtonWrapper).toBeTruthy();
    });
    it('should check project dropdown button event', () => {
      const dropdownButtonWrapper = wrapper.root.findByProps({testID: strings.projectType});
      dropdownButtonWrapper.props.onSelect();
      expect(dropdownButtonWrapper).toBeTruthy();
    });
    it('should set expectedStartDate value on change', async () => {
      await act(async () => {
        const inputBoxExpectedStartDate = wrapper.root.findByProps({testID: strings.expectedStartDate});
        const tempExpectedStartDate = '25-04-22';
        await inputBoxExpectedStartDate.props.onChangeText(tempExpectedStartDate);
        expect(inputBoxExpectedStartDate.props.inputValue).toBe(tempExpectedStartDate);
      });
    });
    it('should set desiredCompletionDate value on change', async () => {
      await act(async () => {
        const inputBoxDesiredCompletionDate = wrapper.root.findByProps({testID: strings.desiredCompletionDate});
        const tempExpectedCompletionDate = '25-04-22';
        await inputBoxDesiredCompletionDate.props.onChangeText(tempExpectedCompletionDate);
        expect(inputBoxDesiredCompletionDate.props.inputValue).toBe(tempExpectedCompletionDate);
      });
    });
    it('should check submit button event', async () => {
      await act(async () => {
        const submitButtonWrapper = wrapper.root.findByProps({testID: strings.submitButton});
        await submitButtonWrapper.props.onPress();
        expect(submitButtonWrapper).toBeTruthy();
      });
    });
    it('should open expectedStartDate event on password field', async () => {
      await act(async () => {
        const inputBoxExpectedStartDate = wrapper.root.findByProps({testID: strings.expectedStartDate});
        inputBoxExpectedStartDate.props.onPressIn();
        await expect(inputBoxExpectedStartDate).toBeTruthy();
      });
    });
    it('should open desiredCompletionDate event on password field', async () => {
      await act(async () => {
        const desiredCompletionDate = wrapper.root.findByProps({testID: strings.desiredCompletionDate});
        desiredCompletionDate.props.onPressIn();
        await expect(desiredCompletionDate).toBeTruthy();
      });
    });
  });
});
