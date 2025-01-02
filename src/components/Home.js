import { 
    Users, 
    ShoppingCart, 
    User, 
    Store,
  } from 'lucide-react';
  
const RupeeIcon = () => (
    <div className="font-bold text-green-600 text-xl">₹</div>
  );
  
  // Home Page Component
  const HomePage = () => {
    const metrics = [
      { title: 'Revenue', value: '₹4,32,000', icon: <RupeeIcon />, trend: '+12%' },
      { title: 'Total Orders', value: '1,240', icon: <ShoppingCart className="text-blue-600" size={24} />, trend: '+5%' },
      { title: 'Total Users', value: '3,560', icon: <Users className="text-purple-600" size={24} />, trend: '+8%' },
      { title: 'Buyers', value: '2,840', icon: <User className="text-orange-600" size={24} />, trend: '+15%' },
      { title: 'Sellers', value: '720', icon: <Store className="text-indigo-600" size={24} />, trend: '+3%' }
    ];
  
    const recentOrders = [
      { id: '#4321', customer: 'John Doe', product: 'Laptop', amount: '₹82,999', status: 'Delivered' },
      { id: '#4322', customer: 'Jane Smith', product: 'Smartphone', amount: '₹58,499', status: 'Processing' },
      { id: '#4323', customer: 'Bob Johnson', product: 'Headphones', amount: '₹12,499', status: 'Pending' },
      { id: '#4324', customer: 'Alice Brown', product: 'Tablet', amount: '₹37,499', status: 'Shipped' },
    ];
  
    return (
      <>
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div>{metric.icon}</div>
                <span className="text-sm text-green-600 font-semibold">{metric.trend}</span>
              </div>
              <h3 className="text-gray-600 text-sm">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
            </div>
          ))}
        </div>
  
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Pending' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  export default HomePage;