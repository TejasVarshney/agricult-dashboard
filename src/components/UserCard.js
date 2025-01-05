import { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { X, Phone, Mail, MapPin, Building2, CreditCard } from 'lucide-react';

const UserCard = ({ user, type, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async () => {
    if (!isExpanded || details) return;
    
    setLoading(true);
    try {
      let userData;
      if (type === 'buyer') {
        userData = await userService.getBuyerById(user.id);
      } else {
        userData = await userService.getSellerById(user.id);
      }
      setDetails(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [isExpanded]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all
        ${isExpanded ? 'p-6 space-y-6' : 'p-6'}`}
    >
      {/* Basic Info Section */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-xl font-bold">
            {(user.business_name || user.name || 'NA').charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.business_name || user.name || 'N/A'}
          </h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className={`px-3 py-1 rounded-full text-sm font-medium
          ${type === 'seller' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      </div>

      {/* Expanded Details Section */}
      {isExpanded && (
        <div className={`space-y-4 mt-6 transition-all ${loading ? 'opacity-50' : ''}`}>
          {loading ? (
            <div className="text-center py-4 text-gray-500">Loading details...</div>
          ) : details ? (
            <>
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{details.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{details.email}</span>
                </div>
              </div>

              {/* Business Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm">{details.business_name || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm">GST: {details.gst_number || 'N/A'}</span>
                </div>
              </div>

              {/* Location Information */}
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="text-sm">
                  {[details.address, details.city, details.state, details.region]
                    .filter(Boolean)
                    .join(', ') || 'N/A'}
                </span>
              </div>

              {/* Status and Join Date */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${details.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="capitalize">{details.status || 'active'}</span>
                </div>
                <span className="text-gray-500">
                  Joined {new Date(details.created_at).toLocaleDateString()}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-gray-500">No additional details available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard; 