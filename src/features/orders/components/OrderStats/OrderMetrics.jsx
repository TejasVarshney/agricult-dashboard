import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

export const OrderMetrics = ({ orders }) => {
  const stats = orders.reduce((acc, order) => {
    acc.total++;
    acc[order.status]++;
    return acc;
  }, { total: 0, active: 0, pending: 0, completed: 0 });

  const metrics = [
    { 
      label: 'Total Orders', 
      value: stats.total,
      icon: Package,
      color: 'blue' 
    },
    { 
      label: 'Active Orders', 
      value: stats.active,
      icon: Clock,
      color: 'green' 
    },
    { 
      label: 'Pending Orders', 
      value: stats.pending,
      icon: CheckCircle,
      color: 'yellow' 
    },
    { 
      label: 'Completed Orders', 
      value: stats.completed,
      icon: XCircle,
      color: 'gray' 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div className={`bg-${color}-50 rounded-lg p-2`}>
              <Icon className={`w-6 h-6 text-${color}-500`} />
            </div>
            <span className="text-sm font-medium text-gray-500">{label}</span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}; 