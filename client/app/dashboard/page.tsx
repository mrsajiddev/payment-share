"use client";

import DashboardLayout from '../components/DashboardLayout';
import DashboardContent from '../components/DashboardContent';
import StatsGrid from '../components/StatsGrid';
import ActivityFeed from '../components/ActivityFeed';
import { useAuth } from '../utils/use-auth';
import { DollarSign, Users, TrendingUp, BarChart3, CreditCard, ShoppingCart, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const auth = useAuth();

  // Dashboard stats data
  const stats = [
    { name: 'Total Revenue', value: '$54,234', change: '+12.5%', icon: DollarSign },
    { name: 'Active Users', value: '2,543', change: '+18.2%', icon: Users },
    { name: 'Conversion Rate', value: '3.2%', change: '+2.1%', icon: TrendingUp },
    { name: 'Avg. Session', value: '4m 32s', change: '-1.2%', icon: BarChart3 },
  ];

  // Recent activities data
  const activities = [
    { 
      title: 'New user registration', 
      description: 'John Doe joined the platform', 
      timestamp: '5 min ago',
      type: 'success' as const
    },
    { 
      title: 'Payment received', 
      description: 'Subscription payment from Jane Smith', 
      timestamp: '1 hour ago',
      type: 'success' as const
    },
    { 
      title: 'Failed login attempt', 
      description: 'Multiple failed attempts detected', 
      timestamp: '2 hours ago',
      type: 'warning' as const
    },
  ];

  // Show loading state while auth is being fetched
  if (!auth) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Get user name for personalized greeting
  const userName = auth.user?.fullName || 'User';
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good morning' : 
                   currentTime < 18 ? 'Good afternoon' : 
                   'Good evening';

  return (
    <DashboardLayout pageTitle="Dashboard">
      <DashboardContent 
        title={`${greeting}, ${userName}!`}
        subtitle="Here's what's happening with your platform today."
        showHeading={true}
      >
        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Two-column layout for additional content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <ActivityFeed 
            title="Recent Activity" 
            activities={activities} 
          />

          {/* Quick Stats Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pending Payments</p>
                    <p className="text-xs text-gray-500">12 transactions</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-blue-600">$2,340</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Completed Orders</p>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">156</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Avg. Response Time</p>
                    <p className="text-xs text-gray-500">Support tickets</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-yellow-600">24m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional content section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Platform Overview</h2>
              <p className="text-sm text-gray-600">Monthly performance metrics</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              View Report
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-gray-900">98.2%</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-gray-900">4.8/5</p>
              <p className="text-sm text-gray-600">User Rating</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-gray-900">2.3s</p>
              <p className="text-sm text-gray-600">Avg. Load Time</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-gray-900">99.7%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}