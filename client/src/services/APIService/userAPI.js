import { apiUrl } from 'config';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: apiUrl
});

export const userAPI = {
    register,
    signIn,
    signOut
};

function register() {
    
}

