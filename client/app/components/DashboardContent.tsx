import { BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';
const stats = [
  { name: 'Total Revenue', value: '$54,234', change: '+12.5%', icon: DollarSign },
  { name: 'Active Users', value: '2,543', change: '+18.2%', icon: Users },
  { name: 'Conversion Rate', value: '3.2%', change: '+2.1%', icon: TrendingUp },
  { name: 'Avg. Session', value: '4m 32s', change: '-1.2%', icon: BarChart3 },
];

export default function DashboardContent() {
  
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional content */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-sm font-medium text-gray-900">New user registration</p>
            <p className="text-sm text-gray-600">John Doe joined the platform • 5 min ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="text-sm font-medium text-gray-900">Payment received</p>
            <p className="text-sm text-gray-600">Subscription payment from Jane Smith • 1 hour ago</p>
          </div>
        </div>
      </div>
    </>
  );
}