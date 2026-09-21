import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [salesExpanded, setSalesExpanded] = useState(
    location.pathname.includes('/sales-billing')
  );

  const [inventoryExpanded, setInventoryExpanded] = useState(
    location.pathname.includes('/inventory')
  );

  const [accountsExpanded, setAccountsExpanded] = useState(
    location.pathname.includes('/general-ledger') || location.pathname.includes('/payments') || location.pathname.includes('/reports') || location.pathname.includes('/bank-accounts')
  );

  const [gstExpanded, setGstExpanded] = useState(
    location.pathname.includes('/gst-compliance')
  );

  return (
    <div className="w-[260px] bg-white border-r border-gray-200 h-screen flex flex-col shrink-0">
      {/* Logo Section */}
      <div className="pt-6 pb-4 px-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-extrabold text-[1.15rem] tracking-tight text-gray-900 uppercase">INVOXENX ERP</span>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-0.5">
        
        {/* Dashboard */}
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              isActive && location.pathname === '/' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <svg className={`w-5 h-5 ${isActive && location.pathname === '/' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className={`text-sm ${isActive && location.pathname === '/' ? 'font-semibold' : 'font-medium'}`}>Dashboard</span>
            </div>
          )}
        </NavLink>

        {/* Sales & Billing (Expandable) */}
        <div className="flex flex-col">
          <button 
            onClick={() => setSalesExpanded(!salesExpanded)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              location.pathname.includes('/sales-billing') && !salesExpanded ? 'bg-indigo-50/50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${location.pathname.includes('/sales-billing') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <FileTextIcon />
              </div>
              <span className={`text-sm ${location.pathname.includes('/sales-billing') ? 'font-semibold' : 'font-medium'}`}>Sales & Billing</span>
            </div>
            <svg className={`w-3.5 h-3.5 ${location.pathname.includes('/sales-billing') ? 'text-indigo-500' : 'text-gray-400'} transition-transform ${salesExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {salesExpanded && (
            <div className="flex flex-col pl-9 pr-1 py-1 space-y-0.5 relative">
              {/* Vertical line indicator */}
              <div className="absolute left-[1.125rem] top-0 bottom-2 w-px bg-gray-200"></div>
              
              <NavLink 
                to="/sales-billing/pos" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <FileTextIcon />
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>POS Billing</span>
                  </>
                )}
              </NavLink>
              
              <NavLink 
                to="/sales-billing/sales-documents" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <FileTextIcon />
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>Sales Documents</span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </div>

        {/* Inventory (Expandable) */}
        <div className="flex flex-col">
          <button 
            onClick={() => setInventoryExpanded(!inventoryExpanded)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              location.pathname.includes('/inventory') && !inventoryExpanded ? 'bg-indigo-50/50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${location.pathname.includes('/inventory') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <CubeIcon />
              </div>
              <span className={`text-sm ${location.pathname.includes('/inventory') ? 'font-semibold' : 'font-medium'}`}>Inventory</span>
            </div>
            <svg className={`w-3.5 h-3.5 ${location.pathname.includes('/inventory') ? 'text-indigo-500' : 'text-gray-400'} transition-transform ${inventoryExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {inventoryExpanded && (
            <div className="flex flex-col pl-9 pr-1 py-1 space-y-0.5 relative">
              {/* Vertical line indicator */}
              <div className="absolute left-[1.125rem] top-0 bottom-2 w-px bg-gray-200"></div>
              
              <NavLink 
                to="/inventory" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <CubeIcon />
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>Products & Stocks</span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </div>

        <NavLink 
          to="/parties" 
          className={({ isActive }) => 
            `flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                <UsersIcon />
              </div>
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Parties</span>
            </div>
          )}
        </NavLink>
        <NavLink 
          to="/purchase-documents" 
          className={({ isActive }) => 
            `flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                <MailIcon />
              </div>
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Purchase Documents</span>
            </div>
          )}
        </NavLink>
        <NavLink 
          to="/returns" 
          className={({ isActive }) => 
            `flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                <ArrowUturnLeftIcon />
              </div>
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>Returns</span>
            </div>
          )}
        </NavLink>
        {/* Accounts & Banking (Expandable) */}
        <div className="flex flex-col">
          <button 
            onClick={() => setAccountsExpanded(!accountsExpanded)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              (location.pathname.includes('/general-ledger') || location.pathname.includes('/payments') || location.pathname.includes('/reports') || location.pathname.includes('/bank-accounts')) && !accountsExpanded ? 'bg-indigo-50/50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${(location.pathname.includes('/general-ledger') || location.pathname.includes('/payments') || location.pathname.includes('/reports') || location.pathname.includes('/bank-accounts')) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <BankIcon />
              </div>
              <span className={`text-sm ${(location.pathname.includes('/general-ledger') || location.pathname.includes('/payments') || location.pathname.includes('/reports') || location.pathname.includes('/bank-accounts')) ? 'font-semibold' : 'font-medium'}`}>Accounts & Banking</span>
            </div>
            <svg className={`w-3.5 h-3.5 ${(location.pathname.includes('/general-ledger') || location.pathname.includes('/payments') || location.pathname.includes('/reports') || location.pathname.includes('/bank-accounts')) ? 'text-indigo-500' : 'text-gray-400'} transition-transform ${accountsExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {accountsExpanded && (
            <div className="flex flex-col pl-9 pr-1 py-1 space-y-0.5 relative">
              <div className="absolute left-[1.125rem] top-0 bottom-2 w-px bg-gray-200"></div>
              
              <NavLink 
                to="/general-ledger" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>General Ledger</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/payments" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>Payments</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/reports" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>Reports & Analytics</span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </div>
        {/* GST & Compliance (Expandable) */}
        <div className="flex flex-col">
          <button 
            onClick={() => setGstExpanded(!gstExpanded)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              location.pathname.includes('/gst-compliance') && !gstExpanded ? 'bg-indigo-50/50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${location.pathname.includes('/gst-compliance') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <LinkIcon />
              </div>
              <span className={`text-sm ${location.pathname.includes('/gst-compliance') ? 'font-semibold' : 'font-medium'}`}>GST & Compliance</span>
            </div>
            <svg className={`w-3.5 h-3.5 ${location.pathname.includes('/gst-compliance') ? 'text-indigo-500' : 'text-gray-400'} transition-transform ${gstExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {gstExpanded && (
            <div className="flex flex-col pl-9 pr-1 py-1 space-y-0.5 relative">
              <div className="absolute left-[1.125rem] top-0 bottom-2 w-px bg-gray-200"></div>
              
              <NavLink 
                to="/gst-compliance" 
                end
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>GST Compliance</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/gst-compliance/e-invoice" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>E-Invoice</span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/gst-compliance/e-way-bill" 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors relative ${
                    isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="w-4 h-4 opacity-70">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>E-Way Bill</span>
                  </>
                )}
              </NavLink>
            </div>
          )}
        </div>        
        <div className="my-2 border-t border-gray-100"></div>
        
        <NavLink 
          to="/smart-scanner" 
          className={({ isActive }) => 
            `flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              isActive && location.pathname === '/smart-scanner' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${isActive && location.pathname === '/smart-scanner' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <PlusIcon />
              </div>
              <span className={`text-sm ${isActive && location.pathname === '/smart-scanner' ? 'font-semibold' : 'font-medium'}`}>Smart Scanner</span>
            </div>
          )}
        </NavLink>
        
        <NavLink 
          to="/auto-bill-generator" 
          className={({ isActive }) => 
            `flex items-center justify-between px-3 py-2.5 rounded-lg group transition-colors ${
              isActive && location.pathname === '/auto-bill-generator' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 ${isActive && location.pathname === '/auto-bill-generator' ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <SparklesIcon />
              </div>
              <span className={`text-sm ${isActive && location.pathname === '/auto-bill-generator' ? 'font-semibold' : 'font-medium'}`}>Auto Bill Generator</span>
            </div>
          )}
        </NavLink>
        
        <div className="my-2 border-t border-gray-100"></div>
        
        <NavItem title="Settings" icon={<CogIcon />} hasChevron="down" />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#4F46E5] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
              DU
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 leading-tight">Demo User</span>
              <span className="text-[11px] text-gray-500 leading-tight mt-0.5">admin@invoxenx.com</span>
            </div>
          </div>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

/* --- Simple internal components for icons to match UI --- */

const NavItem = ({ title, icon, hasChevron }) => (
  <a href="#" className="flex items-center justify-between px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors">
        {icon}
      </div>
      <span className="font-medium text-sm text-gray-700">{title}</span>
    </div>
    {hasChevron === 'right' && (
      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    )}
    {hasChevron === 'down' && (
      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    )}
  </a>
);

const FileTextIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CubeIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const UsersIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const MailIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ArrowUturnLeftIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const BankIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" /></svg>;
const LinkIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const PlusIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>;
const SparklesIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const CogIcon = () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default Sidebar;
