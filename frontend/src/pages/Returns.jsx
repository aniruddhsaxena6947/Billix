import React, { useState } from 'react';
import { 
  Package, ShoppingCart, ArrowDownCircle, Clock, FileText, Download, MoreHorizontal,
  Search, ChevronDown, ChevronLeft, ChevronRight, Check, X, Filter,
  Printer, Share2, Tag, Trash2, Calendar, User, Eye, Edit
} from 'lucide-react';

// --- MOCK DATA ---
const initialReturns = [
  { id: '1', returnNo: 'RET-000124', type: 'Sales Return', originalDoc: 'INV-001245', docDate: '28 May 2026', party: 'Sharma Traders', returnDate: '28 May 2026', items: 2, amount: 2450.00, status: 'Completed', reason: 'Damaged Product', returnedBy: 'Amit Kumar', creditType: 'Refund', notes: 'Product outer packing was damaged.' },
  { id: '2', returnNo: 'PRET-000089', type: 'Purchase Return', originalDoc: 'PINV-00078', docDate: '27 May 2026', party: 'Ganesh Manufacturing', returnDate: '27 May 2026', items: 3, amount: 5200.00, status: 'Completed', reason: 'Quality Issue', returnedBy: 'Rahul Singh', creditType: 'Credit Note', notes: 'Items did not meet quality standards.' },
  { id: '3', returnNo: 'RET-000123', type: 'Sales Return', originalDoc: 'INV-001233', docDate: '26 May 2026', party: 'Gupta Traders', returnDate: '26 May 2026', items: 1, amount: 1150.00, status: 'Refunded', reason: 'Customer Request', returnedBy: 'Priya Verma', creditType: 'Refund', notes: 'Customer changed their mind.' },
  { id: '4', returnNo: 'PRET-000088', type: 'Purchase Return', originalDoc: 'PINV-00072', docDate: '25 May 2026', party: 'R.K. Enterprises', returnDate: '25 May 2026', items: 2, amount: 3600.00, status: 'Credit Note', reason: 'Wrong Item', returnedBy: 'Amit Kumar', creditType: 'Credit Note', notes: 'Received wrong items.' },
  { id: '5', returnNo: 'RET-000122', type: 'Sales Return', originalDoc: 'INV-001220', docDate: '24 May 2026', party: 'Kumar & Co.', returnDate: '24 May 2026', items: 4, amount: 8750.00, status: 'Completed', reason: 'Damaged Product', returnedBy: 'Neha Sharma', creditType: 'Replacement', notes: 'Replacement sent.' },
  { id: '6', returnNo: 'PRET-000087', type: 'Purchase Return', originalDoc: 'PINV-00068', docDate: '23 May 2026', party: 'M/s. Agarwal Stores', returnDate: '23 May 2026', items: 1, amount: 2300.00, status: 'Pending', reason: 'Defective', returnedBy: 'Rahul Singh', creditType: 'Refund', notes: 'Awaiting supplier response.' },
  { id: '7', returnNo: 'RET-000121', type: 'Sales Return', originalDoc: 'INV-001210', docDate: '22 May 2026', party: 'Sharma Distributors', returnDate: '22 May 2026', items: 2, amount: 1980.00, status: 'Pending', reason: 'Quality Issue', returnedBy: 'Amit Kumar', creditType: 'Credit Note', notes: 'Under verification.' },
  { id: '8', returnNo: 'PRET-000086', type: 'Purchase Return', originalDoc: 'PINV-00063', docDate: '21 May 2026', party: 'National Suppliers', returnDate: '21 May 2026', items: 3, amount: 4450.00, status: 'Completed', reason: 'Excess Quantity', returnedBy: 'Rahul Singh', creditType: 'Credit Note', notes: 'Returned excess stock.' },
  { id: '9', returnNo: 'RET-000120', type: 'Sales Return', originalDoc: 'INV-001205', docDate: '20 May 2026', party: 'Abhishek Retailers', returnDate: '20 May 2026', items: 1, amount: 950.00, status: 'Refunded', reason: 'Customer Request', returnedBy: 'Priya Verma', creditType: 'Refund', notes: 'Refund processed to source.' },
  { id: '10', returnNo: 'PRET-000085', type: 'Purchase Return', originalDoc: 'PINV-00059', docDate: '19 May 2026', party: 'Precise Industries', returnDate: '19 May 2026', items: 2, amount: 2720.00, status: 'Credit Note', reason: 'Wrong Item', returnedBy: 'Rahul Singh', creditType: 'Credit Note', notes: 'Credit note received.' },
];

const formatCurrency = (amt) => {
  if (!amt || amt === 0) return '—';
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amt);
};

