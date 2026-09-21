import React, { useState } from 'react';
import { 
  FileText, TrendingUp, Clock, Calendar, Download, MoreHorizontal,
  Search, ChevronDown, ChevronLeft, ChevronRight, Check, X,
  Printer, Share2, Tag, Trash2, Filter
} from 'lucide-react';

// --- MOCK DATA ---
const initialDocuments = [
  { id: '1', docNo: 'PUR-2026-00104', type: 'Purchase Invoice', date: '24 Aug 2026', supplier: 'ABC Traders', items: 6, amount: 68500, paymentStatus: 'Paid', docStatus: 'Completed' },
  { id: '2', docNo: 'PUR-2026-00103', type: 'Purchase Order', date: '22 Aug 2026', supplier: 'Metro Wholesale', items: 14, amount: 72450, paymentStatus: 'Pending', docStatus: 'Confirmed' },
  { id: '3', docNo: 'PUR-2026-00102', type: 'Purchase Invoice', date: '20 Aug 2026', supplier: 'Ananya Distributors', items: 3, amount: 12150, paymentStatus: 'Partially Paid', docStatus: 'Partially Paid' },
  { id: '4', docNo: 'PUR-2026-00101', type: 'Quotation', date: '18 Aug 2026', supplier: 'Kiran Traders', items: 8, amount: 14200, paymentStatus: 'Not Applicable', docStatus: 'Sent' },
  { id: '5', docNo: 'PUR-2026-00100', type: 'Purchase Order', date: '15 Aug 2026', supplier: 'Vikas Enterprises', items: 12, amount: 54100, paymentStatus: 'Pending', docStatus: 'Processing' },
  { id: '6', docNo: 'PUR-2026-00099', type: 'Purchase Invoice', date: '12 Aug 2026', supplier: 'Global Supplies', items: 10, amount: 125000, paymentStatus: 'Overdue', docStatus: 'Overdue' },
];

const formatCurrency = (amt) => {
  if (!amt || amt === 0) return '—';
  return '₹' + new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amt);
};

