import axios from 'axios';
import { apiUrl } from 'config';
import authHeader from './authHeader';

const axiosInstance = axios.create({
    baseURL: apiUrl
});

const header = {
    'Content-Type': 'application/json'
};


function register(user) {
    axiosInstance.post(`${apiUrl}/api/register`, {
        user: JSON.stringify(user)
    }, {headers: header});
}

function signIn(username, password) {
    const headers = {...header, ...authHeader};
    const body = JSON.stringify({ username, password });

    axiosInstance.post(`${apiUrl}/api/login`, body, {headers})
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function signOut() {
    localStorage.removeItem('user');
}

export const userAPI = {
    register,
    signIn,
    signOut
};