const KPICard = ({ title, value, subtext, icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col min-w-[180px] flex-1">
    <div className="flex items-start justify-between mb-3">
      <div className={"w-10 h-10 rounded-lg flex items-center justify-center " + iconBg + " " + iconColor}>
        {icon}
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-[13px] font-semibold text-gray-500 mb-0.5">{title}</span>
      <span className="text-xl font-bold text-gray-900 leading-tight tracking-tight">{value}</span>
      <span className="text-[12px] font-medium text-gray-400 mt-1">{subtext}</span>
    </div>
  </div>
);

const getTypeBadge = (type) => {
  if (type === 'Sales Return') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded flex flex-col items-center justify-center py-0.5 px-2 w-max mx-auto">
        <span className="text-emerald-700 text-[10px] font-bold leading-none tracking-wide">Sales</span>
        <span className="text-emerald-700 text-[10px] font-bold leading-none tracking-wide">Return</span>
      </div>
    );
  }
  if (type === 'Purchase Return') {
    return (
      <div className="bg-orange-50 border border-orange-100 rounded flex flex-col items-center justify-center py-0.5 px-2 w-max mx-auto">
        <span className="text-orange-600 text-[10px] font-bold leading-none tracking-wide">Purchase</span>
        <span className="text-orange-600 text-[10px] font-bold leading-none tracking-wide">Return</span>
      </div>
    );
  }
  return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[11px] font-bold">{type}</span>;
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed': return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-emerald-100 whitespace-nowrap">{status}</span>;
    case 'Refunded': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{status}</span>;
    case 'Credit Note': return (
      <div className="bg-purple-50 text-purple-700 rounded text-[10px] font-bold border border-purple-100 flex flex-col items-center justify-center py-0.5 px-2 leading-none w-max mx-auto">
        <span>Credit</span>
        <span>Note</span>
      </div>
    );
    case 'Pending': return <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-orange-100 whitespace-nowrap">{status}</span>;
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">{status}</span>;
  }
};

