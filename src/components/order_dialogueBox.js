import { useState } from 'react';

const OrderDialogueBox = ({ order, onClose }) => {
  if (!order) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-medium">#{order.id.slice(0, 8)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Buyer ID</p>
            <p className="font-medium">#{order.buyer_id.slice(0, 8)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-medium">{order.quantity}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Grade</p>
            <p className="font-medium">{order.grade}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Region</p>
            <p className="font-medium">{order.region}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{order.status}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Loading Date</p>
            <p className="font-medium">{formatDate(order.loading_date)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">{formatDate(order.created_at)}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDialogueBox; 