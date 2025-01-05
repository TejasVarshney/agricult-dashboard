import { Package } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

export const OrderList = ({ 
  loading, 
  orders, 
  selectedOrder,
  onOrderSelect,
  onBuyerClick,
  error 
}) => {
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Package size={32} className="mb-2" />
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => onOrderSelect(order)}
          className={`
            p-4 cursor-pointer transition-all duration-200
            ${selectedOrder?.id === order.id 
              ? 'bg-blue-50 border-l-4 border-blue-500' 
              : 'hover:bg-gray-50 border-l-4 border-transparent'
            }
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium text-gray-900">
                  #{order.id.slice(0, 8)}
                </h3>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-medium
                  ${getStatusStyles(order.status)}
                `}>
                  {order.status}
                </span>
              </div>
              <p 
                className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyerClick(order.buyer_id);
                }}
              >
                {order.buyer_name}
              </p>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 flex items-center gap-4">
            <span>Qty: {order.quantity}</span>
            <span>•</span>
            <span>{order.region}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const getStatusStyles = (status) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
  };
  return styles[status] || 'bg-gray-100 text-gray-800';
}; 