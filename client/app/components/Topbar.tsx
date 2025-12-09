'use client';

import { Bell, Search, X, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../utils/use-auth';
import { logoutUser } from '../utils/lougoutUser';
import { useRouter } from 'next/navigation';


export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // const user = {
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  // };
  const authData = useAuth();
  const user = authData.user;
  const avatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=John';

  // Sample search results
  const searchResults = [
    { id: 1, title: 'Dashboard Overview', category: 'Pages' },
    { id: 2, title: 'User Analytics', category: 'Reports' },
    { id: 3, title: 'Monthly Revenue', category: 'Metrics' },
    { id: 4, title: 'Settings Page', category: 'Pages' },
    { id: 5, title: 'User Management', category: 'Admin' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // search logic
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = async () => {
    // console.log('Logging out...');
    const logout = await logoutUser();
    if( logout.success ) {
      router.push("/auth/login");
    }
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    console.log('Navigating to profile...');
    setIsProfileOpen(false);
  };

  // Focus search input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (searchQuery === '' || event.target instanceof HTMLButtonElement === false) {
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

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSearchOpen) {
          setIsSearchOpen(false);
          setSearchQuery('');
        }
        if (isProfileOpen) {
          setIsProfileOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen, isProfileOpen]);

  const filteredResults = searchQuery.trim() 
    ? searchResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
        {/* Left side - Page title */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Right side - Icons group */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Search icon/bar */}
          <div className="relative" ref={searchRef}>
            {isSearchOpen ? (
              <div className="absolute right-0 top-0 -mr-2 -mt-2 lg:relative lg:mr-0 lg:mt-0">
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

                  {/* Search Results Dropdown */}
                  {searchQuery && (
                    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {filteredResults.length > 0 ? 'Search Results' : 'No Results'}
                        </div>
                        
                        {filteredResults.length > 0 ? (
                          <ul className="divide-y divide-gray-100">
                            {filteredResults.map((result) => (
                              <li key={result.id}>
                                <button
                                  onClick={() => {
                                    console.log('Selected:', result.title);
                                    setSearchQuery('');
                                    setIsSearchOpen(false);
                                  }}
                                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                                >
                                  <div className="font-medium text-gray-900">{result.title}</div>
                                  <div className="text-sm text-gray-500">{result.category}</div>
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">No results found for "{searchQuery}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

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
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="mr-3 h-4 w-4 text-gray-400" />
                    Your Profile
                  </button>
                  
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
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

      {/* Mobile search overlay */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => {
          if (searchQuery === '') {
            setIsSearchOpen(false);
          }
        }} />
      )}
    </>
  );
}