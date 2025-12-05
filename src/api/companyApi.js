import indexApi from './indexApi';

// Get all companies with pagination
export const getAllCompaniesApi = async (page = 1, limit = 10) => {
    const response = await indexApi.get('/company', {
        params: { page, limit }
    });
    return response.data;
};

// Search companies by name or ticker
export const searchCompaniesApi = async (search, page = 1, limit = 10) => {
    const response = await indexApi.get('/company', {
        params: { search, page, limit }
    });
    return response.data;
};

// Get company by ID
export const getCompanyByIdApi = async (id) => {
    const response = await indexApi.get(`/company/${id}`);
    return response.data;
};

// Buy/Sell stock for a company
export const buySellStockApi = async (companyId, transactionData) => {
    const response = await indexApi.post(`/company/${companyId}/transaction`, transactionData);
    return response.data;
};


