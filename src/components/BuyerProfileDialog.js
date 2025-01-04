import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const BuyerProfileDialog = ({ buyerId, onClose }) => {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1234/api/buyers/${buyerId}`);
        const data = await response.json();
        setBuyer(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching buyer details:', error);
        setLoading(false);
      }
    };

    fetchBuyerDetails();
  }, [buyerId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center">Loading buyer details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Buyer Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {buyer && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-gray-900">{buyer.full_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Business Name</label>
              <p className="text-gray-900">{buyer.business_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{buyer.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{buyer.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Location</label>
              <p className="text-gray-900">{buyer.location}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerProfileDialog; 