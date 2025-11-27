/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import {Provider} from 'react-redux';
import renderer, {act} from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AddReview from '.';
import {strings} from '../../constants/strings';
import {navigation, route} from '../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);

describe('Renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore()}>
      <AddReview navigation={navigation} route={route} />
    </Provider>,
  );
  it('should check back button event', async () => {
    await act(async () => {
      const backButtonWrapper = wrapper.root.findByProps({testID: strings.backIconBtn});
      await backButtonWrapper.props.onPress();
      expect(backButtonWrapper).toBeTruthy();
    });
  });
  it('should check Submit button event', async () => {
    await act(async () => {
      const submitButtonWrapper = wrapper.root.findByProps({testID: strings.submitBtn});
      await submitButtonWrapper.props.onPress();
      expect(submitButtonWrapper).toBeTruthy();
    });
  });
});
