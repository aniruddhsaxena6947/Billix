import React from 'react';

const Header = () => {
  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
      {/* Left Area - Page Title / Breadcrumb */}
      <div className="flex items-center text-gray-500 font-medium text-[15px]">
        <span>Dashboard</span>
      </div>

      {/* Right Area - Actions & Search */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative mr-2">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search pages, invoices, products..." 
            className="w-[320px] bg-[#F3F4F6] border border-transparent rounded-lg py-2 pl-9 pr-12 text-[13px] focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors placeholder-gray-400 font-medium"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-gray-400 font-medium text-[11px] bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">⌘ K</span>
          </div>
        </div>

        {/* Action Buttons */}
        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
          Quick Access
        </button>
        
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          AI
        </button>
        
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          Notifications
        </button>
        
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          ABC Distributors
        </button>
        
        <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          AM
        </button>
      </div>
    </header>
  );
};

export default Header;
