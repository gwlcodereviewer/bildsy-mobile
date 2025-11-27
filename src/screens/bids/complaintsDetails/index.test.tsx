/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import renderer from 'react-test-renderer';
import {act} from '@testing-library/react-hooks';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ComplaintsDetails from './index';
import {strings} from '../../../constants/strings';
import {dummyComplaintDetails, dummyFileDataProps, complaintsCustomerConversations} from '../../../../jest/dummyData';
import {navigation} from '../../../redux/types';

jest.useFakeTimers();
function FormDataMock(this: any) {
  this.append = jest.fn();
}
const globalAny: any = global;
globalAny.FormData = FormDataMock;

const middleWares = [thunk];
const mockStore = configureStore(middleWares);
const onChange = jest.fn();
const hideComplaintDetails = jest.fn();

const initialEmptyState = {
  auth: {isApiInProgress: true, isLogin: true},
  isComplaintResolved: true,
  customerIdValue: 1574,
  chatData: {complaintsCustomerConversations},
  isComplaintResolvedValue: true,
};
let wrapper: renderer.ReactTestRenderer;

describe('Renders correctly', () => {
  act(() => {
    wrapper = renderer.create(
      <Provider store={mockStore(initialEmptyState)}>
        <ComplaintsDetails
          navigation={navigation}
          id={828}
          customerIdValue={1574}
          complaintId={414}
          onChange={onChange}
          fromNotification={true}
          hideComplaintDetails={hideComplaintDetails}
          isComplaintResolvedValue={true}
          fileDataProps={dummyFileDataProps}
          complaintDetailsResponseData={dummyComplaintDetails}
        />
      </Provider>,
    );
  });
  it('should renders correctly complaints details view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe('check the events', () => {
  beforeEach(() => {
    act(() => {
      wrapper = renderer.create(
        <Provider
          store={mockStore({
            ...initialEmptyState,
          })}>
          <ComplaintsDetails
            navigation={navigation}
            id={828}
            complaintId={414}
            onChange={onChange}
            fromNotification={true}
            hideComplaintDetails={hideComplaintDetails}
            isComplaintResolvedValue={false}
            complaintDetailsResponseData={dummyComplaintDetails}
            customerIdValue={1574}
            fileDataProps={dummyFileDataProps}
            chatData={complaintsCustomerConversations}
          />
        </Provider>,
      );
    });
  });
  it('should check back button event', async () => {
    await act(async () => {
      const backButtonWrapper = wrapper.root.findByProps({testID: strings.backButton});
      await backButtonWrapper.props.onPress();
      expect(backButtonWrapper).toBeTruthy();
    });
  });

  it('should check show resolved button event', async () => {
    await act(async () => {
      const resolveButtonWrapper = wrapper.root.findByProps({testID: strings.showResolvedButton});
      resolveButtonWrapper.props.onPress();
      await expect(resolveButtonWrapper).toBeTruthy();
    });
  });
  it('check email Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.userEmail})).toBeTruthy();
  });
  // TODO Will use this code in next PR
  // it('should check conversation input box event', () => {
  //   act(() => {
  //     const conversationInputBoxWrapper = wrapper.root.findByProps({testID: strings.messageInputBox});
  //     conversationInputBoxWrapper.props.onChangeText();
  //     expect(conversationInputBoxWrapper).toBeTruthy();
  //   });
  // });
  it('should check action sheet event event', () => {
    act(() => {
      const showResolvedButton = wrapper.root.findByProps({cancelButtonIndex: 3});
      showResolvedButton.props.onPress();
      expect(showResolvedButton).toBeTruthy();
    });
  });
  it('should check remove document button event', () => {
    act(() => {
      const removeDocButtonWrapper = wrapper.root.findByProps({testID: strings.removeDocumentButton});
      removeDocButtonWrapper.props.onPress();
      expect(removeDocButtonWrapper).toBeTruthy();
    });
  });

  it('should check complaint conversation document download button event', () => {
    act(() => {
      const conversationDocumentDownloadButtonWrapper = wrapper.root.findByProps({
        testID: strings.downloadConversationDocumentButton,
      });
      conversationDocumentDownloadButtonWrapper.props.onPress();
      expect(conversationDocumentDownloadButtonWrapper).toBeTruthy();
    });
  });
  it('should check send message button event', () => {
    act(() => {
      const conversationInputBoxWrapper = wrapper.root.findByProps({testID: strings.sendMessageButton});
      conversationInputBoxWrapper.props.onPress();
      expect(conversationInputBoxWrapper).toBeTruthy();
    });
  });
  it('should remove selected document event', () => {
    act(() => {
      const removeSelectedButtonWrapper = wrapper.root.findByProps({testID: strings.removeSelectedImageButton});
      removeSelectedButtonWrapper.props.onPress();
      expect(removeSelectedButtonWrapper).toBeTruthy();
    });
  });
  it('should toggle button event', () => {
    act(() => {
      const toggleButtonWrapper = wrapper.root.findByProps({testID: strings.toggleButton});
      toggleButtonWrapper.props.onPress();
      expect(toggleButtonWrapper).toBeTruthy();
    });
  });
  it('should chat toggle button event', () => {
    act(() => {
      const chatButtonWrapper = wrapper.root.findByProps({testID: strings.chatToggleButton});
      chatButtonWrapper.props.onPress();
      expect(chatButtonWrapper).toBeTruthy();
    });
  });
  it('should check fileData document download button event', () => {
    act(() => {
      const fileDataDocumentDownloadButtonWrapper = wrapper.root.findByProps({
        testID: strings.downloadFileDataButton,
      });
      fileDataDocumentDownloadButtonWrapper.props.onPress();
      expect(fileDataDocumentDownloadButtonWrapper).toBeTruthy();
    });
  });
  it('should file data toggle button event', () => {
    act(() => {
      const fileDataToggleButtonWrapper = wrapper.root.findByProps({testID: strings.fileDataToggleButton});
      fileDataToggleButtonWrapper.props.onPress();
      expect(fileDataToggleButtonWrapper).toBeTruthy();
    });
  });
  it('should remove file data image button event', () => {
    act(() => {
      const removeFileDataImageButtonWrapper = wrapper.root.findByProps({testID: strings.removeFileDataImageButton});
      removeFileDataImageButtonWrapper.props.onPress();
      expect(removeFileDataImageButtonWrapper).toBeTruthy();
    });
  });
});
