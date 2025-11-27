/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {act} from '@testing-library/react-hooks';
import OnBoarding from './index';
import {strings} from '../../constants/strings';
import {navigation} from '../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore()}>
        <OnBoarding navigation={navigation} />
      </Provider>,
    );
    it('should renders correctly OnBoarding view', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
    it('should check skip button event', () => {
      act(() => {
        const skipButton = wrapper.root.findByProps({testID: strings.skipButton});
        skipButton.props.onPress();
        expect(skipButton).toBeTruthy();
      });
    });
  });
});
