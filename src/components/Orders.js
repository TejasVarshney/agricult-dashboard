import { useState, useEffect } from 'react';
import OrderDialogueBox from './order_dialogueBox';

const OrdersPage = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:1234/api/rfqs');
        const data = await response.json();

        // Store all orders
        setAllOrders(data.data.reverse());

        // Group orders by status
        const grouped = data.data.reduce((acc, order) => {
          if (order.status === 'active') {
            acc.active.push(order);
          } else if (order.status === 'pending') {
            acc.pending.push(order);
          } else if (order.status === 'closed') {
            acc.closed.push(order);
          }
          return acc;
        }, { active: [], pending: [], closed: [] });

        // Sort each group by date (newest first)
        setActiveOrders(grouped.active.reverse());
        setPendingOrders(grouped.pending.reverse());
        setClosedOrders(grouped.closed.reverse());
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
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const renderOrdersTable = (orders) => (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Buyer ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Loading Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Grade
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
          <tr 
            key={order.id}
            onClick={() => handleRowClick(order)}
            className="hover:bg-gray-50 cursor-pointer"
          >
            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              #{order.id.slice(0, 8)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              #{order.buyer_id.slice(0, 8)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {formatDate(order.loading_date)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.grade}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.region}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
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
                onClick={() => setActiveTab("all")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "all"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                All ({allOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "active"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Active ({activeOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "pending"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Pending ({pendingOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("closed")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  activeTab === "closed"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Closed ({closedOrders.length})
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {activeTab === "all" && (
          allOrders.length > 0 ? (
            renderOrdersTable(allOrders)
          ) : (
            <div className="text-center py-6 text-gray-500">No orders found</div>
          )
        )}
        
        {activeTab === "active" && (
          activeOrders.length > 0 ? (
            renderOrdersTable(activeOrders)
          ) : (
            <div className="text-center py-6 text-gray-500">No active orders found</div>
          )
        )}
        
        {activeTab === "pending" && (
          pendingOrders.length > 0 ? (
            renderOrdersTable(pendingOrders)
          ) : (
            <div className="text-center py-6 text-gray-500">No pending orders found</div>
          )
        )}
        
        {activeTab === "closed" && (
          closedOrders.length > 0 ? (
            renderOrdersTable(closedOrders)
          ) : (
            <div className="text-center py-6 text-gray-500">No closed orders found</div>
          )
        )}
      </div>

      {selectedOrder && (
        <OrderDialogueBox
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
