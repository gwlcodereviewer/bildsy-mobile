import {Dispatch} from 'redux';

export const ScreenChange = (screenName: string) => (dispatch: Dispatch) => {
  dispatch({type: ScreenChange, payload: screenName});
};
