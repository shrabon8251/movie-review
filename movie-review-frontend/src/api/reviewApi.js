import axiosInstance from './axiosConfig';

export const reviewApi = {
  getAll: () => axiosInstance.get('/reviews'),
  getByMovie: (movieId) => axiosInstance.get(`/reviews/movie/${movieId}`),
  getByUser: (userId) => axiosInstance.get(`/reviews/user/${userId}`),
  add: (data) => axiosInstance.post('/reviews', data),
  update: (id, data) => axiosInstance.put(`/reviews/${id}`, data),
  delete: (id) => axiosInstance.delete(`/reviews/${id}`),
  getByMovieAndUser: (movieId, userId) =>
    axiosInstance.get(`/reviews/movie/${movieId}/user/${userId}`),
};
