export const ErrorState = ({ message = 'Something went wrong' }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="text-center text-red-500">{message}</div>
  </div>
); 