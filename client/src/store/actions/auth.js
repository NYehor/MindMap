import * as types from '../actionTypes';
import userAPI from '../../services/APIService/userAPI';
import alert from './alert';
import { withLowercaseKeys } from '../../helpers/jsonFormatting';

export function register({ user, redirectTo }) {
    console.log(user);
    
    return dispatch => {
        // dispatch({
        //     type: types.REGISTER_REQUEST,
        //     payload: user
        // });

        userAPI.register(user)
            .then(user => {

                console.log(user);

                localStorage.setItem('user', JSON.stringify(user));
                redirectTo('/board');

                dispatch({
                    type: types.REGISTER_SUCCESS,
                    payload: user
                });

            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: types.REGISTER_FAILURE,
                    payload: error
                });
                // dispatch(alert.error(error));
            });
    }
}

export function signIn(username, password) {
    return (dispatch) => {
        dispatch({
            type: types.SIGNIN_REQUEST,
            payload: { username, password }
        });


        userAPI.signIn(username, password)
            .then(user => {
                dispatch({
                    type: types.SIGNIN_SUCCESS,
                    payload: user
                });
            })
            .catch(error => {
                dispatch({
                    type: types.SIGNIN_FAILURE,
                    payload: error
                });
                dispatch(alert.error(error));
            });
    }
}


export function signOut() {
    return dispatch => {
        userAPI.signOut()
        .then(() => {
            dispatch({
                type: types.SIGNOUT
            });
            dispatch(alert.success('You sign out successfully!'));
        });
    
    }
}