const PurchaseKPICard = ({ title, value, subtext, icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4 flex-1 min-w-[200px]">
    <div className={"w-12 h-12 rounded-lg flex items-center justify-center shrink-0 " + iconBg + " " + iconColor}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[13px] font-semibold text-gray-500 mb-0.5">{title}</span>
      <span className="text-xl font-bold text-gray-900 leading-tight">{value}</span>
      <span className="text-[11px] font-medium text-gray-400 mt-1">{subtext}</span>
    </div>
  </div>
);

const getTypeBadge = (type) => {
  switch (type) {
    case 'Purchase Invoice': return <span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-purple-100 whitespace-nowrap">{type}</span>;
    case 'Purchase Order': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{type}</span>;
    case 'Quotation': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{type}</span>;
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">{type}</span>;
  }
};

const getPaymentBadge = (status) => {
  switch (status) {
    case 'Paid': return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-emerald-100 whitespace-nowrap">{status}</span>;
    case 'Pending': return <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-orange-100 whitespace-nowrap">{status}</span>;
    case 'Partially Paid': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{status}</span>;
    case 'Not Applicable': return <span className="bg-gray-50 text-gray-500 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-gray-200 whitespace-nowrap">{status}</span>;
    case 'Overdue': return <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-red-100 whitespace-nowrap">{status}</span>;
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">{status}</span>;
  }
};

const getDocBadge = (status) => {
  switch (status) {
    case 'Completed': return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-emerald-100 whitespace-nowrap">{status}</span>;
    case 'Confirmed': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{status}</span>;
    case 'Sent': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{status}</span>;
    case 'Processing': return <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-orange-100 whitespace-nowrap">{status}</span>;
    case 'Partially Paid': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{status}</span>;
    case 'Overdue': return <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-red-100 whitespace-nowrap">{status}</span>;
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">{status}</span>;
  }
};

const PurchaseDocuments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Modals
  const [showNewPurchaseDropdown, setShowNewPurchaseDropdown] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [draftType, setDraftType] = useState('Purchase Invoice');

  const getFilteredDocs = () => {
    let filtered = documents;
    
    if (activeTab === 'Invoices') {
      filtered = filtered.filter(p => p.type === 'Purchase Invoice');
    } else if (activeTab === 'Orders') {
      filtered = filtered.filter(p => p.type === 'Purchase Order');
    } else if (activeTab === 'Quotations') {
      filtered = filtered.filter(p => p.type === 'Quotation');
    } else if (activeTab === 'Drafts') {
      filtered = filtered.filter(p => p.docStatus === 'Draft');
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.docNo.toLowerCase().includes(q) || 
        p.supplier.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  };

  const filteredDocs = getFilteredDocs();

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredDocs.length) setSelectedIds([]);
    else setSelectedIds(filteredDocs.map(p => p.id));
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleCreateDraft = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDoc = {
      id: Date.now().toString(),
      docNo: "PUR-2026-00" + (documents.length + 105),
      type: draftType,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      supplier: formData.get('supplier'),
      items: parseInt(formData.get('items')) || 1,
      amount: parseFloat(formData.get('amount')) || 0,
      paymentStatus: 'Pending',
      docStatus: 'Draft'
    };
    setDocuments([newDoc, ...documents]);
    setShowDraftModal(false);
    setActiveTab('Drafts');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <div className="text-[13px] text-gray-500 font-medium mb-1 flex items-center gap-2">
            <span className="text-gray-400">/</span>
            <span className="text-indigo-600 font-semibold">Purchase Documents</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Purchase Documents</h1>
        </div>
        
        <div className="flex items-center gap-3">
          
          <div className="relative">
            <button 
              onClick={() => setShowNewPurchaseDropdown(!showNewPurchaseDropdown)}
              className="bg-[#4F46E5] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              + New Purchase <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
            </button>
            
            {showNewPurchaseDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                <button 
                  onClick={() => { setDraftType('Purchase Invoice'); setShowDraftModal(true); setShowNewPurchaseDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> New Purchase Invoice
                </button>
                <button 
                  onClick={() => { setDraftType('Purchase Order'); setShowDraftModal(true); setShowNewPurchaseDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> New Purchase Order
                </button>
                <button 
                  onClick={() => { setDraftType('Quotation'); setShowDraftModal(true); setShowNewPurchaseDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" /> Quick Purchase
                </button>
              </div>
            )}
          </div>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 p-2.5 rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 shrink-0 mb-6 gap-6 px-1">
        {[
          { id: 'All', label: "All (" + documents.length + ")", refCount: 156 },
          { id: 'Invoices', label: "Invoices (" + documents.filter(p => p.type === 'Purchase Invoice').length + ")", refCount: 54 },
          { id: 'Orders', label: "Orders (" + documents.filter(p => p.type === 'Purchase Order').length + ")", refCount: 28 },
          { id: 'Quotations', label: "Quotations (" + documents.filter(p => p.type === 'Quotation').length + ")", refCount: 18 },
          { id: 'Drafts', label: "Drafts (" + documents.filter(p => p.docStatus === 'Draft').length + ")", refCount: 10 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedIds([]); }}
            className={"pb-3 text-[14.5px] font-bold transition-colors relative whitespace-nowrap " + (activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700')}
          >
            {/* We show the true local count here to keep mock state consistent, but visually follows the reference structure */}
            {tab.id} <span className="text-gray-400 font-medium ml-1">({tab.id === 'All' ? 156 : tab.refCount})</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* KPI Cards Row */}
      <div className="flex gap-4 mb-6 shrink-0 w-full overflow-x-auto pb-1">
        <PurchaseKPICard 
          title="Total Documents" 
          value="156" 
          subtext="All time" 
          icon={<FileText className="w-6 h-6" />} 
          iconBg="bg-indigo-50" 
          iconColor="text-indigo-600" 
        />
        <PurchaseKPICard 
          title="Total Purchase" 
          value="₹32,46,750" 
          subtext="All time" 
          icon={<TrendingUp className="w-6 h-6" />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-600" 
        />
        <PurchaseKPICard 
          title="Pending Payments" 
          value="₹8,42,300" 
          subtext="Overdue & Pending" 
          icon={<Clock className="w-6 h-6" />} 
          iconBg="bg-orange-50" 
          iconColor="text-orange-500" 
        />
        <PurchaseKPICard 
          title="This Month" 
          value="₹4,52,500" 
          subtext="Aug 2026" 
          icon={<Calendar className="w-6 h-6" />} 
          iconBg="bg-gray-100" 
          iconColor="text-gray-500" 
        />
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1 overflow-hidden relative">
        
        {/* Bulk Action Floating Bar */}
        {selectedIds.length > 0 && (
          <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 p-3.5 z-20 flex items-center justify-between animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-[13px] font-bold">
                <Check className="w-4 h-4" /> {selectedIds.length} selected
              </div>
              <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <button className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded">
                  <Download className="w-4 h-4 text-gray-500" /> Export
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded">
                  <Printer className="w-4 h-4 text-gray-500" /> Print
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded">
                  <Share2 className="w-4 h-4 text-gray-500" /> Share
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-700 hover:text-gray-900 px-2 py-1 hover:bg-gray-50 rounded">
                  <Tag className="w-4 h-4 text-gray-500" /> Mark Status
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-bold text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded ml-1">
                  <Trash2 className="w-4 h-4" /> Delete Drafts
                </button>
              </div>
            </div>
            <button onClick={() => setSelectedIds([])} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-100 flex flex-col gap-4 shrink-0 bg-white">
            <div className="relative flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search invoice no., supplier, phone, SKU or amount..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" /> More Filters
              </button>
              <button onClick={() => setSearchQuery('')} className="text-gray-500 font-semibold text-[13px] hover:text-gray-700">
                Clear Filters
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] font-bold text-gray-500">Document Type</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] font-bold text-gray-500">Supplier</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] font-bold text-gray-500">Payment Status</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] font-bold text-gray-500">Document Status</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] font-bold text-gray-500">Date Range</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                01/08/2026 - 31/08/... <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-[11px] font-bold text-gray-500">Amount Range</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                Min - Max <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
              <tr>
                <th className="py-3 px-4 w-12 border-b border-gray-100">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredDocs.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">DOCUMENT NO</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">TYPE</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">DATE</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">SUPPLIER</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">ITEMS</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">AMOUNT</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">PAYMENT STATUS</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">DOCUMENT STATUS</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.length === 0 ? (
                <tr><td colSpan="10" className="py-16 text-center text-gray-500 text-[14px]">No documents found.</td></tr>
              ) : (
                filteredDocs.map(doc => (
                  <tr 
                    key={doc.id}
                    className={"border-b border-gray-50 hover:bg-gray-50/70 transition-colors " + (selectedIds.includes(doc.id) ? 'bg-indigo-50/20' : '')}
                  >
                    <td className="py-3 px-4 w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(doc.id)} 
                        onChange={() => toggleSelect(doc.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" 
                      />
                    </td>
                    <td className="py-3 px-4 cursor-pointer">
                      <span className="font-bold text-indigo-700 text-[13px] hover:underline">{doc.docNo}</span>
                    </td>
                    <td className="py-3 px-4">
                      {getTypeBadge(doc.type)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600 text-[13px] font-medium">{doc.date}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-bold text-[13px]">{doc.supplier}</td>
                    <td className="py-3 px-4 text-gray-600 text-[13px] font-medium">{doc.items} items</td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-[13.5px]">{formatCurrency(doc.amount)}</td>
                    <td className="py-3 px-4">
                      {getPaymentBadge(doc.paymentStatus)}
                    </td>
                    <td className="py-3 px-4">
                      {getDocBadge(doc.docStatus)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors hover:bg-gray-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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
            Showing 1 to 10 of 156 documents
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-[13px] font-medium text-gray-600 cursor-pointer hover:bg-gray-50 shadow-sm">
              <span className="font-bold">10</span> per page <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 bg-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#4F46E5] text-white text-[12px] font-bold">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">2</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">3</button>
              <span className="text-gray-400 px-1 text-[12px]">...</span>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">8</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors bg-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- Add Mock Document Modal --- */}
      {showDraftModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] flex flex-col border border-gray-200 animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">New {draftType}</h3>
              <button onClick={() => setShowDraftModal(false)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDraft}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Supplier Name</label>
                  <input name="supplier" type="text" placeholder="Select or type supplier..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">No. of Items</label>
                    <input name="items" type="number" defaultValue="1" min="1" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Total Amount (₹)</label>
                    <input name="amount" type="number" step="0.01" placeholder="0.00" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
                <button type="button" onClick={() => setShowDraftModal(false)} className="px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">Create {draftType}</button>
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
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.2s ease-out forwards; }
      `}} />
    </div>
  );
};

export default PurchaseDocuments;