const Returns = () => {
  const [activeTab, setActiveTab] = useState('All Returns');
  const [searchQuery, setSearchQuery] = useState('');
  const [returns, setReturns] = useState(initialReturns);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Detail Drawer State
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [drawerTab, setDrawerTab] = useState('Overview');

  // Modals
  const [showNewReturnDropdown, setShowNewReturnDropdown] = useState(false);
  const [showNewReturnModal, setShowNewReturnModal] = useState(false);
  const [newReturnType, setNewReturnType] = useState('Sales Return');

  const getFilteredReturns = () => {
    let filtered = returns;
    
    if (activeTab === 'Sales Returns') {
      filtered = filtered.filter(p => p.type === 'Sales Return');
    } else if (activeTab === 'Purchase Returns') {
      filtered = filtered.filter(p => p.type === 'Purchase Return');
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.returnNo.toLowerCase().includes(q) || 
        p.originalDoc.toLowerCase().includes(q) ||
        p.party.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  };

  const filteredReturns = getFilteredReturns();

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredReturns.length) setSelectedIds([]);
    else setSelectedIds(filteredReturns.map(p => p.id));
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleCreateReturn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRet = {
      id: Date.now().toString(),
      returnNo: newReturnType === 'Sales Return' ? "RET-00" + (returns.length + 105) : "PRET-00" + (returns.length + 105),
      type: newReturnType,
      originalDoc: formData.get('originalDoc'),
      docDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      party: formData.get('party'),
      returnDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: parseInt(formData.get('items')) || 1,
      amount: parseFloat(formData.get('amount')) || 0,
      status: 'Pending',
      reason: formData.get('reason') || 'Other',
      returnedBy: 'Current User',
      creditType: 'Pending',
      notes: ''
    };
    setReturns([newRet, ...returns]);
    setShowNewReturnModal(false);
    setActiveTab(newReturnType === 'Sales Return' ? 'Sales Returns' : 'Purchase Returns');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Returns</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowNewReturnDropdown(!showNewReturnDropdown)}
              className="bg-[#4F46E5] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
            >
              + New Return <ChevronDown className="w-4 h-4 ml-1 opacity-80" />
            </button>
            
            {showNewReturnDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                <button 
                  onClick={() => { setNewReturnType('Sales Return'); setShowNewReturnModal(true); setShowNewReturnDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-indigo-700 hover:bg-indigo-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> New Sales Return
                </button>
                <button 
                  onClick={() => { setNewReturnType('Purchase Return'); setShowNewReturnModal(true); setShowNewReturnDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> New Purchase Return
                </button>
              </div>
            )}
          </div>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            More <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 shrink-0 mb-6 gap-6 px-1">
        {[
          { id: 'All Returns', label: "All Returns" },
          { id: 'Sales Returns', label: "Sales Returns" },
          { id: 'Purchase Returns', label: "Purchase Returns" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedIds([]); }}
            className={"pb-3 text-[14.5px] font-bold transition-colors relative whitespace-nowrap " + (activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700')}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* KPI Cards Row */}
      <div className="flex gap-4 mb-6 shrink-0 w-full overflow-x-auto pb-1">
        <KPICard 
          title="Total Returns" 
          value="₹3,72,450" 
          subtext="18 Returns" 
          icon={<Package className="w-5 h-5" />} 
          iconBg="bg-indigo-50" 
          iconColor="text-indigo-600" 
        />
        <KPICard 
          title="Sales Return" 
          value="₹1,58,750" 
          subtext="8 Returns" 
          icon={<ShoppingCart className="w-5 h-5" />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-600" 
        />
        <KPICard 
          title="Purchase Return" 
          value="₹2,13,700" 
          subtext="10 Returns" 
          icon={<ArrowDownCircle className="w-5 h-5" />} 
          iconBg="bg-orange-50" 
          iconColor="text-orange-600" 
        />
        <KPICard 
          title="Pending Returns" 
          value="₹48,250" 
          subtext="4 Returns" 
          icon={<Clock className="w-5 h-5" />} 
          iconBg="bg-red-50" 
          iconColor="text-red-500" 
        />
        <KPICard 
          title="Refunds Issued" 
          value="₹2,25,650" 
          subtext="11 Returns" 
          icon={<FileText className="w-5 h-5" />} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-500" 
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
                  <Tag className="w-4 h-4 text-gray-500" /> Mark Status
                </button>
                <button className="flex items-center gap-1.5 text-[13px] font-bold text-red-600 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded ml-1">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
            <button onClick={() => setSelectedIds([])} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Search & Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search return no., invoice no., party name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-wrap items-end gap-3 mt-1">
            <div className="flex flex-col gap-1 w-40">
              <label className="text-[11px] font-bold text-gray-500">Return Type</label>
              <button className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
                All Types <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col gap-1 w-40">
              <label className="text-[11px] font-bold text-gray-500">From Date</label>
              <div className="relative">
                <input type="text" value="01/04/2026" readOnly className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium focus:outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-40">
              <label className="text-[11px] font-bold text-gray-500">To Date</label>
              <div className="relative">
                <input type="text" value="31/03/2027" readOnly className="w-full bg-white border border-gray-200 text-gray-700 px-3 py-1.5 pr-8 rounded-lg text-[13px] font-medium focus:outline-none" />
                <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2 h-[34px]">
              <Filter className="w-4 h-4 text-gray-500" /> Filters
            </button>
            <button className="text-indigo-600 font-semibold text-[13px] hover:text-indigo-800 h-[34px] flex items-center px-2">
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2 py-1 rounded text-[12px] font-medium border border-gray-200">
              Status: All <button className="hover:text-gray-900"><X className="w-3 h-3" /></button>
            </span>
            <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-2 py-1 rounded text-[12px] font-medium border border-gray-200">
              Type: All <button className="hover:text-gray-900"><X className="w-3 h-3" /></button>
            </span>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
              <tr>
                <th className="py-3 px-4 w-12 border-b border-gray-100">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredReturns.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">Return<br/>No.</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-center">Type</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">Original<br/>Document</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">Party</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">Return<br/>Date</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">Items</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-right">Return<br/>Amount (₹)</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-center">Status</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length === 0 ? (
                <tr><td colSpan="10" className="py-16 text-center text-gray-500 text-[14px]">No returns found.</td></tr>
              ) : (
                filteredReturns.map(ret => (
                  <tr 
                    key={ret.id}
                    onClick={() => setSelectedReturn(ret)}
                    className={"border-b border-gray-50 hover:bg-gray-50/70 transition-colors cursor-pointer " + (selectedIds.includes(ret.id) ? 'bg-indigo-50/20' : '') + (selectedReturn?.id === ret.id ? ' bg-gray-50' : '')}
                  >
                    <td className="py-3 px-4 w-12" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(ret.id)} 
                        onChange={() => toggleSelect(ret.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" 
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-indigo-700 text-[13px]">{ret.returnNo}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {getTypeBadge(ret.type)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-bold text-[13px]">{ret.originalDoc}</span>
                        <span className="text-gray-400 text-[11px] font-medium">{ret.docDate}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-bold text-[13px]">{ret.party}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col text-gray-600 text-[13px] font-medium">
                        <span>{ret.returnDate.split(' ')[0]}</span>
                        <span>{ret.returnDate.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900 text-[13px] font-medium text-center">{ret.items}</td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-[13.5px] text-right">{formatCurrency(ret.amount)}</td>
                    <td className="py-3 px-4 text-center">
                      {getStatusBadge(ret.status)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors hover:bg-gray-100" onClick={e => e.stopPropagation()}>
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
            Showing 1 to 10 of 18 returns
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
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors bg-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Detail Drawer --- */}
      {selectedReturn && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" onClick={() => setSelectedReturn(null)}></div>
          <div className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 animate-slide-in-right">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{selectedReturn.returnNo}</h2>
                <div className="flex scale-90 origin-left">
                  {getTypeBadge(selectedReturn.type)}
                </div>
              </div>
              <button onClick={() => setSelectedReturn(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Meta Info */}
            <div className="p-5 flex items-start justify-between border-b border-gray-50">
              <div>
                <p className="text-[11px] font-bold text-gray-500 mb-1">From Invoice</p>
                <p className="text-[13.5px] font-bold text-indigo-700">{selectedReturn.originalDoc}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 mb-1">Return Date</p>
                <p className="text-[13.5px] font-bold text-gray-900">{selectedReturn.returnDate}</p>
              </div>
            </div>
            <div className="px-5 py-3 border-b border-gray-50">
              <p className="text-[11px] font-bold text-gray-500 mb-1">Party</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-[13.5px] font-bold text-gray-900">{selectedReturn.party}</span>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="p-5 flex gap-3 bg-gray-50/50">
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">ITEMS</span>
                <span className="text-lg font-bold text-gray-900">{selectedReturn.items}</span>
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">RETURN AMOUNT</span>
                <span className="text-lg font-bold text-gray-900">₹{formatCurrency(selectedReturn.amount)}</span>
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">STATUS</span>
                <div className="mt-1">{getStatusBadge(selectedReturn.status)}</div>
              </div>
            </div>

            {/* Drawer Tabs */}
            <div className="flex border-b border-gray-200 px-5 shrink-0">
              {['Overview', 'Items ('+selectedReturn.items+')', 'Payments', 'History'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab.split(' ')[0])}
                  className={"py-3 px-4 text-[13px] font-bold transition-colors relative whitespace-nowrap " + (drawerTab === tab.split(' ')[0] ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700')}
                >
                  {tab}
                  {drawerTab === tab.split(' ')[0] && (
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
                    <div className="text-gray-500 font-medium">Reason</div>
                    <div className="text-gray-900 font-bold text-right">{selectedReturn.reason}</div>
                    
                    <div className="text-gray-500 font-medium">Return Type</div>
                    <div className="text-gray-900 font-bold text-right">Customer Return</div>
                    
                    <div className="text-gray-500 font-medium">Credit Type</div>
                    <div className="text-gray-900 font-bold text-right">{selectedReturn.creditType}</div>
                    
                    <div className="text-gray-500 font-medium">Refund Amount</div>
                    <div className="text-gray-900 font-bold text-right">₹{formatCurrency(selectedReturn.amount)}</div>
                    
                    <div className="text-gray-500 font-medium">Returned By</div>
                    <div className="text-gray-900 font-bold text-right">{selectedReturn.returnedBy}</div>
                  </div>
                  
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 mb-2">Notes</div>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-[13px] text-gray-700">
                      {selectedReturn.notes || 'No notes provided.'}
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

            {/* Drawer Actions */}
            <div className="p-5 border-t border-gray-100 bg-white flex items-center justify-between gap-3 shrink-0">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <Eye className="w-4 h-4 text-gray-500" /> View Invoice
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <Edit className="w-4 h-4 text-gray-500" /> Edit Return
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <Printer className="w-4 h-4 text-gray-500" /> Print
              </button>
            </div>
            
          </div>
        </>
      )}

      {/* --- Add Mock Document Modal --- */}
      {showNewReturnModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] flex flex-col border border-gray-200 animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">New {newReturnType}</h3>
              <button onClick={() => setShowNewReturnModal(false)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateReturn}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Original Document No.</label>
                  <input name="originalDoc" type="text" placeholder="e.g. INV-001245" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Party Name</label>
                  <input name="party" type="text" placeholder="Select or type party..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">No. of Items Returned</label>
                    <input name="items" type="number" defaultValue="1" min="1" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Total Amount (₹)</label>
                    <input name="amount" type="number" step="0.01" placeholder="0.00" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Reason for Return</label>
                  <input name="reason" type="text" placeholder="e.g. Damaged Product" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
                <button type="button" onClick={() => setShowNewReturnModal(false)} className="px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">Create Return</button>
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
        @keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out forwards; }
      `}} />
    </div>
  );
};

export default Returns;
