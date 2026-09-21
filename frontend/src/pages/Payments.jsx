import React, { useState } from 'react';
import { 
  Download, MoreHorizontal, Search, ChevronDown, ChevronLeft, ChevronRight,
  Filter, Calendar, X, ArrowDownLeft, ArrowUpRight, Clock, BarChart2,
  RefreshCw, User, ShoppingBag, History, Eye
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// --- MOCK DATA ---
const initialPayments = [
  { id: '1', paymentNo: 'PAY-2026-00124', date: '28 May 2026', type: 'Received', party: 'Sharma Traders', reference: 'INV-2026-00124', account: 'HDFC Bank', method: 'UPI', amount: 53100.00, status: 'Completed' },
  { id: '2', paymentNo: 'PAY-2026-00125', date: '28 May 2026', type: 'Paid', party: 'ABC Suppliers', reference: 'PINV-2026-00078', account: 'ICICI Bank', method: 'Bank Transfer', amount: 28500.00, status: 'Completed' },
  { id: '3', paymentNo: 'PAY-2026-00126', date: '27 May 2026', type: 'Received', party: 'Gupta Enterprises', reference: 'INV-2026-00118', account: 'Cash', method: 'Cash', amount: 18000.00, status: 'Pending' },
  { id: '4', paymentNo: 'PAY-2026-00127', date: '27 May 2026', type: 'Transfer', party: '—', reference: 'HDFC → Cash', account: 'Internal', method: 'Transfer', amount: 20000.00, status: 'Completed' },
  { id: '5', paymentNo: 'PAY-2026-00128', date: '26 May 2026', type: 'Refund', party: 'Sharma Traders', reference: 'RET-2026-00012', account: 'HDFC Bank', method: 'Bank Transfer', amount: 5000.00, status: 'Completed' },
  { id: '6', paymentNo: 'PAY-2026-00129', date: '25 May 2026', type: 'Paid', party: 'Modern Suppliers', reference: 'PINV-2026-00032', account: 'SBI', method: 'Cheque', amount: 45000.00, status: 'Reversed' },
  { id: '7', paymentNo: 'PAY-2026-00130', date: '25 May 2026', type: 'Received', party: 'Kumar Distributors', reference: '—', account: 'Axis Bank', method: 'UPI', amount: 12500.00, status: 'Completed' },
  { id: '8', paymentNo: 'PAY-2026-00131', date: '24 May 2026', type: 'Paid', party: 'Jain Industries', reference: 'PINV-2026-00028', account: 'ICICI Bank', method: 'Bank Transfer', amount: 37800.00, status: 'Failed' },
];

const formatCurrency = (amt) => {
  if (!amt || amt === 0) return '—';
  return '₹' + new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amt);
};

const getTypeBadge = (type) => {
  switch (type) {
    case 'Received': return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-emerald-100 whitespace-nowrap">{type}</span>;
    case 'Paid': return <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-red-100 whitespace-nowrap">{type}</span>;
    case 'Transfer': return <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-blue-100 whitespace-nowrap">{type}</span>;
    case 'Refund': return <span className="bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border border-purple-100 whitespace-nowrap">{type}</span>;
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap">{type}</span>;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'Completed': return (
      <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border border-emerald-100 whitespace-nowrap w-max">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{status}
      </span>
    );
    case 'Pending': return (
      <span className="flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border border-yellow-200 whitespace-nowrap w-max">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>{status}
      </span>
    );
    case 'Reversed': return (
      <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border border-gray-200 whitespace-nowrap w-max">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>{status}
      </span>
    );
    case 'Failed': return (
      <span className="flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border border-red-100 whitespace-nowrap w-max">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>{status}
      </span>
    );
    default: return <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap">{status}</span>;
  }
};

