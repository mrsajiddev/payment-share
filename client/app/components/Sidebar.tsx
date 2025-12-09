'use client';

import {
  Home,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
  Shield,
  X,
  WalletCards,
  BadgeDollarSign,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  FileText,
  ListChecks,
  Receipt,
  History,
  Calendar,
  BarChart3,
  UserPlus,
  UserCog,
  Bell,
  Lock,
  Key,
  Globe,
  Mail,
  Cloud,
  Server
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SidebarProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
  user: any
}

interface MenuItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  name: string;
  href: string;
  icon: any;
}

const navigation: MenuItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Home, 
    current: true 
  },
  { 
    name: 'Payments', 
    href: '#', 
    icon: BadgeDollarSign, 
    current: false,
    submenu: [
      { name: 'Create Payment', href: '/payments/create', icon: PlusCircle },
      { name: 'Payment List', href: '/payments/list', icon: ListChecks },
      { name: 'Invoices', href: '/payments/invoices', icon: FileText },
      { name: 'Receipts', href: '/payments/receipts', icon: Receipt },
      { name: 'Payment History', href: '/payments/history', icon: History },
      { name: 'Scheduled Payments', href: '/payments/scheduled', icon: Calendar },
      { name: 'Payment Analytics', href: '/payments/analytics', icon: BarChart3 },
    ]
  },
  { 
    name: 'Users', 
    href: '#', 
    icon: Users, 
    current: false,
    submenu: [
      { name: 'All Users', href: '/users/all', icon: Users },
      { name: 'Add New User', href: '/users/add', icon: UserPlus },
      { name: 'User Roles', href: '/users/roles', icon: UserCog },
      { name: 'User Activity', href: '/users/activity', icon: History },
    ]
  },
  { 
    name: 'Cards', 
    href: '#', 
    icon: WalletCards, 
    current: false,
    submenu: [
      { name: 'Card Management', href: '/cards/manage', icon: CreditCard },
      { name: 'Add New Card', href: '/cards/add', icon: PlusCircle },
      { name: 'Card Transactions', href: '/cards/transactions', icon: ListChecks },
      { name: 'Card Limits', href: '/cards/limits', icon: Shield },
    ]
  },
  { 
    name: 'Billing', 
    href: '#', 
    icon: CreditCard, 
    current: false,
    submenu: [
      { name: 'Billing Overview', href: '/billing/overview', icon: BarChart3 },
      { name: 'Invoices', href: '/billing/invoices', icon: FileText },
      { name: 'Payment Methods', href: '/billing/methods', icon: CreditCard },
      { name: 'Subscription', href: '/billing/subscription', icon: Calendar },
    ]
  },
  { 
    name: 'Security', 
    href: '#', 
    icon: Shield, 
    current: false,
    submenu: [
      { name: 'Security Overview', href: '/security/overview', icon: Shield },
      { name: 'Two-Factor Auth', href: '/security/2fa', icon: Lock },
      { name: 'API Keys', href: '/security/api-keys', icon: Key },
      { name: 'Access Logs', href: '/security/logs', icon: History },
      { name: 'IP Whitelist', href: '/security/ip-whitelist', icon: Globe },
    ]
  },
  { 
    name: 'Settings', 
    href: '#', 
    icon: Settings, 
    current: false,
    submenu: [
      { name: 'General', href: '/settings/general', icon: Settings },
      { name: 'Notifications', href: '/settings/notifications', icon: Bell },
      { name: 'Email', href: '/settings/email', icon: Mail },
      { name: 'Integrations', href: '/settings/integrations', icon: Cloud },
      { name: 'API Settings', href: '/settings/api', icon: Server },
    ]
  },
  { 
    name: 'Help', 
    href: '/help', 
    icon: HelpCircle, 
    current: false 
  },
];

export default function Sidebar({ sidebarOpen, closeSidebar, user }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'Payments': false,
  });

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sidebarOpen]);

  // Close sidebar on escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [sidebarOpen, closeSidebar]);

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    if (item.submenu) {
      const isExpanded = expandedMenus[item.name] || false;
      
      return (
        <div key={item.name} className="space-y-1">
          <button
            onClick={() => toggleSubmenu(item.name)}
            className={`group cursor-pointer flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
              item.current
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          
          {/* Submenu items */}
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-2">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  onClick={handleLinkClick}
                  className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <subItem.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular menu item without submenu
    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={handleLinkClick}
        className={`group cursor-pointer flex items-center rounded-md px-3 py-2 text-sm font-medium ${
          item.current
            ? 'bg-gray-800 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay and sidebar */}
      <div className="lg:hidden">
        {/* Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeSidebar}
        />

        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-gray-900 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* header */}
          <div className="flex-shrink-0">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-white" />
                <span className="ml-3 text-xl font-bold text-white">PayShare</span>
              </div>
              <button
                onClick={closeSidebar}
                className="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Scrollable navigation area */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 pb-4">
              <nav className="mt-4 space-y-2">
                {navigation.map((item) => renderMenuItem(item))}
              </nav>
            </div>
          </div>
          
          {/* footer */}
          <div className="flex-shrink-0 border-t border-gray-700 px-6 py-4">
            <div className="flex items-center">
              <img
                className="h-9 w-9 rounded-full"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="User"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user && user.fullName}</p>
                <p className="text-xs text-gray-300">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-900">
          {/* header */}
          <div className="flex-shrink-0">
            <div className="flex h-16 items-center px-6">
              <Shield className="h-8 w-8 text-white" />
              <span className="ml-3 text-xl font-bold text-white">Payment Share</span>
            </div>
          </div>
          
          {/* Scrollable navigation area */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="flex-1 px-6 pb-4">
              <nav className="mt-8 space-y-2">
                {navigation.map((item) => renderMenuItem(item))}
              </nav>
            </div>
            
            {/* footer */}
            <div className="flex-shrink-0 border-t border-gray-700 px-6 py-4">
              <div className="flex items-center">
                <img
                  className="h-9 w-9 rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="User"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{user && user.fullName }</p>
                  <p className="text-xs text-gray-300">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}