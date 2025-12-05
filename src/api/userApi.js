import indexApi from './indexApi';

// Get current user info
export const getMeApi = async () => {
    const response = await indexApi.get('/user/me');
    return response.data;
};

// Get all users (requires auth)
export const getAllUsersApi = async () => {
    const response = await indexApi.get('/user');
    return response.data;
};

// Get user by ID
export const getUserByIdApi = async (id) => {
    const response = await indexApi.get(`/user/${id}`);
    return response.data;
};

// Update user (supports FormData for file uploads)
export const updateUserApi = async (id, data) => {
    console.log('updateUserApi called with:', {
        id,
        dataType: data instanceof FormData ? 'FormData' : typeof data,
        data: data instanceof FormData ? 'FormData object' : data
    });
    const response = await indexApi.patch(`/user/${id}`, data);
    console.log('updateUserApi response:', response.data);
    return response.data;
};

// Delete user
export const deleteUserApi = async (id) => {
    const response = await indexApi.delete(`/user/${id}`);
    return response.data;
};
