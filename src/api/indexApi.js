import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';

export const indexApi = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor - добавляет токен в заголовки
indexApi.interceptors.request.use(
    async (config) => {
        const token = await tokenStorage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - обрабатывает ошибки авторизации
indexApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // Если получили 401 (Unauthorized), токен невалидный - удаляем его
        if (error.response?.status === 401) {
            console.log('Unauthorized - removing token');
            await tokenStorage.removeToken();
        }
        return Promise.reject(error);
    }
);

export default indexApi;