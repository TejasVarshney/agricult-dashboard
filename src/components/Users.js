import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';
import { LoadingState } from './common/LoadingState';
import { ErrorState } from './common/ErrorState';
import DialogueBox from './user_dialogueBox';

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("buyer");
  const [selectedUser, setSelectedUser] = useState(null);

  const { 
    data: buyerData, 
    loading: buyerLoading, 
    error: buyerError 
  } = useApi(apiService.users.getBuyers);

  const { 
    data: sellerData, 
    loading: sellerLoading, 
    error: sellerError 
  } = useApi(apiService.users.getSellers);

  if (buyerLoading || sellerLoading) {
    return <LoadingState />;
  }

  if (buyerError || sellerError) {
    return <ErrorState message={buyerError || sellerError} />;
  }

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDialogue = () => {
    setSelectedUser(null);
  };

  const renderUsersTable = (data) => (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {activeTab === 'buyer' ? 'Full Name' : 'License Number'}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {activeTab === 'buyer' ? 'Business Name' : 'Email'}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {activeTab === 'buyer' ? 'Location' : 'Region'}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((user) => (
          <tr key={user.id} onClick={() => handleRowClick(user)} className="cursor-pointer">
            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              #{user.id.slice(0, 8)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {activeTab === 'buyer' ? user.full_name : user.license_number}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {activeTab === 'buyer' ? user.business_name : user.email || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {activeTab === 'buyer' ? user.location : user.region}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const currentData = activeTab === "buyer" ? buyerData : sellerData;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            {activeTab === "buyer" ? "Buyer" : "Seller"} Data
          </h3>
          <div className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
            <div className="flex items-center gap-1 rounded-md bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("buyer")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "buyer"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Buyer Data ({buyerData.length})
              </button>
              <button
                onClick={() => setActiveTab("seller")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "seller"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Seller Data ({sellerData.length})
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {currentData.length > 0 ? (
          renderUsersTable(currentData)
        ) : (
          <div className="text-center py-6 text-gray-500">
            No {activeTab} data found
          </div>
        )}
      </div>
      {selectedUser && <DialogueBox user={selectedUser} onClose={handleCloseDialogue} />}
    </div>
  );
};

export default UsersPage;