import indexApi from './indexApi';

// Create transaction by ticker
export const createTransactionByTickerApi = async (ticker, transactionData) => {
    const response = await indexApi.post(`/transactions/company/${ticker}`, transactionData);
    return response.data;
};

// Get all my transactions (sorted by date, newest first)
export const getAllMyTransactionsApi = async () => {
    const response = await indexApi.get('/transactions');
    return response.data;
};

// Get transactions by company ticker
export const getTransactionsByTickerApi = async (ticker) => {
    const response = await indexApi.get(`/transactions/company/${ticker}`);
    return response.data;
};


