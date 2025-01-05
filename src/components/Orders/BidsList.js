export const BidCard = ({ 
  bid, 
  orderStatus,
  onSellerClick, 
  onApprove,
  formatCurrency, 
  formatDate 
}) => {
  const handleApprove = async (e) => {
    e.stopPropagation();
    try {
      await onApprove(bid.id);
    } catch (error) {
      console.error('Error approving bid:', error);
      // You might want to show an error toast here
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
      {/* ... existing bid info ... */}
      
      {orderStatus === 'pending' && bid.status === 'pending' && (
        <div className="flex gap-2 mt-2">
          <button 
            onClick={handleApprove}
            className="inline-flex items-center px-2.5 py-1.5 bg-green-50 text-green-700 
              hover:bg-green-100 rounded-md transition-colors duration-200"
          >
            Approve
          </button>
          {/* ... other buttons ... */}
        </div>
      )}
    </div>
  );
}; 