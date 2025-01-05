import { useState } from 'react';
import { useOrders } from './hooks/useOrders';
import { Package, Filter, Search, ArrowLeft } from 'lucide-react';
import { 
  OrderList, 
  OrderDetails, 
  StatusFilter,
  DateRangeFilter,
  OrderMetrics 
} from './components';
import { BuyerProfileDialog, SellerProfileDialog } from '@/components/common/dialogs';

const OrdersPage = () => {
  const { loading, orders, error } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: ''
  });
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredOrders = orders.filter(order => {
    if (filters.status !== 'all' && order.status !== filters.status) return false;
    if (filters.search && !order.id.includes(filters.search)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Streamlined Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            {filteredOrders.length} orders found
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
              ${showFilters 
                ? 'bg-blue-50 text-blue-600' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <OrderMetrics orders={orders} />

      {/* Main Content Container */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Search Bar - Always Visible */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search orders by ID, buyer, or status..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 items-center">
                <StatusFilter 
                  value={filters.status} 
                  onChange={value => handleFilterChange('status', value)} 
                />
                <DateRangeFilter 
                  value={filters.dateRange}
                  onChange={value => handleFilterChange('dateRange', value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Orders Grid with Smooth Transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Orders List */}
          <div className="lg:border-r border-gray-200 overflow-y-auto max-h-[calc(100vh-300px)]">
            <OrderList
              loading={loading}
              orders={filteredOrders}
              selectedOrder={selectedOrder}
              onOrderSelect={setSelectedOrder}
              onBuyerClick={setSelectedBuyerId}
              error={error}
            />
          </div>

          {/* Order Details with Conditional Rendering */}
          <div className="lg:col-span-2 bg-gray-50">
            {selectedOrder ? (
              <OrderDetails
                order={selectedOrder}
                onSellerClick={setSelectedSellerId}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Package size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">Select an order to view details</p>
                <p className="text-sm mt-2">Choose from the list on the left</p>
              </div>
            )}
          </div>
        </div>
      </div>

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

export default OrdersPage; 