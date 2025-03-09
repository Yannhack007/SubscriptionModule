"use client";
import React, { useState, useEffect } from 'react';

import { 
  Users, CreditCard, Tag, Package, Plus, Search,
  TrendingUp, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import OverviewTab from '../components/OverviewTab';
import PlanManagement from '../components/PlanManagement';
import PromoCodeManagement from '../components/PromoCodeManagement';
import SubscriptionHistory from '../components/SubscriptionHistory';


const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');


  return (
    <div className="min-h-screen bg-gray-50">
    
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'overview' ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp size={20} />
            <span>Overview</span>
          </button>
          
          <button
            onClick={() => setActiveTab('plans')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'plans' ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Package size={20} />
            <span>Plans</span>
          </button>
          
          <button
            onClick={() => setActiveTab('promo')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'promo' ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Tag size={20} />
            <span>Promo codes</span>
          </button>
          
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'subscriptions' ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            <span>Subscriptions</span>
          </button>
        </nav>
      </div>
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'plans' && <PlanManagement />}
      {activeTab === 'promo' && <PromoCodeManagement />}
      {activeTab === 'subscriptions' && <SubscriptionHistory />}
    </div>
  );
};

export default DashboardAdmin;