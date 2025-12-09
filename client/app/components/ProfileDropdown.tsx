'use client';

import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    console.log('Navigating to profile...');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="-m-1.5 flex items-center p-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full bg-gray-50"
          src={user.avatar}
          alt="Profile"
        />
        <span className="hidden lg:flex lg:items-center">
          <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
            {user.name}
          </span>
          <ChevronDown className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2.5 w-64 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Dropdown items */}
          <div className="py-1">
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="mr-3 h-4 w-4 text-gray-400" />
              Your Profile
            </button>
            
            <button
              onClick={handleProfileClick}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="mr-3 h-4 w-4 text-gray-400" />
              Settings
            </button>
          </div>

          {/* Logout section */}
          <div className="py-1 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}