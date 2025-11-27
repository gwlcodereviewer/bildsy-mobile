/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ComplaintsList from './complaintsList';
import {dummyComplaintListResponse} from '../../../../jest/dummyData';
import {navigation, route} from '../../../redux/types';
import {strings} from '../../../constants/strings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const onChange = jest.fn();
const initialState = {
  auth: {isApiInProgress: true},
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  wrapper = renderer.create(
    <Provider store={mockStore(initialState)}>
      <ComplaintsList
        id={828}
        navigation={navigation}
        route={route}
        onChange={onChange}
        status={''}
        addComplaint={true}
        complaintListResponse={dummyComplaintListResponse}
      />
    </Provider>,
  );
  it('should renders correctly ComplaintsList view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should add new complaint button event', async () => {
    await act(async () => {
      const addNewComplaintButtonWrapper = wrapper.root.findByProps({testID: strings.addNewComplaintButton});
      await addNewComplaintButtonWrapper.props.onPress();
      expect(addNewComplaintButtonWrapper).toBeTruthy();
    });
  });
});
