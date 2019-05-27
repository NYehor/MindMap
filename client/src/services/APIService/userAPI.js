import axios from 'axios';
import { apiUrl } from 'config';
import authHeader from '../../helpers/authHeader';
import { withUppercaseKeys } from '../../helpers/jsonFormatting';
  
const axiosInstance = axios.create({
    baseURL: apiUrl
});

axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const header = {
    'Content-Type': 'application/json'
};


function register(user) {

    const userWithCapitalizedKeys = withUppercaseKeys(user);
    console.log(userWithCapitalizedKeys)

    const body = JSON.stringify(userWithCapitalizedKeys);

    return axiosInstance.post(
                `${apiUrl}/auth/sign-up`, 
                body, 
                {headers: header}
            );
            // .then(responseHandler);
}

function signIn(email, password) {
    const headers = {...header, ...authHeader};
    const body = JSON.stringify({ email, password });

    return axiosInstance.post(
                `${apiUrl}/api/login`, 
                body, 
                {headers}
            )
            // .then(responseHandler);
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function signOut() {
    localStorage.removeItem('user');
}

function responseHandler(response) {
    const data = response.data;
    if (response.status === 200 && response.statusText.toLowerCase() === 'ok') {
        return data;
    }
    if (response.status === 200 && response.statusText.toLowerCase() === 'user exist already') {
        return Promise.reject('user exist already with email');
    }
    const errorMessage = (data && data.message) || response.statusText; 
    return Promise.reject(errorMessage);
}

export default {
    register,
    signIn,
    signOut
};