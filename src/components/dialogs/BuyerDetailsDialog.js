import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { userService } from '../../services/api';

const BuyerDetailsDialog = ({ buyerId, onClose }) => {
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const data = await userService.getBuyerById(buyerId);
        setBuyer(data);
      } catch (error) {
        console.error('Error fetching buyer details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerDetails();
  }, [buyerId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Buyer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">Loading buyer details...</div>
          ) : !buyer ? (
            <div className="text-center py-8 text-gray-500">
              Buyer not found
            </div>
          ) : (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Business Name</label>
                    <p className="font-medium">{buyer.business_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{buyer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium">{buyer.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">GST Number</label>
                    <p className="font-medium">{buyer.gst_number || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Address Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Address</label>
                    <p className="font-medium">{buyer.address || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Region</label>
                    <p className="font-medium">{buyer.region || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">City</label>
                    <p className="font-medium">{buyer.city || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">State</label>
                    <p className="font-medium">{buyer.state || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Joined Date</label>
                    <p className="font-medium">
                      {new Date(buyer.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-medium capitalize">{buyer.status || 'active'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerDetailsDialog; 