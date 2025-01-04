import React from 'react';
import { DialogBox } from './common/DialogBox';
import { formatDate } from '../utils/formatters';

const OrderDialogueBox = ({ order, onClose }) => {
  if (!order) return null;

  const InfoField = ({ label, value }) => (
    <div className="mb-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );

  return (
    <DialogBox
      isOpen={!!order}
      onClose={onClose}
      title="Order Details"
    >
      <div className="bg-gray-50 px-4 py-5 sm:rounded-lg sm:p-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <InfoField 
            label="Order ID" 
            value={`#${order.id.slice(0, 8)}`} 
          />
          
          <InfoField 
            label="Buyer ID" 
            value={`#${order.buyer_id.slice(0, 8)}`} 
          />
          
          <InfoField 
            label="Quantity" 
            value={order.quantity} 
          />
          
          <InfoField 
            label="Grade" 
            value={order.grade} 
          />
          
          <InfoField 
            label="Region" 
            value={order.region} 
          />
          
          <InfoField 
            label="Status" 
            value={
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${order.status === 'active' ? 'bg-green-100 text-green-800' : 
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'}`}>
                {order.status}
              </span>
            }
          />
          
          <InfoField 
            label="Loading Date" 
            value={formatDate(order.loading_date)} 
          />
          
          <InfoField 
            label="Created At" 
            value={formatDate(order.created_at)} 
          />
        </dl>
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

export default OrderDialogueBox; 