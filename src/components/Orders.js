import { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [activeRes, pastRes] = await Promise.all([
          fetch('http://localhost:1234/orders/active'),
          fetch('http://localhost:1234/orders/past')
        ]);

        const activeData = await activeRes.json();
        const pastData = await pastRes.json();

        setActiveOrders(activeData.data || []);
        setPastOrders(pastData.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatQuality = (quality) => {
    switch (quality) {
      case 0: return "Single Filter";
      case 1: return "Double Filter";
      case 2: return "Mixed Filter";
      default: return "unknown";
    }
  };

  const renderOrdersTable = (orders) => (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Username
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quality
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Quantity
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Region
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              #{order.orderID}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.userName || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatDate(order.created_at)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatQuality(order.quality)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {(order.quantity || 0)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.region || 'N/A'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${order.status ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {order.status ? 'Active' : 'Completed'}
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
        <div className="text-center text-gray-500">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
          <div className="inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
            <div className="flex items-center gap-1 rounded-md bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab("active")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "active"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Active Orders ({activeOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "past"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Past Orders ({pastOrders.length})
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {activeTab === "active" && (
          activeOrders.length > 0 ? (
            renderOrdersTable(activeOrders)
          ) : (
            <div className="text-center py-6 text-gray-500">No active orders found</div>
          )
        )}
        
        {activeTab === "past" && (
          pastOrders.length > 0 ? (
            renderOrdersTable(pastOrders)
          ) : (
            <div className="text-center py-6 text-gray-500">No past orders found</div>
          )
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
