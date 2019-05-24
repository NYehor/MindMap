import * as types from '../actionTypes';
import initialState from '../initialState';

export default function alert (state = initialState, action) {
  switch (action.type) {
    case types.ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.payload
      };

    case types.ALERT_ERROR:
      return {
        type: 'alert-error',
        message: action.payload
      };

    case types.ALERT_CLEAR:
    default:
      return state;
  }
}