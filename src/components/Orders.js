import { Package, Gavel, Filter, Search, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import BuyerProfileDialog from './BuyerProfileDialog';
import SellerProfileDialog from './SellerProfileDialog';

const backendLink = "http://localhost:1234";

// Utility Components
const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[status] || styles.closed}`}>
      {status}
    </span>
  );
};

const OrderCard = ({ order, buyerDetails, isSelected, onClick, onBuyerClick, formatDate }) => (
  <div
    onClick={onClick}
    className={`
      p-5 cursor-pointer transition-all border-l-4
      ${isSelected 
        ? 'bg-blue-50 border-l-blue-500' 
        : 'hover:bg-gray-50 border-l-transparent'
      }
    `}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h4 className="text-base font-medium text-gray-900">
            {buyerDetails[order.buyer_id]?.business_name || 'Loading...'}
          </h4>
          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
            #{order.id.slice(0, 8)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">{order.quantity} tons</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-500">{order.grade}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-gray-500">
            Created: {formatDate(order.created_at)}
          </span>
          <button 
            className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
            onClick={(e) => onBuyerClick(order.buyer_id, e)}
          >
            View Buyer
          </button>
        </div>
      </div>
    </div>
  </div>
);

const OrderDetails = ({ order, formatDate, getStatusColor }) => (
  <div className="grid grid-cols-3 gap-4 text-sm">
    <DetailItem label="Order ID" value={`#${order.id.slice(0, 8)}`} />
    <DetailItem label="Status" value={order.status} isStatus />
    <DetailItem label="Created" value={formatDate(order.created_at)} />
    <DetailItem label="Region" value={order.region} />
    <DetailItem label="Quantity" value={`${order.quantity} tons`} />
    <DetailItem label="Grade" value={order.grade} />
    {order.notes && (
      <DetailItem label="Notes" value={order.notes} fullWidth />
    )}
    {order.special_requirements && (
      <DetailItem label="Requirements" value={order.special_requirements} fullWidth />
    )}
  </div>
);

const DetailItem = ({ label, value, fullWidth = false, isStatus = false }) => (
  <div className={`${fullWidth ? "col-span-3" : ""} bg-gray-50 rounded-md p-2`}>
    <p className="text-xs font-medium text-gray-500">{label}</p>
    {isStatus ? (
      <StatusBadge status={value} />
    ) : (
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    )}
  </div>
);

