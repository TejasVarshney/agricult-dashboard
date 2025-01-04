import { useState } from 'react';
import { X } from 'lucide-react';
import BuyerProfileDialog from './BuyerProfileDialog';

const OrderDialogueBox = ({ order, onClose }) => {
  const [showBuyerProfile, setShowBuyerProfile] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Order ID</label>
              <p className="text-gray-900">#{order.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Buyer ID</label>
              <p 
                className="text-blue-600 cursor-pointer hover:text-blue-800"
                onClick={() => setShowBuyerProfile(true)}
              >
                #{order.buyer_id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Loading Date</label>
              <p className="text-gray-900">{formatDate(order.loading_date)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Grade</label>
              <p className="text-gray-900">{order.grade}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Quantity</label>
              <p className="text-gray-900">{order.quantity}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Region</label>
              <p className="text-gray-900">{order.region}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-gray-900 capitalize">{order.status}</p>
            </div>
          </div>
        </div>
      </div>

      {showBuyerProfile && (
        <BuyerProfileDialog
          buyerId={order.buyer_id}
          onClose={() => setShowBuyerProfile(false)}
        />
      )}
    </>
  );
};

export default OrderDialogueBox; 