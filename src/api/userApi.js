import indexApi from './indexApi';
import { tokenStorage } from '../utils/tokenStorage';

export const getMeApi = async () => {
    const response = await indexApi.get('/user/me');
    return response.data;
};
