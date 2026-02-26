import axios from 'axios';
import indexApi from './indexApi';

// Get all companies with pagination
export const getTopCompaniesApi = async () => {
    const response = await indexApi.get('/company/top');
    return response.data;
};

// Get top companies with quotes
// export const getTopCompaniesWithQuotesApi = async () => {
//     const response = await indexApi.get('/company/top');
//     return response.data;
// };

// Search companies by name or ticker
// export const searchCompaniesApi = async (search, page = 1, limit = 10) => {
//     const response = await axios.get('/company', {
//         params: { search, page, limit }
//     });
//     return response.data;
// };

export const searchCompaniesApi = async (q, page = 1, limit = 10) => {
    if (!q?.trim()) {
        return { data: [], pagination: null };
    }

    const response = await indexApi.get('/company/external-search', {
        params: { q, page, limit }
    });

    return response.data;
};


    export const getCompanyByTickerApi = async (ticker) => {
        if (!ticker?.trim()) return null;
    
        try {
        const response = await indexApi.get("/company/by-ticker", {
            params: { ticker },
        });
        return response.data; 
        } catch (error) {
        console.error("Error fetching company by ticker:", error);
        return null;
        }
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


