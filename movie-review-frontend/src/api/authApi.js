import axiosInstance from './axiosConfig';

export const authApi = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  getProfile: () => axiosInstance.get('/auth/profile'),
  updateProfile: (data) => axiosInstance.put('/auth/profile', data),

  // Admin endpoints
  getAllUsers: () => axiosInstance.get('/admin/users'),
  blockUser: (userId) => axiosInstance.put(`/admin/users/${userId}/block`),
  unblockUser: (userId) => axiosInstance.put(`/admin/users/${userId}/unblock`),
};
