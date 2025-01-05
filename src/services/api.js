const API_BASE_URL = "http://localhost:1234";

// Helper function for API calls
const fetchApi = async (endpoint, options = {}) => {
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
    return data.data || [];
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

export const orderService = {
  getOrders: () => fetchApi('/api/rfqs'),
  getBuyerDetails: (buyerId) => fetchApi(`/api/buyers/${buyerId}`),
  getBidsForOrder: (orderId) => fetchApi(`/api/quotes/rfq/${orderId}`),
  updateOrderStatus: async (orderId, status) => {
    const response = await fetchApi(`/api/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return response;
  },
  async updateBidStatus(bidId, status) {
    const response = await fetchApi(`/api/quotes/${bidId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
    return response;
  },
};

export const userService = {
  getBuyers: () => fetchApi('/api/buyers'),
  getSellers: () => fetchApi('/api/sellers'),
  getBuyerCount: () => fetchApi('/api/buyers/count'),
  getSellerCount: () => fetchApi('/api/sellers/count'),
};

// For backward compatibility
export const apiService = {
  users: userService,
  orders: orderService,
}; 