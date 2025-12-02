import indexApi from './indexApi';
import { tokenStorage } from '../utils/tokenStorage';

export const loginApi = async (email, password) => {
    const response = await indexApi.post('/auth/login', { email, password });
    return response.data;
};

export const signupApi = async (email, password, user_name) => {
    const response = await indexApi.post('/auth/signup', { 
        email, 
        password, 
        user_name 
    });
    return response.data;
};

export const logoutApi = async () => {
    await tokenStorage.removeToken();
};