const KPICard = ({ title, value, subtext, icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-start gap-4 flex-1 min-w-[240px]">
    <div className={"w-12 h-12 rounded-full flex items-center justify-center shrink-0 " + iconBg + " " + iconColor}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[12px] font-bold text-gray-500 mb-1">{title}</span>
      <span className="text-[22px] font-bold text-gray-900 leading-tight tracking-tight mb-1">{value}</span>
      <span className="text-[11.5px] font-medium text-gray-400">{subtext}</span>
    </div>
  </div>
);

const Payments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [payments, setPayments] = useState(initialPayments);
  const [selectedIds, setSelectedIds] = useState([]);
  const [tableTab, setTableTab] = useState('All');
  const [workspaceTab, setWorkspaceTab] = useState('Payment History');

  // Drawer
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);

  const getFilteredPayments = () => {
    let filtered = payments;
    
    if (tableTab === 'Received') filtered = filtered.filter(p => p.type === 'Received');
    if (tableTab === 'Paid') filtered = filtered.filter(p => p.type === 'Paid');
    if (tableTab === 'Transfers') filtered = filtered.filter(p => p.type === 'Transfer');
    if (tableTab === 'Refunds') filtered = filtered.filter(p => p.type === 'Refund');
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.paymentNo.toLowerCase().includes(q) || 
        p.party.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  };

  const filteredPayments = getFilteredPayments();

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredPayments.length) setSelectedIds([]);
    else setSelectedIds(filteredPayments.map(p => p.id));
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPayment = {
      id: Date.now().toString(),
      paymentNo: 'PAY-2026-00' + (payments.length + 132),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      type: formData.get('type'),
      party: formData.get('party'),
      reference: formData.get('reference') || '—',
      account: formData.get('account'),
      method: formData.get('method'),
      amount: parseFloat(formData.get('amount')) || 0,
      status: 'Completed'
    };
    setPayments([newPayment, ...payments]);
    setShowNewPaymentModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Accounts & Banking</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 font-semibold">Payments</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Payments</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNewPaymentModal(true)}
            className="bg-[#3B82F6] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="text-lg leading-none mb-0.5">+</span> Record Payment
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-gray-500" /> Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="flex gap-5 mb-5 shrink-0 w-full overflow-x-auto pb-1">
        <KPICard 
          title="Total Received" 
          value="₹8,42,500" 
          subtext="Money received this period." 
          icon={<ArrowDownLeft className="w-6 h-6" />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-500" 
        />
        <KPICard 
          title="Total Paid" 
          value="₹5,76,200" 
          subtext="Money paid this period." 
          icon={<ArrowUpRight className="w-6 h-6" />} 
          iconBg="bg-red-50" 
          iconColor="text-red-500" 
        />
        <KPICard 
          title="Pending" 
          value="₹42,500" 
          subtext="Payments awaiting completion." 
          icon={<Clock className="w-6 h-6" />} 
          iconBg="bg-yellow-50" 
          iconColor="text-yellow-600" 
        />
        <KPICard 
          title="Net Movement" 
          value="₹2,66,300" 
          subtext="Received minus paid (transfers excluded)." 
          icon={<BarChart2 className="w-6 h-6" />} 
          iconBg="bg-indigo-50" 
          iconColor="text-indigo-600" 
        />
      </div>

      {/* Date Filters Row */}
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="relative">
          <button className="bg-white border border-gray-200 text-gray-900 px-3 py-2 pr-8 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" /> 01 May 2026 – 31 May 2026
          </button>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        
        <div className="flex items-center gap-2">
          {['This Month', 'Last Month', 'This Quarter', 'This Financial Year', 'Custom'].map(pill => (
            <button 
              key={pill}
              className={`px-3 py-2 rounded-lg text-[13px] font-medium border transition-colors ${pill === 'This Month' ? 'bg-blue-50 text-blue-700 border-blue-100 font-semibold' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Workspace Navigation Tabs (Horizontal rounded card style) */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm mb-5 shrink-0 flex items-center gap-2">
        <button 
          onClick={() => setWorkspaceTab('Customer Payment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors ${workspaceTab === 'Customer Payment' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <User className="w-4 h-4" /> Customer Payment
        </button>
        <button 
          onClick={() => setWorkspaceTab('Supplier Payment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors ${workspaceTab === 'Supplier Payment' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <ShoppingBag className="w-4 h-4" /> Supplier Payment
        </button>
        <button 
          onClick={() => setWorkspaceTab('Payment History')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-colors relative ${workspaceTab === 'Payment History' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <History className="w-4 h-4" /> Payment History
          {workspaceTab === 'Payment History' && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-1"></div>}
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1 overflow-hidden relative">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          
          {/* Search & Filters Inside Main */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search payment no., party, invoice, reference..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" /> Filters <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] ml-1">2</span>
            </button>
            <button className="text-gray-500 font-medium text-[13px] hover:text-gray-800">
              Clear
            </button>
          </div>
        </div>

        {/* Table Tabs */}
        <div className="flex border-b border-gray-100 px-4 pt-4 shrink-0">
          {[
            { id: 'All', count: 248 },
            { id: 'Received', count: 124 },
            { id: 'Paid', count: 98 },
            { id: 'Transfers', count: 18 },
            { id: 'Refunds', count: 8 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setTableTab(tab.id); setSelectedIds([]); }}
              className={"pb-3 px-3 text-[13.5px] font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 " + (tableTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700')}
            >
              {tab.id} <span className={"px-1.5 py-0.5 rounded text-[11px] " + (tableTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500')}>{tab.count}</span>
              {tableTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Table Content */}
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
              <tr>
                <th className="py-3 px-4 w-12 border-b border-gray-100">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredPayments.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">PAYMENT NO.</th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">
                  <div className="flex items-center gap-1">DATE <span className="flex flex-col"><ChevronDown className="w-2.5 h-2.5 rotate-180 -mb-1"/><ChevronDown className="w-2.5 h-2.5"/></span></div>
                </th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">TYPE</th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">PARTY</th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">REFERENCE</th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">ACCOUNT</th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">METHOD</th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">
                  <div className="flex items-center gap-1">AMOUNT <span className="flex flex-col"><ChevronDown className="w-2.5 h-2.5 rotate-180 -mb-1"/><ChevronDown className="w-2.5 h-2.5"/></span></div>
                </th>
                <th className="py-3 px-2 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">STATUS</th>
                <th className="py-3 px-4 text-[11px] font-bold text-gray-500 bg-white border-b border-gray-100 tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr><td colSpan="11" className="py-16 text-center text-gray-500 text-[14px]">No payments found.</td></tr>
              ) : (
                filteredPayments.map(pay => (
                  <tr 
                    key={pay.id}
                    onClick={() => setSelectedPayment(pay)}
                    className={"border-b border-gray-50 hover:bg-gray-50/70 transition-colors cursor-pointer " + (selectedIds.includes(pay.id) ? 'bg-blue-50/20' : '') + (selectedPayment?.id === pay.id ? ' bg-gray-50' : '')}
                  >
                    <td className="py-4 px-4 w-12" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(pay.id)} 
                        onChange={() => toggleSelect(pay.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer" 
                      />
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-semibold text-blue-600 hover:text-blue-800 text-[13px]">{pay.paymentNo}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-col text-gray-900 text-[12.5px] font-medium">
                        <span>{pay.date.split(' ')[0]} {pay.date.split(' ')[1]}</span>
                        <span className="text-gray-500">{pay.date.split(' ')[2]}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      {getTypeBadge(pay.type)}
                    </td>
                    <td className="py-4 px-2 text-gray-900 font-semibold text-[13px] whitespace-nowrap">{pay.party}</td>
                    <td className="py-4 px-2">
                      {pay.reference === '—' ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <span className="text-blue-600 hover:text-blue-800 text-[13px] font-medium">{pay.reference}</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-gray-600 text-[13px] whitespace-nowrap">{pay.account}</td>
                    <td className="py-4 px-2 text-gray-600 text-[13px] flex items-center gap-2 mt-1 whitespace-nowrap">
                      {pay.method === 'UPI' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>}
                      {pay.method === 'Bank Transfer' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>}
                      {pay.method === 'Cash' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>}
                      {pay.method === 'Cheque' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>}
                      {pay.method === 'Transfer' && <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3v14M17 17l4-4M17 17l-4-4M7 21V7M7 7l4 4M7 7L3 11"/></svg>}
                      {pay.method}
                    </td>
                    <td className="py-4 px-2 font-bold text-gray-900 text-[13.5px] whitespace-nowrap">{formatCurrency(pay.amount)}</td>
                    <td className="py-4 px-2">
                      {getStatusBadge(pay.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded text-[12px] font-semibold hover:bg-gray-50 transition-colors shadow-sm" onClick={e => e.stopPropagation()}>
                          View
                        </button>
                        <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors hover:bg-gray-100" onClick={e => e.stopPropagation()}>
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
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
            Showing 1 to 8 of 248 payments
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-[13px] font-medium text-gray-600 cursor-pointer hover:bg-gray-50 shadow-sm">
              <span className="font-bold">20</span> per page <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-300 bg-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#3B82F6] text-white text-[12px] font-bold">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">2</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">3</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">4</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">5</button>
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
      {selectedPayment && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" onClick={() => setSelectedPayment(null)}></div>
          <div className="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 animate-slide-in-right">
            
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">{selectedPayment.paymentNo}</h2>
                <div className="flex scale-90 origin-left">
                  {getTypeBadge(selectedPayment.type)}
                </div>
              </div>
              <button onClick={() => setSelectedPayment(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 flex items-start justify-between border-b border-gray-50">
              <div>
                <p className="text-[11px] font-bold text-gray-500 mb-1">Party</p>
                <p className="text-[13.5px] font-bold text-gray-900">{selectedPayment.party}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-gray-500 mb-1">Date</p>
                <p className="text-[13.5px] font-bold text-gray-900">{selectedPayment.date}</p>
              </div>
            </div>
            <div className="px-5 py-4 border-b border-gray-50">
              <p className="text-[11px] font-bold text-gray-500 mb-1">Reference / Invoice</p>
              <span className="text-[13.5px] font-bold text-blue-700">{selectedPayment.reference || '—'}</span>
            </div>

            <div className="p-5 flex gap-3 bg-gray-50/50">
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">AMOUNT</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedPayment.amount)}</span>
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center text-center shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">STATUS</span>
                <div className="mt-1">{getStatusBadge(selectedPayment.status)}</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-y-4 text-[13px]">
                  <div className="text-gray-500 font-medium">Payment Method</div>
                  <div className="text-gray-900 font-bold text-right">{selectedPayment.method}</div>
                  
                  <div className="text-gray-500 font-medium">Account</div>
                  <div className="text-gray-900 font-bold text-right">{selectedPayment.account}</div>
                  
                  <div className="text-gray-500 font-medium">Created By</div>
                  <div className="text-gray-900 font-bold text-right">System</div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-white flex items-center justify-between gap-3 shrink-0">
              <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <Eye className="w-4 h-4 text-gray-500" /> View Receipt
              </button>
            </div>
            
          </div>
        </>
      )}

      {/* --- Add Mock Document Modal --- */}
      {showNewPaymentModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] flex flex-col border border-gray-200 animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Record Payment</h3>
              <button onClick={() => setShowNewPaymentModal(false)} className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleRecordPayment}>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Payment Type</label>
                    <select name="type" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="Received">Customer Payment (Received)</option>
                      <option value="Paid">Supplier Payment (Paid)</option>
                      <option value="Transfer">Account Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Date</label>
                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Party Name</label>
                  <input name="party" type="text" placeholder="Select or type party..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Reference / Invoice No.</label>
                  <input name="reference" type="text" placeholder="e.g. INV-001245" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Amount (₹)</label>
                    <input name="amount" type="number" step="0.01" placeholder="0.00" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Payment Method</label>
                    <select name="method" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Account</label>
                  <select name="account" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="SBI">SBI</option>
                    <option value="Cash">Cash Account</option>
                  </select>
                </div>
              </div>
              <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
                <button type="button" onClick={() => setShowNewPaymentModal(false)} className="px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">Record Payment</button>
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

export default Payments;
