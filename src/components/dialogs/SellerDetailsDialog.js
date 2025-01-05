import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { userService } from '../../services/api';

const SellerDetailsDialog = ({ sellerId, onClose }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const data = await userService.getSellerById(sellerId);
        setSeller(data);
      } catch (error) {
        console.error('Error fetching seller details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [sellerId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Seller Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">Loading seller details...</div>
          ) : !seller ? (
            <div className="text-center py-8 text-gray-500">
              Seller not found
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
                    <p className="font-medium">{seller.business_name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{seller.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium">{seller.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">GST Number</label>
                    <p className="font-medium">{seller.gst_number || 'N/A'}</p>
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
                    <p className="font-medium">{seller.address || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Region</label>
                    <p className="font-medium">{seller.region || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">City</label>
                    <p className="font-medium">{seller.city || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">State</label>
                    <p className="font-medium">{seller.state || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Business Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Business Type</label>
                    <p className="font-medium capitalize">{seller.business_type || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Product Categories</label>
                    <p className="font-medium">{seller.product_categories?.join(', ') || 'N/A'}</p>
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
                      {new Date(seller.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-medium capitalize">{seller.status || 'active'}</p>
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

export default SellerDetailsDialog; 