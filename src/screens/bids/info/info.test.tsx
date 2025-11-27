/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import {act} from '@testing-library/react-hooks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Info from './info';
import {navigation, route} from '../../../redux/types';
import {dummyProfessionalListResponse, dummyProjectInfo, infoDocumentData} from '../../../../jest/dummyData';
import {strings} from '../../../constants/strings';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;
const getProjectDetails = jest.fn();
const middleWares = [thunk];
const mockStore = configureStore(middleWares);

const initialEmptyState = {
  projectDetails: {isApiInProgress: true, isLogin: true, payload: dummyProjectInfo},
  isGetDetailsAPIInProgress: false,
  getProjectDetails: getProjectDetails(),
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <Info
          navigation={navigation}
          route={route}
          id={818}
          ProjectProfessionalsResponse={dummyProfessionalListResponse}
          attachmentDataResponse={infoDocumentData}
        />
      </Provider>,
    );
  });

  it('should check get professional detail button event', async () => {
    await act(async () => {
      const googleButtonWrapper = wrapper.root.findByProps({testID: strings.getProfessionalDataButton});
      await googleButtonWrapper.props.onPress();
      expect(googleButtonWrapper).toBeTruthy();
    });
  });
  it('should check get second professional detail button event', async () => {
    await act(async () => {
      const professionalButtonWrapper = wrapper.root.findByProps({testID: strings.getProfessionalDataButton2});
      await professionalButtonWrapper.props.onPress();
      expect(professionalButtonWrapper).toBeTruthy();
    });
  });
  it('should check download button event', async () => {
    await act(async () => {
      const downloadButtonWrapper = wrapper.root.findByProps({testID: strings.downloadButton});
      await downloadButtonWrapper.props.onPress();
      expect(downloadButtonWrapper).toBeTruthy();
    });
  });
  it('should check toggle button event', async () => {
    await act(async () => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.toggleButton});
      await toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
});
