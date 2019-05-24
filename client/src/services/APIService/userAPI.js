import axios from 'axios';
import { apiUrl } from 'config';
import authHeader from '../../helpers/authHeader';

const axiosInstance = axios.create({
    baseURL: apiUrl
});

axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const header = {
    'Content-Type': 'application/json'
};


function register(user) {
    const body = { user: JSON.stringify(user) };

    return axiosInstance.post(
                `${apiUrl}/auth/sign-up`, 
                body, 
                {headers: header}
            );
}

function signIn(username, password) {
    const headers = {...header, ...authHeader};
    const body = JSON.stringify({ username, password });

    return axiosInstance.post(
            `${apiUrl}/api/login`, 
            body, 
            {headers}
        )
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function signOut() {
    localStorage.removeItem('user');
}

export default {
    register,
    signIn,
    signOut
};

