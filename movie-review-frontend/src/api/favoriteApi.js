import axiosInstance from './axiosConfig';

export const favoriteApi = {
  getByUser: (userId) => axiosInstance.get(`/favorites/user/${userId}`),
  add: (data) => axiosInstance.post('/favorites', data),
  remove: (id) => axiosInstance.delete(`/favorites/${id}`),
  removeByUserAndMovie: (userId, movieId) =>
    axiosInstance.delete(`/favorites/user/${userId}/movie/${movieId}`),
  exists: (userId, movieId) =>
    axiosInstance.get(`/favorites/user/${userId}/movie/${movieId}/exists`),
};
