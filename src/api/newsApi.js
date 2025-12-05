import indexApi from './indexApi';

// Get all news
export const getAllNewsApi = async () => {
    const response = await indexApi.get('/news');
    return response.data;
};

// Get news by ID
export const getNewsByIdApi = async (id) => {
    const response = await indexApi.get(`/news/${id}`);
    return response.data;
};


