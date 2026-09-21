import React, { useState } from 'react';
import { 
  Download, MoreHorizontal, Search, ChevronDown, ChevronLeft, ChevronRight,
  Filter, Calendar, X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// --- MOCK DATA ---
const initialLedger = [
  { id: '1', date: '28 May 2026', txnId: 'TXN-10248', account: 'Accounts Receivable', description: 'Sale to Sharma Distributors', reference: 'INV-2026-00124', debit: 25000.00, credit: 0, balance: 640950.00, source: 'Sales' },
  { id: '2', date: '28 May 2026', txnId: 'TXN-10248', account: 'Sales', description: 'Sale to Sharma Distributors', reference: 'INV-2026-00124', debit: 0, credit: 25000.00, balance: 1842750.00, source: 'Sales' },
  { id: '3', date: '27 May 2026', txnId: 'TXN-10247', account: 'HDFC Bank', description: 'Payment received from...', reference: 'RCT-2026-00091', debit: 25000.00, credit: 0, balance: 285000.00, source: 'Payment' },
  { id: '4', date: '27 May 2026', txnId: 'TXN-10247', account: 'Accounts Receivable', description: 'Payment received from...', reference: 'RCT-2026-00091', debit: 0, credit: 25000.00, balance: 615950.00, source: 'Payment' },
  { id: '5', date: '25 May 2026', txnId: 'TXN-10246', account: 'Purchase', description: 'Purchase from Ganesh...', reference: 'PINV-2026-00078', debit: 12750.00, credit: 0, balance: 720500.00, source: 'Purchase' },
  { id: '6', date: '25 May 2026', txnId: 'TXN-10246', account: 'Accounts Payable', description: 'Purchase from Ganesh...', reference: 'PINV-2026-00078', debit: 0, credit: 12750.00, balance: 340000.00, source: 'Purchase' },
  { id: '7', date: '22 May 2026', txnId: 'TXN-10245', account: 'Office Expenses', description: 'Stationery and supplies', reference: 'EXP-2026-00045', debit: 1200.00, credit: 0, balance: 15400.00, source: 'Journal' },
  { id: '8', date: '22 May 2026', txnId: 'TXN-10245', account: 'Petty Cash', description: 'Stationery and supplies', reference: 'EXP-2026-00045', debit: 0, credit: 1200.00, balance: 8500.00, source: 'Journal' },
];

const formatCurrency = (amt) => {
  if (!amt || amt === 0) return '—';
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amt);
};

const getSourceBadge = (source) => {
  switch (source) {
    case 'Sales': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{source}</span>;
    case 'Payment': return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-emerald-100 whitespace-nowrap">{source}</span>;
    case 'Purchase': return <span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-purple-100 whitespace-nowrap">{source}</span>;
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">{source}</span>;
  }
};

