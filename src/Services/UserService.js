// src/services/userService.js
import axios from 'axios';

const API_URL = 'https://localhost:7295/api/User';

export const login = async (username, password) => {
    try {
        const response = await axios.get(`${API_URL}/login`, {
            params: { username, password },
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const register = async (values) => {
    try {
        const response = await axios.post(`${API_URL}/register`, values);
        return response;
    } catch (error) {
        throw error;
    }
};