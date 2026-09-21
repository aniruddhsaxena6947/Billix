import React, { useState } from 'react';
import { 
  MoreHorizontal, Download, Plus, Search, Filter,
  ChevronDown, ChevronLeft, ChevronRight, X, FileText,
  User, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// -- Mock Data --
const initialDocuments = [
  { id: 'INV-2026-00124', type: 'Invoice', date: '26 Aug 2026', customer: 'ABC Traders', items: 8, amount: 45800, payment: 'Partially Paid', status: 'Pending' },
  { id: 'INV-2026-00123', type: 'Invoice', date: '25 Aug 2026', customer: 'Global Tech Solutions', items: 3, amount: 112500, payment: 'Paid', status: 'Completed' },
  { id: 'INV-2026-00118', type: 'Invoice', date: '10 Aug 2026', customer: 'MegaCorp Inc.', items: 15, amount: 285000, payment: 'Overdue', status: 'Pending' },
  { id: 'QUO-2026-00045', type: 'Quotation', date: '27 Aug 2026', customer: 'Sunrise Retail', items: 12, amount: 84200, payment: '-', status: 'Sent' },
  { id: 'DRF-2026-00008', type: 'Draft', date: '28 Aug 2026', customer: 'New Client LLC', items: '-', amount: 15000, payment: '-', status: 'Draft' },
  { id: 'SO-2026-00012', type: 'Sales Order', date: '29 Aug 2026', customer: 'Nexus Imports', items: 5, amount: 45000, payment: '-', status: 'Pending' },
  { id: 'DC-2026-00008', type: 'Delivery Challan', date: '30 Aug 2026', customer: 'Alpha Store', items: 20, amount: 0, payment: '-', status: 'Sent' },
];

const tabs = [
  { name: 'All', count: 128 },
  { name: 'Invoices', count: 86 },
  { name: 'Quotations', count: 14 },
  { name: 'Sales Orders', count: 12 },
  { name: 'Delivery Challans', count: 8 },
  { name: 'Drafts', count: 8 }
];

// -- Helpers --
const getBadgeStyles = (text) => {
  switch (text) {
    case 'Paid': case 'Completed': return 'bg-emerald-50 text-emerald-600';
    case 'Partially Paid': return 'bg-orange-50 text-orange-600';
    case 'Overdue': return 'bg-red-50 text-red-600';
    case 'Pending': return 'bg-blue-50 text-blue-600';
    case 'Sent': return 'bg-purple-50 text-purple-600';
    case 'Draft': return 'bg-gray-100 text-gray-600';
    default: return 'text-gray-500';
  }
};

const formatCurrency = (amt) => {
  if (amt === 0) return '-';
  return '₹' + amt.toLocaleString('en-IN');
};

const SalesDocuments = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(initialDocuments);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Detail Drawer
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [detailTab, setDetailTab] = useState('Overview');
  
  // New Sale Dropdown
  const [showNewSaleMenu, setShowNewSaleMenu] = useState(false);
  
  // New Document Modal
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [newDocType, setNewDocType] = useState('');

  // Filtering
  const filteredDocs = documents.filter(doc => {
    const matchesTab = activeTab === 'All' || doc.type.toLowerCase().includes(activeTab.toLowerCase().replace('s', ''));
    const matchesSearch = doc.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDocs.length) setSelectedIds([]);
    else setSelectedIds(filteredDocs.map(d => d.id));
  };

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleCreateDocument = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `${newDocType.substring(0,3).toUpperCase()}-2026-00999`,
      type: newDocType,
      date: '31 Aug 2026',
      customer: e.target.customer.value || 'Walk-in Customer',
      items: e.target.items.value || 1,
      amount: parseInt(e.target.amount.value) || 0,
      payment: '-',
      status: 'Draft'
    };
    setDocuments([newDoc, ...documents]);
    setShowNewDocModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header Area */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <div className="text-[13px] text-gray-500 font-medium mb-1">
            <span className="hover:text-gray-700 cursor-pointer">Sales & Billing</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-semibold">Sales Documents</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Sales Documents</h1>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <MoreHorizontal className="w-4 h-4" /> More
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowNewSaleMenu(!showNewSaleMenu)}
              className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Sale
            </button>
            
            {showNewSaleMenu && (
              <div className="absolute right-0 top-11 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-20">
                <button onClick={() => { setShowNewSaleMenu(false); setNewDocType('Invoice'); setShowNewDocModal(true); }} className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">New Invoice</button>
                <button onClick={() => navigate('/sales-billing/pos')} className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">POS Billing</button>
                <button onClick={() => { setShowNewSaleMenu(false); setNewDocType('Quotation'); setShowNewDocModal(true); }} className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">New Quotation</button>
                <button onClick={() => { setShowNewSaleMenu(false); setNewDocType('Sales Order'); setShowNewDocModal(true); }} className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">New Sales Order</button>
                <button onClick={() => { setShowNewSaleMenu(false); setNewDocType('Delivery Challan'); setShowNewDocModal(true); }} className="w-full text-left px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50">New Delivery Challan</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-6 shrink-0 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`pb-3 flex items-center gap-2 text-[14px] font-semibold transition-colors relative whitespace-nowrap ${
              activeTab === tab.name ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              activeTab === tab.name ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {tab.count}
            </span>
            {activeTab === tab.name && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-6 shrink-0">
        <KPICard title="TOTAL DOCUMENTS" value="128" pillText="↗ 12%" pillType="positive" />
        <KPICard title="TOTAL SALES" value="₹24,58,450" pillText="↗ 8.4%" pillType="positive" />
        <KPICard title="PENDING PAYMENTS" value="₹3,42,100" pillText="↘ 2.1%" pillType="negative" />
        <KPICard title="DRAFTS" value="8" pillText="Needs review" pillType="neutral" />
      </div>

      {/* Main Content Area: Table / Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search invoice no., customer..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[280px] bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
              Type: All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
              Status: All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> More Filters
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
            Sort by: <span className="font-semibold text-gray-900 cursor-pointer flex items-center gap-1">Latest <ChevronDown className="w-3.5 h-3.5 text-gray-400" /></span>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
              <tr>
                <th className="py-3.5 px-4 w-12 border-b border-gray-100">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredDocs.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">DOCUMENT NO.</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">TYPE</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">DATE</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">CUSTOMER</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">ITEMS</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">AMOUNT</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">PAYMENT</th>
                <th className="py-3.5 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-gray-500 text-[14px]">
                    No documents found.
                  </td>
                </tr>
              ) : (
                filteredDocs.map(doc => (
                  <tr 
                    key={doc.id} 
                    onClick={() => setSelectedDoc(doc)}
                    className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(doc.id)} 
                        onChange={(e) => toggleSelect(doc.id, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                      />
                    </td>
                    <td className="py-4 px-4 font-semibold text-indigo-600 text-[13.5px] group-hover:text-indigo-800">{doc.id}</td>
                    <td className="py-4 px-4 text-gray-700 text-[13.5px]">{doc.type}</td>
                    <td className="py-4 px-4 text-gray-600 text-[13.5px] whitespace-nowrap">{doc.date}</td>
                    <td className="py-4 px-4 font-medium text-gray-900 text-[13.5px]">{doc.customer}</td>
                    <td className="py-4 px-4 text-gray-600 text-[13.5px]">{doc.items}</td>
                    <td className="py-4 px-4 font-bold text-gray-900 text-[13.5px] text-right">{formatCurrency(doc.amount)}</td>
                    <td className="py-4 px-4">
                      {doc.payment !== '-' ? (
                        <span className={`px-2.5 py-1 rounded text-[11.5px] font-bold ${getBadgeStyles(doc.payment)}`}>{doc.payment}</span>
                      ) : <span className="text-gray-400 pl-4">-</span>}
                    </td>
                    <td className="py-4 px-4">
                      {doc.status !== '-' ? (
                        <span className={`px-2.5 py-1 rounded text-[11.5px] font-bold ${getBadgeStyles(doc.status)}`}>{doc.status}</span>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0 rounded-b-xl">
          <div className="text-[13px] text-gray-500 font-medium">
            Showing 1-{Math.min(20, filteredDocs.length)} of {filteredDocs.length} documents
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-[13px] font-bold flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-lg text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">3</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 rounded-lg text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">7</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* --- Detail Drawer --- */}
      {selectedDoc && (
        <>
          <div className="absolute inset-0 bg-black/20 z-40 transition-opacity" onClick={() => setSelectedDoc(null)}></div>
          <div className="absolute top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slide-in">
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900">{selectedDoc.id}</h2>
                  <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${getBadgeStyles(selectedDoc.status)}`}>{selectedDoc.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  <button onClick={() => setSelectedDoc(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-[14px] text-gray-600">
                <span className="font-semibold text-gray-900">{selectedDoc.customer}</span> • {selectedDoc.date}
              </div>
              
              <div className="flex gap-6 mt-6 border-b border-gray-100">
                {['Overview', 'Items', 'Payments', 'Activity'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`pb-3 text-[13px] font-semibold transition-colors relative ${detailTab === tab ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab}
                    {detailTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {detailTab === 'Overview' && (
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4">Document Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] text-gray-500 font-medium mb-1">Total Amount</div>
                        <div className="text-[16px] font-bold text-gray-900">{formatCurrency(selectedDoc.amount)}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-500 font-medium mb-1">Payment Status</div>
                        <div className="text-[13.5px] font-semibold text-gray-900">{selectedDoc.payment}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-500 font-medium mb-1">Type</div>
                        <div className="text-[13.5px] font-semibold text-gray-900">{selectedDoc.type}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-500 font-medium mb-1">Created</div>
                        <div className="text-[13.5px] font-semibold text-gray-900">{selectedDoc.date}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-10 text-center">
                    <FileText className="w-10 h-10 text-gray-300 mb-3" />
                    <div className="text-[14px] font-bold text-gray-700">Preview Available Soon</div>
                    <div className="text-[12px] text-gray-500 mt-1">PDF rendering will be enabled in the next update.</div>
                  </div>
                </div>
              )}
              {detailTab !== 'Overview' && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <p className="text-[13px] font-medium">{detailTab} details not available in mock view.</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-3 shrink-0">
              <button className="px-4 py-2 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Edit Document</button>
              <button className="px-4 py-2 text-[13px] font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Record Payment</button>
            </div>
          </div>
        </>
      )}

      {/* --- New Document Modal --- */}
      {showNewDocModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden border border-gray-200 animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Create {newDocType}</h3>
              <button onClick={() => setShowNewDocModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDocument} className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Customer Name</label>
                <input name="customer" type="text" placeholder="e.g. Acme Corp" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Number of Items</label>
                  <input name="items" type="number" defaultValue="1" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Total Amount (₹)</label>
                  <input name="amount" type="number" defaultValue="1000" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowNewDocModal(false)} className="px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">Create Document</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #D1D5DB; }
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; }
      `}} />
    </div>
  );
};

/* --- Local Helper Components --- */

const KPICard = ({ title, value, pillText, pillType }) => {
  const getPillStyle = () => {
    switch(pillType) {
      case 'positive': return 'bg-emerald-100 text-emerald-700';
      case 'negative': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[12px] font-bold text-gray-500 tracking-wider">{title}</h3>
        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getPillStyle()}`}>
          {pillText}
        </span>
      </div>
      <div className="text-[26px] font-bold text-gray-900 leading-none">{value}</div>
    </div>
  );
};

export default SalesDocuments;
