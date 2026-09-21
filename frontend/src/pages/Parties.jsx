import React, { useState } from 'react';
import { 
  Users, UserPlus, FileText, CreditCard, ShoppingCart, Download,
  MoreVertical, Search, Filter, ChevronDown, ChevronLeft, ChevronRight, X,
  User, Check, Upload
} from 'lucide-react';

// --- MOCK DATA ---
const initialParties = [
  { id: '1', code: 'PTY-00124', name: 'ABC Traders', initials: 'AT', type: ['Customer', 'Supplier'], phone: '+91 98765 43210', gstin: '09AABCA1234F1Z5', city: 'Jaipur', sales: 420000, purchases: 680000, receivable: 45200, payable: 32500, status: 'Active' },
  { id: '2', code: 'PTY-00123', name: 'Sharma Traders', initials: 'ST', type: ['Customer'], phone: '+91 98111 22334', gstin: '09SHART5678K1Z7', city: 'Delhi', sales: 875400, purchases: 0, receivable: 78500, payable: 0, status: 'Active' },
  { id: '3', code: 'PTY-00122', name: 'Ganesh Manufacturing', initials: 'GM', type: ['Supplier'], phone: '+91 98990 77665', gstin: '09GANMA9999K1Z8', city: 'Noida', sales: 0, purchases: 1240500, receivable: 0, payable: 68750, status: 'Active' },
  { id: '4', code: 'PTY-00121', name: 'Kumar & Co.', initials: 'KC', type: ['Customer'], phone: '+91 98230 44556', gstin: '09KUMAR4321F1Z8', city: 'Lucknow', sales: 312000, purchases: 0, receivable: 21800, payable: 0, status: 'Active' },
  { id: '5', code: 'PTY-00120', name: 'R.K. Enterprises', initials: 'RE', type: ['Customer', 'Supplier'], phone: '+91 98765 99887', gstin: '09RKENT11111K1Z5', city: 'Kanpur', sales: 548200, purchases: 462750, receivable: 32400, payable: 14600, status: 'Active' },
  { id: '6', code: 'PTY-00119', name: 'National Suppliers', initials: 'NS', type: ['Supplier'], phone: '+91 97650 22119', gstin: '09NATSU8888K1Z4', city: 'Ghaziabad', sales: 0, purchases: 718400, receivable: 0, payable: 45900, status: 'Active' },
  { id: '7', code: 'PTY-00118', name: 'Gupta Traders', initials: 'GT', type: ['Customer'], phone: '+91 99112 33445', gstin: '09GUPTR5566F1Z3', city: 'Agra', sales: 296500, purchases: 0, receivable: 18200, payable: 0, status: 'Active' },
  { id: '8', code: 'PTY-00117', name: 'Precise Industries', initials: 'PI', type: ['Supplier'], phone: '+91 98220 44567', gstin: '09PRECI2222K1Z6', city: 'Faridabad', sales: 0, purchases: 932600, receivable: 0, payable: 56300, status: 'Active' },
];

const formatCurrency = (amt) => {
  if (!amt || amt === 0) return '—';
  // Formats as Indian Rupee style string (e.g. 4,20,000)
  const formatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
  return formatter.format(amt);
};

const getInitials = (name) => {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
};

