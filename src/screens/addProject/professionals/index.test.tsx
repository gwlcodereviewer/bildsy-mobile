/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ProfessionalView from './index';
import {strings} from '../../../constants/strings';
import {dummyProfessionalListResponse} from '../../../../jest/dummyData';
import {navigation} from '../../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const callSearchProfessionalsMethod = jest.fn();
const callUpdateProfessionalMethod = jest.fn();
const callGetProjectTypeDetailsMethod = jest.fn();
const onChange = jest.fn();
const showBtnStyle = jest.fn();
const initialEmptyState = {
  auth: {isApiInProgress: true},
  isGetAPIInProgress: false,
  selectedRadioBtn: 1,
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <ProfessionalView
        navigation={navigation}
        pageChange={false}
        onChange={onChange}
        showBtnStyle={showBtnStyle}
        professionalListResponseProps={dummyProfessionalListResponse}
      />
    </Provider>,
  );
  it('Renders correctly add project professional view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('check toggle button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.toggleButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
  it('check toggle response button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.toggleResponseButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
  it('check remove button event', async () => {
    await act(async () => {
      const removeBtnWrapper = wrapper.root.findByProps({testID: strings.removeDocBtn});
      await removeBtnWrapper.props.onPress();
      expect(removeBtnWrapper).toBeTruthy();
    });
  });
  it('check next button event', async () => {
    await act(async () => {
      const nextButtonWrapper = wrapper.root.findByProps({testID: strings.nextButton});
      await nextButtonWrapper.props.onPress();
      expect(nextButtonWrapper).toBeTruthy();
    });
  });
});
