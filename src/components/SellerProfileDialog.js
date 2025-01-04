import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SellerProfileDialog = ({ sellerId, onClose }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1234/api/sellers/${sellerId}`);
        const data = await response.json();
        setSeller(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching seller details:', error);
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [sellerId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center">Loading seller details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Seller Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {seller && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">License Number</label>
              <p className="text-gray-900">{seller.license_number}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{seller.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900">{seller.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Region</label>
              <p className="text-gray-900">{seller.region}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfileDialog; 