export const LoadingState = ({ message = 'Loading data...' }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="text-center text-gray-500">{message}</div>
  </div>
); 