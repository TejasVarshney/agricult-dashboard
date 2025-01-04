const API_BASE_URL = 'http://localhost:1234/api';

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

export const apiService = {
  // User related endpoints
  users: {
    getBuyers: () => fetchApi('/buyers'),
    getSellers: () => fetchApi('/sellers'),
    getBuyerCount: () => fetchApi('/buyers/count'),
    getSellerCount: () => fetchApi('/sellers/count'),
  },

  // RFQ related endpoints
  rfqs: {
    getAll: () => fetchApi('/rfqs'),
    getActiveCount: () => fetchApi('/rfqs/count/active'),
    getEndedCount: () => fetchApi('/rfqs/count/ended'),
    getTotalCount: () => fetchApi('/rfqs/count/total'),
    create: (data) => fetchApi('/rfqs', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => fetchApi(`/rfqs/${id}`, { method: 'DELETE' }),
  },
}; 