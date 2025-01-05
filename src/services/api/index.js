import { apiClient } from './client';

export const orderService = {
  getAll: () => apiClient.get('/rfqs'),
  getById: (id) => apiClient.get(`/rfqs/${id}`),
  getBids: (rfqId) => apiClient.get(`/quotes/rfq/${rfqId}`),
  create: (data) => apiClient.post('/rfqs', data),
  update: (id, data) => apiClient.put(`/rfqs/${id}`, data),
  delete: (id) => apiClient.delete(`/rfqs/${id}`),
};

export const userService = {
  getBuyers: () => apiClient.get('/buyers'),
  getSellers: () => apiClient.get('/sellers'),
  getBuyerById: (id) => apiClient.get(`/buyers/${id}`),
  getSellerById: (id) => apiClient.get(`/sellers/${id}`),
}; 