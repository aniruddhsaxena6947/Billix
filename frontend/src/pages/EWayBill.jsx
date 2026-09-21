import React, { useState } from 'react';
import { 
  Download, MoreHorizontal, ChevronDown, RefreshCw, Plus, 
  Search, Filter, Calendar, FileText, Check, Clock, AlertTriangle,
  ArrowRight, X, ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const EWayBill = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { name: 'All', count: 86 },
    { name: 'Active', count: 72 },
    { name: 'Pending', count: 8 },
    { name: 'Expiring Soon', count: 6 },
    { name: 'Expired', count: 2 },
    { name: 'Failed', count: 3 },
    { name: 'Cancelled', count: 1 },
  ];

  const bills = [
    { ewbNo: 'EWB-2026-00086', docNo: 'INV-2026-00124', docType: 'Sales Invoice', date: '28 May 2026', party: 'Sharma Traders', route: 'Delhi → Lucknow', value: '₹53,100', validUntil: '30 May 2026', status: 'Active', actionType: 'View' },
    { ewbNo: '—', docNo: 'INV-2026-00125', docType: 'Sales Invoice', date: '28 May 2026', party: 'Gupta Enterprises', route: 'Delhi → Jaipur', value: '₹33,040', validUntil: '—', status: 'Pending', actionType: 'Generate' },
    { ewbNo: 'EWB-2026-00082', docNo: 'INV-2026-00118', docType: 'Sales Invoice', date: '27 May 2026', party: 'ABC Traders', route: 'Noida → Kanpur', value: '₹73,160', validUntil: '28 May 2026', status: 'Expiring Soon', actionType: 'View' },
    { ewbNo: 'EWB-2026-00079', docNo: 'PINV-2026-00045', docType: 'Purchase Invoice', date: '26 May 2026', party: 'Modern Suppliers', route: 'Mumbai → Pune', value: '₹1,12,100', validUntil: '02 Jun 2026', status: 'Active', actionType: 'View' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100"><Check className="w-3 h-3" /> Active</span>;
      case 'Pending':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold border border-amber-100"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Expiring Soon':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 text-[11px] font-bold border border-orange-200"><Clock className="w-3 h-3" /> Expiring Soon</span>;
      default:
        return null;
    }
  };

  const getActionButton = (type) => {
    switch (type) {
      case 'View':
        return <button className="border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 transition-colors">View</button>;
      case 'Generate':
        return <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-indigo-700 transition-colors">Generate</button>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1">
            <span>GST & Compliance</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 font-semibold">E-Way Bill</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">E-Way Bill</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Generate E-Way Bill
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-gray-500" /> Refresh
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            More <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-5 mb-5 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-500">Total</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">86</div>
              <div className="text-[11px] font-medium text-gray-400 mt-0.5">E-Way Bills for this period</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" strokeWidth={3} />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-500">Active</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">72</div>
              <div className="text-[11px] font-medium text-gray-400 mt-0.5">Valid E-Way Bills</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-500">Pending</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">8</div>
              <div className="text-[11px] font-medium text-gray-400 mt-0.5">Waiting to be generated</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-red-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-500">Expiring Soon</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">6</div>
              <div className="text-[11px] font-medium text-gray-400 mt-0.5">Expiring within 3 days</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Date Filters Row */}
      <div className="flex items-center gap-3 mb-5 shrink-0">
        <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm">
          <Calendar className="w-4 h-4 text-gray-400" /> 01 May 2026 - 31 May 2026 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
        
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <button className="px-4 py-1.5 rounded-md text-[13px] font-semibold bg-indigo-50 text-indigo-700">This Month</button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-50">Last Month</button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-50">This Quarter</button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-50">This Financial Year</button>
          <button className="px-4 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:bg-gray-50">Custom</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">

          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-100 flex items-start flex-col gap-3 shrink-0 bg-white">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search invoice no., E-Way Bill no., customer, vehicle, transporter..." 
                className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2 shadow-sm">
                <Filter className="w-4 h-4 text-gray-500" /> Filters 
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-bold leading-none ml-1">2</span>
              </button>
              <button className="text-indigo-600 font-bold text-[13px] hover:text-indigo-800 px-2 py-2">
                Clear
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-100 group">
              <span className="text-[12px] text-indigo-700 font-medium">Status: Pending</span>
              <button className="text-indigo-400 hover:text-indigo-700"><X className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-lg border border-indigo-100 group">
              <span className="text-[12px] text-indigo-700 font-medium">Transport Mode: Road</span>
              <button className="text-indigo-400 hover:text-indigo-700"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 flex items-center gap-6 px-6 pt-3 shrink-0">
          {tabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-3 text-[13px] font-bold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.name 
                ? 'border-indigo-600 text-indigo-700' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === tab.name ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table Area */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-white shadow-sm shadow-gray-100 z-10">
              <tr className="border-b border-gray-200">
                <th className="py-3 px-5 w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">E-Way<br/>Bill No.</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Invoice /<br/>Document</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Date ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Party</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">From → To</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Value ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Valid Until</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 text-center">Status</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-5 align-top">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1" />
                  </td>
                  <td className="py-4 px-4 align-top">
                    {bill.ewbNo === '—' ? (
                      <span className="text-[13px] text-gray-400">—</span>
                    ) : (
                      <span className="text-[13px] font-bold text-indigo-600 hover:underline cursor-pointer flex flex-col">{bill.ewbNo.split('-').map((part, i) => <span key={i} className={i > 0 ? "mt-0.5" : ""}>{i > 0 ? '-' : ''}{part}</span>)}</span>
                    )}
                  </td>
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-indigo-600 hover:underline cursor-pointer">{bill.docNo}</span>
                      <span className="text-[11px] font-medium text-gray-400 mt-0.5">{bill.docType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top text-[13px] text-gray-600 font-medium whitespace-nowrap">{bill.date}</td>
                  <td className="py-4 px-4 align-top text-[13px] font-bold text-gray-800">{bill.party}</td>
                  <td className="py-4 px-4 align-top text-[13px] font-medium text-gray-600">{bill.route}</td>
                  <td className="py-4 px-4 align-top text-[13px] font-bold text-gray-900">{bill.value}</td>
                  <td className="py-4 px-4 align-top text-[13px] font-medium text-gray-600 whitespace-nowrap">{bill.validUntil}</td>
                  <td className="py-4 px-4 align-top flex justify-center mt-1">
                    {getStatusBadge(bill.status)}
                  </td>
                  <td className="py-4 px-4 align-top">
                    <div className="flex items-center justify-center gap-3">
                      {getActionButton(bill.actionType)}
                      <button className="text-gray-400 hover:text-gray-600 mt-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default EWayBill;
