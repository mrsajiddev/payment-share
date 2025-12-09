'use client';

import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  CreditCard,
  HelpCircle,
  Shield,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '#', icon: Home, current: true },
  { name: 'Analytics', href: '#', icon: BarChart3, current: false },
  { name: 'Users', href: '#', icon: Users, current: false },
  { name: 'Documents', href: '#', icon: FileText, current: false },
  { name: 'Billing', href: '#', icon: CreditCard, current: false },
  { name: 'Security', href: '#', icon: Shield, current: false },
  { name: 'Settings', href: '#', icon: Settings, current: false },
  { name: 'Help', href: '#', icon: HelpCircle, current: false },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Close sidebar when clicking on a link (mobile only)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
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
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-gray-900 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-white" />
              <span className="ml-3 text-xl font-bold text-white">PayShare</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-4">
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Optional: Add user profile at bottom */}
            <div className="mt-auto pt-4 border-t border-gray-700">
              <div className="flex items-center px-3 py-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="User"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-300">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar - Always visible */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto bg-gray-900 px-6 pb-4">
          <div className="flex h-16 items-center">
            <Shield className="h-8 w-8 text-white" />
            <span className="ml-3 text-xl font-bold text-white">Payment Share</span>
          </div>
          
          <nav className="mt-8 flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  item.current
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Optional: Add user profile at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center px-3 py-2">
              <img
                className="h-8 w-8 rounded-full"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="User"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-300">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button - Should be in Topbar or separate component */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
      </div>
    </>
  );
}