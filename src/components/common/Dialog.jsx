import { X } from 'lucide-react';

export const Dialog = ({ 
  title,
  children,
  onClose,
  maxWidth = 'md'
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className={`bg-white p-6 rounded-lg shadow-xl w-full max-w-${maxWidth}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}; 