const PartyKPICard = ({ title, value, subtext, trend, trendUp, icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center gap-4 flex-1 min-w-[200px]">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[13px] font-semibold text-gray-500 mb-0.5">{title}</span>
      <span className="text-xl font-bold text-gray-900 leading-tight">{value}</span>
      <div className="flex items-center gap-1.5 mt-1">
        {trendUp ? (
          <span className="text-[11px] font-bold text-emerald-600">^ {trend}</span>
        ) : (
          <span className="text-[11px] font-bold text-red-600">v {trend}</span>
        )}
        <span className="text-[11px] font-medium text-gray-400">{subtext}</span>
      </div>
    </div>
  </div>
);

const Parties = () => {
  const [activeTab, setActiveTab] = useState('All Parties');
  const [searchQuery, setSearchQuery] = useState('');
  const [parties, setParties] = useState(initialParties);
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Add Party Modal
  const [showAddPartyModal, setShowAddPartyModal] = useState(false);

  const getFilteredParties = () => {
    let filtered = parties;
    
    if (activeTab === 'Customers') {
      filtered = filtered.filter(p => p.type.includes('Customer'));
    } else if (activeTab === 'Suppliers') {
      filtered = filtered.filter(p => p.type.includes('Supplier'));
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.code.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.gstin.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  };

  const filteredParties = getFilteredParties();

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredParties.length) setSelectedIds([]);
    else setSelectedIds(filteredParties.map(p => p.id));
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleAddParty = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const role = formData.get('role');
    const newParty = {
      id: Date.now().toString(),
      code: `PTY-00${parties.length + 125}`,
      name: formData.get('name'),
      initials: getInitials(formData.get('name')),
      type: role === 'Both' ? ['Customer', 'Supplier'] : [role],
      phone: formData.get('phone'),
      gstin: formData.get('gstin'),
      city: formData.get('city') || 'Unknown',
      sales: 0,
      purchases: 0,
      receivable: role === 'Customer' || role === 'Both' ? parseFloat(formData.get('openingBalance')) || 0 : 0,
      payable: role === 'Supplier' || role === 'Both' ? parseFloat(formData.get('openingBalance')) || 0 : 0,
      status: 'Active'
    };
    setParties([newParty, ...parties]);
    setShowAddPartyModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <div className="text-[13px] text-gray-500 font-medium mb-1 flex items-center gap-2">
            <div className="w-4 h-4 opacity-70"><User className="w-4 h-4" /></div>
            <span className="hover:text-gray-700 cursor-pointer">Parties</span>
            <span className="text-gray-400">/</span>
            <span className="text-indigo-600 font-semibold">Parties</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Parties</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddPartyModal(true)}
            className="bg-[#4F46E5] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Add Party
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Upload className="w-4 h-4 text-gray-500" /> Import
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            More <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 shrink-0 mb-6 gap-6 px-1">
        {[
          { id: 'All Parties', label: `All Parties (${parties.length})` },
          { id: 'Customers', label: `Customers (${parties.filter(p => p.type.includes('Customer')).length})` },
          { id: 'Suppliers', label: `Suppliers (${parties.filter(p => p.type.includes('Supplier')).length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedIds([]); }}
            className={`pb-3 text-[14.5px] font-bold transition-colors relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
            }`}
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
        <PartyKPICard 
          title="Total Parties" 
          value="672" 
          subtext="vs last year" 
          trend="12.4%" 
          trendUp={true} 
          icon={<Users className="w-6 h-6" />} 
          iconBg="bg-indigo-50" 
          iconColor="text-indigo-600" 
        />
        <PartyKPICard 
          title="Customers" 
          value="486" 
          subtext="vs last year" 
          trend="14.2%" 
          trendUp={true} 
          icon={<ShoppingCart className="w-6 h-6" />} 
          iconBg="bg-emerald-50" 
          iconColor="text-emerald-600" 
        />
        <PartyKPICard 
          title="Suppliers" 
          value="186" 
          subtext="vs last year" 
          trend="9.8%" 
          trendUp={true} 
          icon={<User className="w-6 h-6" />} 
          iconBg="bg-amber-50" 
          iconColor="text-amber-500" 
        />
        <PartyKPICard 
          title="Total Receivable" 
          value="₹12,48,750" 
          subtext="vs last month" 
          trend="8.6%" 
          trendUp={true} 
          icon={<FileText className="w-6 h-6" />} 
          iconBg="bg-blue-50" 
          iconColor="text-blue-500" 
        />
        <PartyKPICard 
          title="Total Payable" 
          value="₹8,42,300" 
          subtext="vs last month" 
          trend="6.2%" 
          trendUp={true} 
          icon={<CreditCard className="w-6 h-6" />} 
          iconBg="bg-rose-50" 
          iconColor="text-rose-500" 
        />
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1 overflow-hidden">
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col min-h-0">
          
          {/* Search & Filters */}
          <div className="p-4 border-b border-gray-100 flex flex-col gap-4 shrink-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search name, phone, GSTIN, city..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
              Type <span className="font-bold text-gray-900">All Types</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
              State <span className="font-bold text-gray-900">All States</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
              Status <span className="font-bold text-gray-900">All Status</span> <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            
            <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2 ml-1">
              <Filter className="w-3.5 h-3.5 text-gray-500" /> Filters
            </button>
            
            <button onClick={() => setSearchQuery('')} className="text-indigo-600 font-semibold text-[13px] hover:text-indigo-700 ml-2">
              Clear
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-md px-2.5 py-1 text-[12px] font-medium text-gray-600">
              Status: Active
              <button className="text-gray-400 hover:text-gray-700"><X className="w-3 h-3" /></button>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 rounded-md px-2.5 py-1 text-[12px] font-medium text-gray-600">
              Type: Customer & Supplier
              <button className="text-gray-400 hover:text-gray-700"><X className="w-3 h-3" /></button>
            </div>
          </div>
          </div>

          {/* Table Content */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
              <tr>
                <th className="py-3 px-4 w-12 border-b border-gray-100">
                  <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredParties.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100">Party Name</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100">Type</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100">Phone</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100">GSTIN</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100">City</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100 text-right">Sales (₹)</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100 text-right">Purchases (₹)</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100 text-right">Receivable (₹)</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100 text-right">Payable (₹)</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100">Status</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 bg-white border-b border-gray-100 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredParties.length === 0 ? (
                <tr><td colSpan="12" className="py-16 text-center text-gray-500 text-[14px]">No parties found.</td></tr>
              ) : (
                filteredParties.map(party => (
                  <tr 
                    key={party.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors ${selectedIds.includes(party.id) ? 'bg-indigo-50/10' : ''}`}
                  >
                    <td className="py-3 px-4 w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(party.id)} 
                        onChange={() => toggleSelect(party.id)}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" 
                      />
                    </td>
                    <td className="py-3 px-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-[12px] font-bold text-indigo-700">{party.initials}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-[13.5px] leading-snug">{party.name}</span>
                          <span className="text-gray-400 text-[11.5px] font-medium leading-snug">{party.code}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        {party.type.includes('Customer') && (
                          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap tracking-wide border border-emerald-100">
                            Customer
                          </span>
                        )}
                        {party.type.includes('Supplier') && (
                          <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded text-[11px] font-bold whitespace-nowrap tracking-wide border border-indigo-100">
                            Supplier
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-gray-600 text-[12.5px] font-medium leading-snug">{party.phone.split(' ')[0]}</span>
                        <span className="text-gray-600 text-[12.5px] font-medium leading-snug">{party.phone.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-[13px] font-medium">{party.gstin}</td>
                    <td className="py-3 px-4 text-gray-600 text-[13.5px]">{party.city}</td>
                    <td className="py-3 px-4 font-bold text-gray-800 text-[13.5px] text-right">{formatCurrency(party.sales)}</td>
                    <td className="py-3 px-4 font-bold text-gray-800 text-[13.5px] text-right">{formatCurrency(party.purchases)}</td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-[13.5px] text-right">{formatCurrency(party.receivable)}</td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-[13.5px] text-right">{formatCurrency(party.payable)}</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide">
                        {party.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors hover:bg-gray-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="text-[13px] text-gray-500 font-medium ml-2">
            Showing 1 to {Math.min(8, filteredParties.length)} of 672 parties
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
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">4</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">5</button>
              <span className="text-gray-400 px-1 text-[12px]">...</span>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 text-[12px] font-semibold hover:bg-gray-50">34</button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors bg-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- Add Party Modal --- */}
      {showAddPartyModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[90vh] flex flex-col border border-gray-200 animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-gray-900">Add New Party</h3>
              <button onClick={() => setShowAddPartyModal(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddParty} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Party Name</label>
                  <input name="name" type="text" placeholder="e.g. ABC Traders" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Phone Number</label>
                    <input name="phone" type="text" placeholder="+91 98765 43210" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">GSTIN</label>
                    <input name="gstin" type="text" placeholder="09XXXXX..." className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">City</label>
                  <input name="city" type="text" placeholder="e.g. Delhi" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>

                <div className="grid grid-cols-2 gap-5 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Role</label>
                    <div className="relative">
                      <select name="role" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 pr-8 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none">
                        <option value="Customer">Customer Only</option>
                        <option value="Supplier">Supplier Only</option>
                        <option value="Both">Customer & Supplier (Both)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Opening Balance (₹)</label>
                    <input name="openingBalance" type="number" step="0.01" defaultValue="0" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                </div>

              </div>
              
              <div className="p-5 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50/50 rounded-b-xl">
                <button type="button" onClick={() => setShowAddPartyModal(false)} className="px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">Save Party</button>
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

export default Parties;
