import configureStore from 'redux-mock-store';
import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer, {act} from 'react-test-renderer';
import thunk from 'redux-thunk';
import HelpPage from './index';
import {navigation} from '../../redux/types';
import {strings} from '../../constants/strings';

jest.useFakeTimers();
const middleWares = [thunk];
const mockStore = configureStore(middleWares);

const initialEmptyState = {};

// Note: test renderer must be required after react-native.
describe('renders correctly', () => {
  const wrapper = renderer.create(
    <Provider store={mockStore(initialEmptyState)}>
      <HelpPage navigation={navigation} route={navigation} />
    </Provider>,
  );
  it('should renders correctly help screen view', () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should check Input Box ', () => {
    expect(wrapper.root.findAllByProps({testID: strings.fullName})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.mandatoryEmailAddress})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.mandatorySubject})).toBeTruthy();
    expect(wrapper.root.findAllByProps({testID: strings.mandatoryDescription})).toBeTruthy();
  });
  it('should check make call button event', async () => {
    await act(async () => {
      const backButtonWrapper = wrapper.root.findByProps({testID: strings.backButton});
      await backButtonWrapper.props.onPress();
      expect(backButtonWrapper).toBeTruthy();
    });
  });
  it('should check clear field button event', async () => {
    await act(async () => {
      const clearFieldButtonWrapper = wrapper.root.findByProps({testID: strings.clearField});
      await clearFieldButtonWrapper.props.onPress();
      expect(clearFieldButtonWrapper).toBeTruthy();
    });
  });
  it('should set full name value on change', async () => {
    const inputFullName = wrapper.root.findByProps({testID: strings.fullName});
    await act(async () => {
      const tempValue = 'Bildsy';
      await inputFullName.props.onChangeText(tempValue);
      expect(inputFullName.props.inputValue).toBe(tempValue);
    });
  });
  it('should set email value on change', async () => {
    await act(async () => {
      const inputBoxEmail = wrapper.root.findByProps({testID: strings.mandatoryEmailAddress});
      const tempEmail = 'testu0989@gmail.com';
      await inputBoxEmail.props.onChangeText(tempEmail);
      expect(inputBoxEmail.props.inputValue).toBe(tempEmail);
    });
  });
  it('should check blur handler on email field', async () => {
    await act(async () => {
      const emailInput = wrapper.root.findByProps({testID: strings.mandatoryEmailAddress});
      await emailInput.props.onBlurHandler();
      expect(emailInput).toBeTruthy();
    });
  });
  it('should set subject value on change', async () => {
    await act(async () => {
      const inputMandatorySubject = wrapper.root.findByProps({testID: strings.mandatorySubject});
      const tempInputMandatorySubject = 'test subject';
      await inputMandatorySubject.props.onChangeText(tempInputMandatorySubject);
      expect(inputMandatorySubject.props.inputValue).toBe(tempInputMandatorySubject);
    });
  });
  it('should check blur handler on subject field', async () => {
    await act(async () => {
      const subjectInput = wrapper.root.findByProps({testID: strings.mandatorySubject});
      await subjectInput.props.onBlurHandler();
      expect(subjectInput).toBeTruthy();
    });
  });
  it('should set description value on change', () => {
    act(async () => {
      const inputBoxDescription = wrapper.root.findByProps({testID: strings.mandatoryDescription});
      const tempDescription = 'Test description';
      inputBoxDescription.props.onChangeText(tempDescription);
      expect(inputBoxDescription.props.inputValue).toBe(tempDescription);
    });
  });
  it('should check blur handler on description field', async () => {
    await act(async () => {
      const subjectInput = wrapper.root.findByProps({testID: strings.mandatoryDescription});
      await subjectInput.props.onBlurHandler();
      expect(subjectInput).toBeTruthy();
    });
  });
});
