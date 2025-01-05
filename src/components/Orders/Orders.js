import { useState, useCallback } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { orderService } from '../../services/api';
import { OrdersList } from './OrdersList';
import { OrderDetails } from './OrderDetails';
import { TabFilter } from '../common/TabFilter';
import { BuyerProfileDialog, SellerProfileDialog } from '../dialogs';
import { Search } from 'lucide-react';
import debounce from 'lodash/debounce';

const OrdersPage = () => {
  const { loading, orders, buyerDetails } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [relatedBids, setRelatedBids] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [selectedBuyerId, setSelectedBuyerId] = useState(null);
  const [selectedSellerId, setSelectedSellerId] = useState(null);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInputValue);
      debouncedSearch.cancel();
    }
  };

  const handleOrderClick = async (order) => {
    setSelectedOrder(order);
    
    if (!relatedBids[order.id]) {
      try {
        const bids = await orderService.getBidsForOrder(order.id);
        setRelatedBids(prev => ({ ...prev, [order.id]: bids }));
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    }
  };

  const handleOrderUpdate = async () => {
    try {
      // Refresh the orders data
      const updatedOrders = await orderService.getOrders();
      setOrders(updatedOrders);
      
      // If there's a selected order, refresh its bids
      if (selectedOrder) {
        const updatedBids = await orderService.getBidsForOrder(selectedOrder.id);
        setRelatedBids(prev => ({
          ...prev,
          [selectedOrder.id]: updatedBids
        }));
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  // Filter orders based on both search and tab
  const filteredOrders = orders.filter(order => {
    // First filter by tab
    const matchesTab = activeTab === "all" || order.status === activeTab;
    
    // Then filter by search if there is a search query
    if (!searchQuery) return matchesTab;
    
    const searchLower = searchQuery.toLowerCase();
    const buyerName = buyerDetails[order.buyer_id]?.business_name?.toLowerCase() || '';
    
    return matchesTab && (
      order.id.toLowerCase().includes(searchLower) ||
      buyerName.includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.region.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Orders Overview
          </h2>
          
          {/* Search and Filter Section */}
          <div className="flex gap-4 items-center mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search orders by ID, buyer, status, or region..."
                value={searchInputValue}
                onChange={handleSearchInput}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 
                  focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Tab Filter */}
            <TabFilter
              tabs={["all", "active", "pending", "closed"]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrdersList
          loading={loading}
          orders={filteredOrders}
          buyerDetails={buyerDetails}
          selectedOrder={selectedOrder}
          onOrderClick={handleOrderClick}
          onBuyerClick={(id, e) => {
            e.stopPropagation();
            setSelectedBuyerId(id);
          }}
          searchQuery={searchQuery}
        />

        <OrderDetails
          order={selectedOrder}
          bids={relatedBids[selectedOrder?.id] || []}
          loading={loading}
          onSellerClick={(id, e) => {
            e.stopPropagation();
            setSelectedSellerId(id);
          }}
          onOrderUpdate={handleOrderUpdate}
        />
      </div>

      {/* Dialogs */}
      {selectedSellerId && (
        <SellerProfileDialog
          sellerId={selectedSellerId}
          onClose={() => setSelectedSellerId(null)}
        />
      )}

      {selectedBuyerId && (
        <BuyerProfileDialog
          buyerId={selectedBuyerId}
          onClose={() => setSelectedBuyerId(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage; 