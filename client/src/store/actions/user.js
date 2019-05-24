import * as types from '../actionTypes';
import userAPI from '../../services/APIService/userAPI';
import alerts from './alerts';


export default function register() {
    return dispatch => {
        dispatch({
            type: types.REGISTER_REQUEST,
            payload: user
        });

        userAPI.register(user)
            .then(user => {
                dispatch({
                    type: types.REGISTER_SUCCESS,
                    payload: user
                });

            })
            .catch(error => {
                dispatch({
                    type: types.REGISTER_FAILURE,
                    payload: error
                });
                // dispatch(alerts.error(error));
            });
    }
}

export default function signIn(username, password) {
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
                dispatch(alerts.error(error));
            });
    }
}


export default function signOut() {
    return dispatch => {
        userAPI.signOut()
        .then(() => {
            dispatch({
                type: types.SIGNOUT
            });
            dispatch(alerts.success('You sign out successfully!'));
        });
    
    }
}