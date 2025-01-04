import { useState } from 'react';
import { X } from 'lucide-react';
import SellerProfileDialog from './SellerProfileDialog';

const BidDialogueBox = ({ bid, onClose }) => {
  const [showSellerProfile, setShowSellerProfile] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Bid Details</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Bid ID</label>
              <p className="text-gray-900">#{bid.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Seller ID</label>
              <p 
                className="text-blue-600 cursor-pointer hover:text-blue-800"
                onClick={() => setShowSellerProfile(true)}
              >
                #{bid.seller_id}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">RFQ ID</label>
              <p className="text-gray-900">#{bid.rfq_id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Price</label>
              <p className="text-gray-900">{formatCurrency(bid.price)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Submitted Date</label>
              <p className="text-gray-900">{formatDate(bid.created_at)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-gray-900 capitalize">{bid.status}</p>
            </div>
          </div>
        </div>
      </div>

      {showSellerProfile && (
        <SellerProfileDialog
          sellerId={bid.seller_id}
          onClose={() => setShowSellerProfile(false)}
        />
      )}
    </>
  );
};

export default BidDialogueBox; 