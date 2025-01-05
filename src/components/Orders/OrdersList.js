import { Package } from 'lucide-react';
import { OrderItem } from './OrderItem';
import { useState, useEffect } from 'react';

export const OrdersList = ({ 
  loading, 
  orders, 
  buyerDetails, 
  selectedOrder,
  onOrderClick,
  onBuyerClick,
  searchQuery = ''
}) => {
  const [width, setWidth] = useState(280); // Decreased from 320px to 280px
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      setWidth(Math.max(200, Math.min(newWidth, 400))); // Decreased min/max from 250/600 to 200/400
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const buyerName = buyerDetails[order.buyer_id]?.business_name?.toLowerCase() || '';
    
    return (
      order.id.toLowerCase().includes(searchLower) ||
      buyerName.includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      order.region.toLowerCase().includes(searchLower)
    );
  });

  const content = loading ? (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-400">Loading orders...</div>
    </div>
  ) : !filteredOrders.length ? (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <Package size={32} className="mb-2" />
      <p>{orders.length ? 'No matching orders found' : 'No orders found'}</p>
    </div>
  ) : (
    <div className="divide-y divide-gray-50">
      {filteredOrders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          buyerName={buyerDetails[order.buyer_id]?.business_name}
          isSelected={selectedOrder?.id === order.id}
          onOrderClick={onOrderClick}
          onBuyerClick={onBuyerClick}
        />
      ))}
    </div>
  );

  return (
    <div className="relative flex" style={{ width: `${width}px` }}>
      {content}
      <div
        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-gray-300 active:bg-gray-400"
        onMouseDown={() => setIsResizing(true)}
      />
    </div>
  );
}; 