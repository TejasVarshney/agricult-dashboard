import React from 'react';
import { DialogBox } from './common/DialogBox';
import { formatDate, formatCurrency } from '../utils/formatters';

const BidDialogueBox = ({ bid, onClose }) => {
  if (!bid) return null;

  const InfoField = ({ label, value }) => (
    <div className="mb-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );

  return (
    <DialogBox
      isOpen={!!bid}
      onClose={onClose}
      title="Bid Details"
    >
      <div className="bg-gray-50 px-4 py-5 sm:rounded-lg sm:p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <InfoField 
            label="Bid ID" 
            value={`#${bid.id.slice(0, 8)}`} 
          />
          
          <InfoField 
            label="RFQ ID" 
            value={`#${bid.rfq_id.slice(0, 8)}`} 
          />
          
          <InfoField 
            label="Price per Ton" 
            value={formatCurrency(bid.price_per_ton)} 
          />
          
          <InfoField 
            label="Total Price" 
            value={formatCurrency(bid.total_price)} 
          />
          
          <InfoField 
            label="Status" 
            value={
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${bid.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                  bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                {bid.status}
              </span>
            }
          />
          
          <InfoField 
            label="Loading Date" 
            value={formatDate(bid.loading_date)} 
          />
          
          <InfoField 
            label="Created At" 
            value={formatDate(bid.created_at)} 
          />
          
          <InfoField 
            label="Updated At" 
            value={formatDate(bid.updated_at)} 
          />
        </dl>

        {bid.photos && bid.photos.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">Photos</h4>
            <div className="grid grid-cols-3 gap-4">
              {bid.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={photo}
                    alt={`Bid photo ${index + 1}`}
                    className="h-24 w-24 rounded-lg object-cover ring-1 ring-gray-200 group-hover:ring-2 group-hover:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Close
        </button>
      </div>
    </DialogBox>
  );
};

export default BidDialogueBox; 