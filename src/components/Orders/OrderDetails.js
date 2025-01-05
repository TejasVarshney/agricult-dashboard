import { Package } from 'lucide-react';
import { orderService } from '../../services/api';
import { formatDate } from '../../utils/formatters';

export const OrderDetails = ({ 
  order,
  bids,
  loading,
  onSellerClick,
  onOrderUpdate
}) => {
  const handleBidApprove = async (bidId) => {
    try {
      console.log('Starting bid approval process for bid:', bidId);

      // First update the bid status
      const updatedBid = await orderService.updateBidStatus(bidId, 'approved');
      console.log('Bid status updated:', updatedBid);
      
      // Then update the order status
      const updatedOrder = await orderService.updateOrderStatus(order.id, 'approved');
      console.log('Order status updated:', updatedOrder);

      // Notify parent to refresh the data
      if (onOrderUpdate) {
        await onOrderUpdate();
      }
      
    } catch (error) {
      console.error('Error approving bid:', error);
      // You might want to show an error notification here
    }
  };

  const handleBidReject = async (bidId) => {
    try {
      await orderService.updateBidStatus(bidId, 'rejected');
      onOrderUpdate();
    } catch (error) {
      console.error('Error rejecting bid:', error);
    }
  };

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <Package size={32} className="mb-2" />
        <p>Select an order to view details</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Order Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-4">Order Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Order ID</span>
            <p className="font-medium">#{order.id}</p>
          </div>
          <div>
            <span className="text-gray-500">Status</span>
            <p className="font-medium capitalize">{order.status}</p>
          </div>
          <div>
            <span className="text-gray-500">Region</span>
            <p className="font-medium">{order.region}</p>
          </div>
          <div>
            <span className="text-gray-500">Loading Date</span>
            <p className="font-medium">{formatDate(order.loading_date)}</p>
          </div>
        </div>
      </div>

      {/* Bids Section */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Bids</h4>
        {loading ? (
          <div className="text-center py-4 text-gray-500">Loading bids...</div>
        ) : bids.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No bids yet</div>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <div 
                key={bid.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span 
                      className="text-blue-600 cursor-pointer hover:underline"
                      onClick={(e) => onSellerClick(bid.seller_id, e)}
                    >
                      Seller #{bid.seller_id}
                    </span>
                    <p className="text-sm text-gray-500">
                      {formatDate(bid.created_at)}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span className={`
                      px-2 py-1 rounded-full capitalize
                      ${bid.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        bid.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}
                    `}>
                      {bid.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Price per ton</span>
                    <p className="font-medium">₹{bid.price_per_ton}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Total amount</span>
                    <p className="font-medium">₹{bid.price_per_ton * order.quantity}</p>
                  </div>
                </div>

                {/* Action Buttons - Only show for pending bids */}
                {bid.status === 'pending' && order.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleBidApprove(bid.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                        transition-colors duration-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBidReject(bid.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                        transition-colors duration-200"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 