import { ORDER_STATUSES } from '../../constants/orderConstants';

export const StatusFilter = ({ value, onChange }) => {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1">
      {ORDER_STATUSES.map(status => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`
            inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium
            transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            ${value === status 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}; 