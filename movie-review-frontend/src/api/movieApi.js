import axiosInstance from './axiosConfig';

export const movieApi = {
  getAll: () => axiosInstance.get('/movies'),
  getById: (id) => axiosInstance.get(`/movies/${id}`),
  create: (data) => axiosInstance.post('/movies', data),
  update: (id, data) => axiosInstance.put(`/movies/${id}`, data),
  delete: (id) => axiosInstance.delete(`/movies/${id}`),
  search: (keyword) => axiosInstance.get(`/movies/search?title=${keyword}`),
  filterByGenre: (genre) => axiosInstance.get(`/movies/genre/${genre}`),
  getTopRated: () => axiosInstance.get('/movies/top-rated'),
};
