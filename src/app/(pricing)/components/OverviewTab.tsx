import React, { useState } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

import { 
  Users, CreditCard, Tag, Package, Plus, Search,
  TrendingUp, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface Plan {
  planId: string;
  category: string;
  description: string[];
  content: string;
  amount: number;
  duration: number;
}

interface PromoCode {
  id: string;
  code: string;
  validity: number;
  discount: number;
  status: string;
  startDate: string;
}

interface Subscription {
  subscriptionId: string;
  paymentDate: string;
  updateDate: string;
  planId: string;
  status: string;
  paymentMethodId: string;
}

const OverviewTab = () => {
      const [stats, setStats] = useState({
        totalRevenue: 0,
        activeSubscriptions: 0,
        activePromoCodes: 0,
        conversionRate: 0
      });
    
      const subscriptionData = [
        { category: 'Basic', users: 120 },
        { category: 'Premium', users: 80 },
        { category: 'Enterprise', users: 40 },
      ];
    
      const revenueData = [
        { month: 'Jan', revenue: 2400 },
        { month: 'Feb', revenue: 3600 },
        { month: 'Mar', revenue: 4800 },
        { month: 'Apr', revenue: 5200 },
        { month: 'May', revenue: 6800 },
        { month: 'Jun', revenue: 7900 },
      ];
    
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  return (
    <div className="ml-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <h3 className="text-2xl font-bold text-gray-900">45,231 XAF</h3>
              </div>
              <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
                <CreditCard className="text-primary-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="text-green-500" size={16} />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <h3 className="text-2xl font-bold text-gray-900">2,431</h3>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="text-green-500" size={16} />
              <span className="text-green-500 font-medium">+4.5%</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Promo Codes</p>
                <h3 className="text-2xl font-bold text-gray-900">15</h3>
              </div>
              <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <Tag className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowDownRight className="text-red-500" size={16} />
              <span className="text-red-500 font-medium">-2.5%</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">3.2%</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight className="text-green-500" size={16} />
              <span className="text-green-500 font-medium">+1.2%</span>
              <span className="text-gray-500 ml-2">since last month</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Monthly Income</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#0066FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Distribution of Subscriptions</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="users"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {subscriptionData.map((item, index) => (
                <div key={item.category} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {/* Add your recent activity items here */}
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-primary-50 rounded-full flex items-center justify-center">
                  <Users className="text-primary-600" size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Premium subscription</p>
                  <p className="text-sm text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <span className="text-sm font-medium text-primary-600">xaf 99.00</span>
            </div>
            
            {/* Add more activity items as needed */}
          </div>
        </div>
      </div>
  )
}

export default OverviewTab