import { useState, useEffect } from 'react';

const UsersPage = () => {
  const [buyerData, setBuyerData] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("buyer");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buyerRes, sellerRes] = await Promise.all([
          fetch('http://localhost:1234/buyers'),
          fetch('http://localhost:1234/sellers')  // Changed to plural for consistency
        ]);

        if (!buyerRes.ok || !sellerRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const buyersData = await buyerRes.json();
        const sellersData = await sellerRes.json();

        setBuyerData(buyersData.data || []);
        setSellerData(sellersData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderUsersTable = (data) => (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            User ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {activeTab === 'buyer' ? 'Business Name' : 'License No.'}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phone no.
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((user) => ( 
          <tr key={user.id}>
            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              #{user.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.fullName || user.userName || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.businessName || user.license || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.email || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.phoneNumber || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {user.location || user.region || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${user.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {user.isOnline ? 'Online' : 'Offline'}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500">Loading data...</div>
      </div>
    );
  }
  console.log(activeTab)
  const currentData = activeTab === "buyer" ? buyerData : sellerData;
//   const dataCount = activeTab === "buyer" ? buyerData.length : sellerData.length;

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
    </div>
  );
};

export default UsersPage;