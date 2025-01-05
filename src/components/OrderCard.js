import { useState } from 'react';
import { orderService } from '../services/api';

const OrderCard = ({ order, onStatusChange }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await orderService.updateOrderStatus(order.id, newStatus);
      onStatusChange(order.id, newStatus);
    } catch (error) {
      console.error(`Failed to update order status to ${newStatus}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{order.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${order.status === 'approved' ? 'bg-green-100 text-green-700' : 
            order.status === 'rejected' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'}`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleStatusChange('approved')}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Approve
        </button>
        <button
          onClick={() => handleStatusChange('rejected')}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default OrderCard; 