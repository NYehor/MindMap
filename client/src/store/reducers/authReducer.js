import * as types from '../actionTypes';
import initialState from '../initialState';

let user = JSON.parse(localStorage.getItem('user'));
const authState = user ? { logIn: true, user } : initialState.auth;
 
export default function auth (state = authState, action) {

  switch (action.type) {
    case types.REGISTER_SUCCESS:
      return {
          logIn: true,
          user: {
            id: action.payload.userId,
            name: action.payload.userName,
            email: action.payload.email
          }
      }
    case types.SIGNIN_SUCCESS:
      return state;

    case types.REGISTER_REQUEST:
    case types.REGISTER_FAILURE:
    case types.SIGNIN_REQUEST:
    case types.SIGNIN_FAILURE:
      return initialState.auth;

    default:
      return state;
  }
}