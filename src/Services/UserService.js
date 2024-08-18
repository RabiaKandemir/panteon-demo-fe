 import axios from 'axios';
const API_URL = 'https://backend.rabiakandemir.org.tr/api/';

export const login = async (username, password) => {
    try {
        const response = await axios.get(`${API_URL}User/login`, {
            params: { username, password },
            withCredentials: false
        });
        return response;
    } catch (error) {
        console.error('Login error:', error.response || error.message);
        throw error;
    }
};

export const register = async (values) => {
    try {
        const response = await axios.post(`${API_URL}User/register`, values, {
            withCredentials: false 
        });
        return response;
    } catch (error) {
        console.error('Register error:', error.response || error.message);
        throw error;
    }
};