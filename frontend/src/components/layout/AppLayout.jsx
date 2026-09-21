import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans overflow-hidden antialiased text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
