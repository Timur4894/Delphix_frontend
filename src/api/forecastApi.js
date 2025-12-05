import indexApi from './indexApi';

// Get all forecasts
export const getAllForecastsApi = async () => {
    const response = await indexApi.get('/forecasts');
    return response.data;
};

// Get forecast by ID
export const getForecastByIdApi = async (id) => {
    const response = await indexApi.get(`/forecasts/${id}`);
    return response.data;
};


