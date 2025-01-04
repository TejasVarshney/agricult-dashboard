import { 
  Users, 
  ShoppingCart, 
  User, 
  Store,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const RupeeIcon = () => (
  <div className="font-bold text-green-600 text-xl">₹</div>
);

const backendLink = "http://localhost:1234";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    buyers: 0,
    sellers: 0,
    activeOrders: 0,
    pastOrders: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buyersRes, sellersRes, activeOrdersRes, totalOrdersRes] = await Promise.all([
          fetch(`${backendLink}/api/buyers/count`),
          fetch(`${backendLink}/api/sellers/count`),
          fetch(`${backendLink}/api/rfqs/count/active`),
          fetch(`${backendLink}/api/rfqs/count/total`),
        ]);

        const buyers = await buyersRes.json();
        const sellers = await sellersRes.json();
        const activeOrders = await activeOrdersRes.json();
        const totalOrders = await totalOrdersRes.json();

        setData({
          buyers: buyers.count || 0,
          sellers: sellers.count || 0,
          activeOrders: activeOrders.count || 0,
          totalOrders: totalOrders.count || 0,
          totalUsers: (buyers.count || 0) + (sellers.count || 0),
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const metrics = [
    { 
      title: 'Revenue', 
      value: '₹4,32,000', // Note: You'll need to add a revenue endpoint to your backend
      icon: <RupeeIcon />, 
      // trend: '+12%'  // You'll need to calculate this
    },
    { 
      title: 'Total Orders', 
      value: loading ? '...' : data.totalOrders.toLocaleString(), 
      icon: <ShoppingCart className="text-blue-600" size={24} />, 
      // trend: '+5%'  // You'll need to calculate this
    },
    { 
      title: 'Total Users', 
      value: loading ? '...' : data.totalUsers.toLocaleString(), 
      icon: <Users className="text-purple-600" size={24} />, 
      // trend: '+8%'  // You'll need to calculate this
    },
    { 
      title: 'Buyers', 
      value: loading ? '...' : data.buyers.toLocaleString(), 
      icon: <User className="text-orange-600" size={24} />, 
      // trend: '+15%'  // You'll need to calculate this
    },
    { 
      title: 'Sellers', 
      value: loading ? '...' : data.sellers.toLocaleString(), 
      icon: <Store className="text-indigo-600" size={24} />, 
      // trend: '+3%'  // You'll need to calculate this
    }
  ];

  return (
    <>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>{metric.icon}</div>
                <h3 className="text-gray-600 text-lg font-semibold">{metric.title}</h3>
              </div>
              <span className="text-sm text-green-600 font-semibold">{metric.trend}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-3">
        <h2 className="text-lg font-semibold">Activities</h2>
      </div>
    </>
  );
};

export default HomePage;