const GeneralLedger = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerEntries, setLedgerEntries] = useState(initialLedger);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [drawerTab, setDrawerTab] = useState('Overview');

  // For the active filters demonstration
  const [showFilters, setShowFilters] = useState(true);

  const getFilteredEntries = () => {
    let filtered = ledgerEntries;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.txnId.toLowerCase().includes(q) || 
        p.account.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return filtered;
  };

  const filteredEntries = getFilteredEntries();

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Accounts & Banking</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 font-semibold">General Ledger</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">General Ledger</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-[#4F46E5] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
            <span className="text-lg leading-none mb-0.5">+</span> New Journal Entry (F2)
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <MoreHorizontal className="w-4 h-4 text-gray-500" /> More <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
          </button>
        </div>
      </div>

      {/* Top Filter Controls Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm shrink-0 mb-6 flex items-end gap-5">
        <div className="flex flex-col gap-1.5 flex-1 max-w-[280px]">
          <label className="text-[12px] font-bold text-gray-500">Account</label>
          <button className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
            All Accounts <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-col gap-1.5 flex-1 max-w-[220px]">
          <label className="text-[12px] font-bold text-gray-500">Financial Year</label>
          <button className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
            FY 2026-27 (2026-27) <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 w-40">
          <label className="text-[12px] font-bold text-gray-500">From Date</label>
          <div className="relative">
            <input type="text" value="01/04/2026" readOnly className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 pr-8 rounded-lg text-[13px] font-medium focus:outline-none cursor-pointer" />
            <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-40">
          <label className="text-[12px] font-bold text-gray-500">To Date</label>
          <div className="relative">
            <input type="text" value="31/03/2027" readOnly className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 pr-8 rounded-lg text-[13px] font-medium focus:outline-none cursor-pointer" />
            <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 max-w-[220px]">
          <label className="text-[12px] font-bold text-gray-500">Quick Date</label>
          <button className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
            This Financial Year <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1 overflow-hidden relative">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-100 flex flex-col gap-3 shrink-0 bg-white">
            <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search transaction, account, reference or description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" /> Filters
            </button>
            <button className="text-indigo-600 font-semibold text-[13px] hover:text-indigo-800 flex items-center px-2">
              Clear
            </button>
          </div>
          
          {showFilters && (
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg text-[12px] font-medium border border-gray-200">
                Transaction Type: All <button className="hover:text-gray-900"><X className="w-3.5 h-3.5" /></button>
              </span>
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg text-[12px] font-medium border border-gray-200">
                Account: All Accounts <button className="hover:text-gray-900"><X className="w-3.5 h-3.5" /></button>
              </span>
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg text-[12px] font-medium border border-gray-200">
                Source: All <button className="hover:text-gray-900"><X className="w-3.5 h-3.5" /></button>
              </span>
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2.5 py-1.5 rounded-lg text-[12px] font-medium border border-gray-200">
                Date: 01/04/2026 - 31/03/2027 <button className="hover:text-gray-900"><X className="w-3.5 h-3.5" /></button>
              </span>
            </div>
          )}
        </div>

        {/* Table Content */}
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
              <tr>
                <th className="py-3 px-5 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">
                  <div className="flex items-center gap-1">DATE <span className="flex flex-col"><ChevronDown className="w-2.5 h-2.5 rotate-180 -mb-1"/><ChevronDown className="w-2.5 h-2.5"/></span></div>
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">TRANSACTION</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">ACCOUNT</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">DESCRIPTION</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">REFERENCE</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-right">DEBIT (₹)</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-right">CREDIT (₹)</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-right">BALANCE (₹)</th>
                <th className="py-3 px-5 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">SOURCE</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr><td colSpan="9" className="py-16 text-center text-gray-500 text-[14px]">No entries found.</td></tr>
              ) : (
                filteredEntries.map(entry => (
                  <tr 
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={"border-b border-gray-50 hover:bg-gray-50/70 transition-colors cursor-pointer " + (selectedEntry?.id === entry.id ? ' bg-gray-50' : '')}
                  >
                    <td className="py-3.5 px-5 text-gray-900 text-[13px] font-medium">{entry.date}</td>
                    <td className="py-3.5 px-4"><span className="text-indigo-600 hover:text-indigo-800 text-[13.5px] font-semibold">{entry.txnId}</span></td>
                    <td className="py-3.5 px-4 text-gray-900 font-medium text-[13px]">{entry.account}</td>
                    <td className="py-3.5 px-4 text-gray-600 text-[13px]">{entry.description}</td>
                    <td className="py-3.5 px-4 text-gray-600 text-[13px]">{entry.reference}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={entry.debit > 0 ? "text-indigo-600 font-medium text-[13.5px]" : "text-gray-400 font-medium"}>
                        {formatCurrency(entry.debit)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={entry.credit > 0 ? "text-emerald-600 font-medium text-[13.5px]" : "text-gray-400 font-medium"}>
                        {formatCurrency(entry.credit)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-900 font-semibold text-[13.5px]">{formatCurrency(entry.balance)}</td>
                    <td className="py-3.5 px-5">
                      {getSourceBadge(entry.source)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="text-[13px] text-gray-500 font-medium ml-2">
            Showing 1 to 20 of 248 entries
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-[13px] font-medium text-gray-600 cursor-pointer hover:bg-gray-50 shadow-sm">
              <span className="font-bold">20</span> per page <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 bg-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#4F46E5] text-white text-[12px] font-bold">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">2</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">3</button>
              <span className="px-1 text-gray-400 text-xs">...</span>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">13</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors bg-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Detail Drawer --- */}
      {selectedEntry && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" onClick={() => setSelectedEntry(null)}></div>
          <div className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 animate-slide-in-right">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{selectedEntry.txnId}</h2>
                <div className="flex scale-90 origin-left">
                  {getSourceBadge(selectedEntry.source)}
                </div>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Meta Info */}
            <div className="p-5 flex items-start justify-between border-b border-gray-50">
              <div>
                <p className="text-[11px] font-bold text-gray-500 mb-1">Account</p>
                <p className="text-[13.5px] font-bold text-gray-900">{selectedEntry.account}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-500 mb-1">Date</p>
                <p className="text-[13.5px] font-bold text-gray-900">{selectedEntry.date}</p>
              </div>
            </div>
            <div className="px-5 py-3 border-b border-gray-50">
              <p className="text-[11px] font-bold text-gray-500 mb-1">Reference</p>
              <span className="text-[13.5px] font-bold text-indigo-700">{selectedEntry.reference || '—'}</span>
            </div>

            {/* Metric Boxes */}
            <div className="p-5 flex gap-3 bg-gray-50/50">
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">DEBIT</span>
                <span className={selectedEntry.debit > 0 ? "text-lg font-bold text-indigo-700" : "text-lg font-bold text-gray-400"}>₹{formatCurrency(selectedEntry.debit)}</span>
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">CREDIT</span>
                <span className={selectedEntry.credit > 0 ? "text-lg font-bold text-emerald-600" : "text-lg font-bold text-gray-400"}>₹{formatCurrency(selectedEntry.credit)}</span>
              </div>
            </div>

            {/* Drawer Tabs */}
            <div className="flex border-b border-gray-200 px-5 shrink-0">
              {['Overview', 'Journal', 'Attachments'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={"py-3 px-4 text-[13px] font-bold transition-colors relative whitespace-nowrap " + (drawerTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700')}
                >
                  {tab}
                  {drawerTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {drawerTab === 'Overview' && (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-y-4 text-[13px]">
                    <div className="text-gray-500 font-medium">Running Balance</div>
                    <div className="text-gray-900 font-bold text-right">₹{formatCurrency(selectedEntry.balance)}</div>
                    
                    <div className="text-gray-500 font-medium">Source Module</div>
                    <div className="text-gray-900 font-bold text-right">{selectedEntry.source}</div>
                    
                    <div className="text-gray-500 font-medium">Created By</div>
                    <div className="text-gray-900 font-bold text-right">System</div>
                  </div>
                  
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 mb-2">Description / Narration</div>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[13px] text-gray-700">
                      {selectedEntry.description || 'No description provided.'}
                    </div>
                  </div>
                </div>
              )}
              {drawerTab !== 'Overview' && (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
                  Content for {drawerTab} goes here
                </div>
              )}
            </div>
            
          </div>
        </>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #D1D5DB; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; }
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

export default GeneralLedger;
