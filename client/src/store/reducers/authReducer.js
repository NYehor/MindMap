import * as types from '../actionTypes';
import initialState from '../initialState';

let user = JSON.parse(localStorage.getItem('user'));
const authState = user ? { logIn: true, user } : initialState.auth;
 
export default function auth (state = authState, action) {

  switch (action.type) {
    case types.SIGNIN_REQUEST:
    case types.SIGNIN_SUCCESS:
        return {
            logIn: true,
            user: action.payload
        }

    case types.SIGNIN_FAILURE:
    default:
      return state;
  }
}