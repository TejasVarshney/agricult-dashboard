import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { 
  Home,
  Package,
  Settings,
  HelpCircle,
  Gavel,
  User,
} from 'lucide-react';

import { Sidebar } from './Sidebar';
import { HomePage, OrdersPage, SettingsPage, UsersPage, BidsPage } from '../features';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Users', path: '/users', icon: User },
  { name: 'Orders', path: '/orders', icon: Package },
  { name: 'Bids', path: '/bids', icon: Gavel },
  { name: 'Help', path: '/help', icon: HelpCircle },
];

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar items={navItems} onNavigate={navigate} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/bids" element={<BidsPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}; 