'use client';

import { Bell, Search, X, ChevronDown, Menu, User, Settings, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { logoutUser } from '../utils/lougoutUser';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  onMenuClick: () => void;
  user: any,
  pageTitle: string,
}

export default function Topbar({ onMenuClick, user, pageTitle }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=John';

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (searchQuery === '') {
          setIsSearchOpen(false);
        }
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async() => {
    const resp = await logoutUser();

    if(resp.success){
      router.push("/auth/login"); 
    } else {
      console.log(resp.message);
    }
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      {/* Left: Mobile menu button and title */}
      <div className="flex items-center gap-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden -ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">{pageTitle ? pageTitle : 'Dashboard' }</h1>
      </div>

      {/* Right: Icons group */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        {/* Search icon */}
        <div className="relative" ref={searchRef}>
          {isSearchOpen ? (
            <div className="relative w-64 lg:w-80">
              <form onSubmit={handleSearch}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full rounded-lg border-0 py-2 pl-10 pr-10 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 cursor-pointer text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative cursor-pointer p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-x-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              className="h-8 w-8 rounded-full border-2 border-gray-200"
              src={avatar}
              alt="Profile"
            />
            <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              {/* Dropdown items */}
              <div className="py-1">
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="flex cursor-pointer items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="mr-3 h-4 w-4 text-gray-400" />
                  Your Profile
                </button>
                
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="flex cursor-pointer items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="mr-3 h-4 w-4 text-gray-400" />
                  Settings
                </button>
              </div>

              {/* Logout */}
              <div className="py-1 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}