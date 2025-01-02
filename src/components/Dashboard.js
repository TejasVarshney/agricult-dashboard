import React, { useState } from 'react';
import { 
  Home,
  Package,
  Settings,
  HelpCircle
} from 'lucide-react';

import HomePage from './Home';
import OrdersPage from './Orders';
import SettingsPage from './Settings';

// Settings Page Component

// Help Page Component
const HelpPage = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
    <p className="text-gray-600">Help and documentation page coming soon...</p>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomePage />;
      case 'Orders':
        return <OrdersPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Help':
        return <HelpPage />;
      default:
        return <HomePage />;
    }
  };

  const navItems = [
    { name: 'Home', icon: <Home size={20} /> },
    { name: 'Orders', icon: <Package size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
    { name: 'Help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800
                ${activeTab === item.name ? 'bg-gray-100 text-gray-800' : ''}`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{activeTab}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;