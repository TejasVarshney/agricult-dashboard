const BidDialogueBox = ({ bid, onClose }) => {
  if (!bid) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Bid Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Bid ID</p>
            <p className="font-medium">#{bid.id.slice(0, 8)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">RFQ ID</p>
            <p className="font-medium">#{bid.rfq_id.slice(0, 8)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Price per Ton</p>
            <p className="font-medium">{formatCurrency(bid.price_per_ton)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="font-medium">{formatCurrency(bid.total_price)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium capitalize">{bid.status}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Loading Date</p>
            <p className="font-medium">{formatDate(bid.loading_date)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">{formatDate(bid.created_at)}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Updated At</p>
            <p className="font-medium">{formatDate(bid.updated_at)}</p>
          </div>
        </div>

        {bid.photos && bid.photos.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Photos</p>
            <div className="flex flex-wrap gap-2">
              {bid.photos.map((photo, index) => (
                <img 
                  key={index}
                  src={photo}
                  alt={`Bid photo ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BidDialogueBox; 