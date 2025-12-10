"use client";

import { useState, useMemo } from 'react';
import DashboardContent from '@/app/components/DashboardContent';
import StatsGrid from '@/app/components/StatsGrid';
import DashboardCard from '@/app/components/DashboardCard';
import DashboardLayout from '@/app/components/DashboardLayout';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Mail, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Plus
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Moderator';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  joinDate: string;
  avatar: string;
}

type SortField = 'name' | 'role' | 'status' | 'lastActive' | 'joinDate';
type SortDirection = 'asc' | 'desc';

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2 min ago', joinDate: 'Jan 15, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastActive: '1 hour ago', joinDate: 'Feb 20, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', role: 'Moderator', status: 'Inactive', lastActive: '2 days ago', joinDate: 'Mar 5, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'User', status: 'Pending', lastActive: '5 min ago', joinDate: 'Apr 10, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '5', name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', status: 'Active', lastActive: '30 min ago', joinDate: 'May 3, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', lastActive: '1 day ago', joinDate: 'Jun 12, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: '7', name: 'David Wilson', email: 'david@example.com', role: 'User', status: 'Inactive', lastActive: '1 week ago', joinDate: 'Jul 8, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { id: '8', name: 'Lisa Taylor', email: 'lisa@example.com', role: 'Moderator', status: 'Active', lastActive: '45 min ago', joinDate: 'Aug 22, 2024', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const activeUsers = users.filter(user => user.status === "Active" );
  const inActiveUsers = users.filter(user => user.status === "Inactive" );
  const pendingUsers = users.filter(user => user.status === "Pending" );
  const totalUsers = users.length;

    const userStats = [
        { name: 'Total Users', value: totalUsers.toString(), change: '+8.2%', icon: Users },
        { name: 'New Users', value: `${pendingUsers.length}`, change: '+12.5%', icon: UserPlus },
        { name: 'Active Users', value: `${activeUsers.length}`, change: '+5.3%', icon: UserCheck },
        { name: 'Inactive Users', value: `${inActiveUsers.length}`, change: '-2.1%', icon: UserX },
    ];

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'All' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'lastActive') {
          aValue = getTimeValue(a.lastActive);
          bValue = getTimeValue(b.lastActive);
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, searchTerm, selectedRole, selectedStatus, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setSelectedUsers(prev => prev.filter(id => id !== userId));
    setActionMenuOpen(null);
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    switch (action) {
      case 'activate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'Active' } : user
        ));
        break;
      case 'deactivate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? { ...user, status: 'Inactive' } : user
        ));
        break;
      case 'delete':
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
        break;
    }
    setSelectedUsers([]);
  };

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'Active': return <div className="h-2 w-2 rounded-full bg-green-500" />;
      case 'Inactive': return <div className="h-2 w-2 rounded-full bg-gray-400" />;
      case 'Pending': return <div className="h-2 w-2 rounded-full bg-amber-500" />;
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Admin': return 'text-purple-600 bg-purple-50';
      case 'Moderator': return 'text-blue-600 bg-blue-50';
      case 'User': return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Inactive': return 'text-gray-600 bg-gray-50';
      case 'Pending': return 'text-amber-600 bg-amber-50';
    }
  };

  const getTimeValue = (timeStr: string) => {
    if (timeStr.includes('min')) return parseInt(timeStr) * 60;
    if (timeStr.includes('hour')) return parseInt(timeStr) * 3600;
    if (timeStr.includes('day')) return parseInt(timeStr) * 86400;
    if (timeStr.includes('week')) return parseInt(timeStr) * 604800;
    return 0;
  };

  return (
    <DashboardLayout pageTitle="Users">
      <DashboardContent 
        title="Users" 
        subtitle="Manage and monitor all user accounts"
        showHeading={false}
      >
        {/* Stats Overview */}
        <StatsGrid stats={userStats} />

        {/* Main Content Card */}
        <div className="bg-white rounded-xl border border-gray-200">
          {/* Header with Actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                <p className="text-sm text-gray-500">{filteredUsers.length} users found</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add User
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>

              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>

              <button 
                onClick={() => {
                  setSelectedRole('All');
                  setSelectedStatus('All');
                  setSearchTerm('');
                }}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedUsers.length} selected
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Activate
                    </button>
                    <button 
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Deactivate
                    </button>
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedUsers([])}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Minimal Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      User
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center gap-1">
                      Role
                      {sortField === 'role' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort('lastActive')}
                  >
                    <div className="flex items-center gap-1">
                      Last Active
                      {sortField === 'lastActive' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-gray-50 ${selectedUsers.includes(user.id) ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(user.status)}
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                        
                        {actionMenuOpen === user.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1 z-10">
                            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye className="h-3.5 w-3.5 mr-2" />
                              View
                            </button>
                            <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Edit className="h-3.5 w-3.5 mr-2" />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-2" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer with Pagination */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">1-8</span> of <span className="font-medium">{filteredUsers.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <DashboardCard title="Role Distribution">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Admin</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Moderator</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">User</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-600 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Status Overview">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-600">Active</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">6 users</div>
                  <div className="text-xs text-green-600">+12% from last month</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                  <span className="text-sm text-gray-600">Inactive</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">2 users</div>
                  <div className="text-xs text-gray-600">-5% from last month</div>
                </div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Recent Activity">
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-gray-900">New signups</div>
                <div className="text-gray-600">+12 users this week</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">Avg. response time</div>
                <div className="text-gray-600">24 minutes</div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all activity →
              </button>
            </div>
          </DashboardCard>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
}