const BidCard = ({ bid, onSellerClick, formatCurrency, formatDate }) => (
  <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">
          #{bid.seller_id.slice(0, 8)}
        </span>
        <button 
          className="text-xs text-blue-600 hover:text-blue-700"
          onClick={(e) => onSellerClick(bid.seller_id, e)}
        >
          View
        </button>
      </div>
      <StatusBadge status={bid.status} />
    </div>

    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <p className="text-xs text-gray-500">Per ton</p>
        <p className="font-medium text-gray-900">{formatCurrency(bid.price_per_ton)}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Total</p>
        <p className="font-medium text-gray-900">{formatCurrency(bid.total_price)}</p>
      </div>
    </div>

    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
      <span>{formatDate(bid.created_at)}</span>
      {bid.status === 'pending' && (
        <div className="flex gap-2">
          <button 
            className="inline-flex items-center px-2.5 py-1.5 bg-green-50 text-green-700 
              hover:bg-green-100 rounded-md transition-colors duration-200"
          >
            Approve
          </button>
          <button 
            className="inline-flex items-center px-2.5 py-1.5 bg-red-50 text-red-700 
              hover:bg-red-100 rounded-md transition-colors duration-200"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  </div>
);

const OrderInfoCard = ({ order, formatDate, getStatusColor }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-base font-semibold text-gray-900">Order Information</h3>
      <StatusBadge status={order.status} />
    </div>
    <OrderDetails 
      order={order} 
      formatDate={formatDate}
      getStatusColor={getStatusColor}
    />
  </div>
);

const BidsSection = ({ bids, handleSellerClick, formatCurrency, formatDate }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-base font-semibold text-gray-900">Bids</h3>
      <span className="text-sm text-gray-500">
        {bids?.length || 0} total
      </span>
    </div>
    <div className="grid gap-3">
      {bids?.map((bid) => (
        <BidCard 
          key={bid.id} 
          bid={bid} 
          onSellerClick={handleSellerClick}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      ))}
    </div>
  </div>
);

const EmptyDetailsState = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400">
    <Package size={48} className="mb-4 opacity-50" />
    <p className="text-lg font-medium">Select an order to view details</p>
    <p className="text-sm mt-2">Choose from the list on the left</p>
  </div>
);

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [relatedBids, setRelatedBids] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [buyerDetails, setBuyerDetails] = useState({});
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${backendLink}/api/rfqs`);
        const data = await response.json();
        const orders = data.data || [];
        setAllOrders(orders);

        // Fetch buyer details for each order
        const buyerPromises = orders.map(order => 
          fetch(`${backendLink}/api/buyers/${order.buyer_id}`)
            .then(res => res.json())
            .then(data => ({ [order.buyer_id]: data.data }))
        );
        
        const buyersData = await Promise.all(buyerPromises);
        const buyersMap = buyersData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        setBuyerDetails(buyersMap);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Fetch bids when an order is selected
  useEffect(() => {
    const fetchBids = async () => {
      if (!selectedOrder) return;
      
      try {
        const response = await fetch(`${backendLink}/api/quotes/rfq/${selectedOrder.id}`);
        const data = await response.json();
        setRelatedBids({
          ...relatedBids,
          [selectedOrder.id]: data.data || []
        });
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    fetchBids();
  }, [selectedOrder]);

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

  const handleOrderClick = (order) => {
    if (selectedOrder?.id === order.id) {
      // If clicking the same order, toggle expanded state
      setExpandedOrderId(expandedOrderId === order.id ? null : order.id);
    } else {
      // If clicking a different order, select it and expand it
    setSelectedOrder(order);
      setExpandedOrderId(order.id);
    }
  };

  const filteredOrders = allOrders.filter(order => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const handleBuyerClick = (buyerId, event) => {
    event.stopPropagation(); // Prevent order selection when clicking buyer
    setSelectedBuyerId(buyerId);
  };

  const handleSellerClick = (sellerId, event) => {
    event.stopPropagation();
    setSelectedSellerId(sellerId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredOrders.length} orders total
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4">
          {['active', 'pending', 'closed'].map(status => (
            <div key={status} className="bg-white rounded-lg shadow-sm px-4 py-3 border border-gray-100">
              <p className="text-sm text-gray-500 capitalize">{status}</p>
              <p className="text-lg font-semibold text-gray-900">
                {allOrders.filter(order => order.status === status).length}
              </p>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Search and Filters */}
        <SearchAndFilters 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[700px]">
          {/* Orders List */}
          <div className="lg:col-span-2 lg:border-r border-gray-200">
            <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
              {loading ? (
                <LoadingState />
              ) : filteredOrders.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      buyerDetails={buyerDetails}
                      isSelected={selectedOrder?.id === order.id}
                      onClick={() => handleOrderClick(order)}
                      onBuyerClick={handleBuyerClick}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-3 bg-gray-50">
            {selectedOrder ? (
              <div className="p-6 space-y-6">
                <OrderInfoCard 
                  order={selectedOrder} 
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
                <BidsSection 
                  bids={relatedBids[selectedOrder.id]} 
                  handleSellerClick={handleSellerClick}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </div>
            ) : (
              <EmptyDetailsState />
            )}
          </div>
        </div>
      </main>

      {/* Dialogs */}
      {selectedBuyerId && (
        <BuyerProfileDialog
          buyerId={selectedBuyerId}
          onClose={() => setSelectedBuyerId(null)}
        />
      )}
      {selectedSellerId && (
        <SellerProfileDialog
          sellerId={selectedSellerId}
          onClose={() => setSelectedSellerId(null)}
        />
      )}
    </div>
  );
};

// Additional Components
const SearchAndFilters = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200 p-4">
    <div className="flex items-center gap-4">
      <SearchBar />
      <TabFilter activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  </div>
);

const SearchBar = () => (
  <div className="flex-1 relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
    <input
      type="search"
      placeholder="Search orders..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const TabFilter = ({ activeTab, setActiveTab }) => (
  <div className="inline-flex p-1 bg-gray-100 rounded-lg">
    {["all", "active", "pending", "closed"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`
          px-4 py-2 rounded-md capitalize text-sm font-medium transition-all
          ${activeTab === tab
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
          }
        `}
      >
        {tab}
      </button>
    ))}
  </div>
);

const LoadingState = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-pulse text-gray-400">Loading orders...</div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
    <Package size={32} className="mb-2" />
    <p>No orders found</p>
  </div>
);

export default OrdersPage;
