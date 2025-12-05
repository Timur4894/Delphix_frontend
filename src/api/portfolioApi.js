import indexApi from './indexApi';

// Get my portfolio (all companies with profit/loss calculation)
export const getMyPortfolioApi = async () => {
    const response = await indexApi.get('/portfolio-companies');
    return response.data;
};

// Get portfolio company by ID
export const getPortfolioCompanyByIdApi = async (id) => {
    const response = await indexApi.get(`/portfolio-companies/${id}`);
    return response.data;
};

// Get portfolio company by ticker
export const getPortfolioCompanyByTickerApi = async (ticker) => {
    const response = await indexApi.get(`/portfolio-companies/ticker/${ticker}`);
    return response.data;
};

// Get company transactions by ticker
export const getCompanyTransactionsApi = async (ticker) => {
    const response = await indexApi.get(`/portfolio-companies/ticker/${ticker}/transactions`);
    return response.data;
};


