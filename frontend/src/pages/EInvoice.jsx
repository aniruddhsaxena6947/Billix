import React, { useState } from 'react';
import { 
  Download, MoreHorizontal, ChevronDown, RefreshCw, Plus, 
  Search, Filter, Calendar, FileText, Check, Clock, AlertTriangle,
  ArrowRight, Copy, ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const EInvoice = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { name: 'All', count: 124 },
    { name: 'Pending', count: 3 },
    { name: 'Generated', count: 118 },
    { name: 'Failed', count: 3 },
    { name: 'Cancelled', count: 0 },
  ];

  const invoices = [
    { id: 'INV-2026-00124', date: '28 May 2026', customer: 'Sharma Traders', taxable: '₹45,000.00', gst: '₹8,100.00', status: 'Generated', irn: '7f8a2c...7A92', actionType: 'View' },
    { id: 'INV-2026-00125', date: '28 May 2026', customer: 'Gupta Enterprises', taxable: '₹28,000.00', gst: '₹5,040.00', status: 'Pending', irn: '—', actionType: 'Generate' },
    { id: 'INV-2026-00126', date: '27 May 2026', customer: 'ABC Traders', taxable: '₹62,000.00', gst: '₹11,160.00', status: 'Failed', irn: '—', actionType: 'Fix & Generate' },
    { id: 'INV-2026-00127', date: '27 May 2026', customer: 'Patel & Co.', taxable: '₹18,500.00', gst: '₹3,330.00', status: 'Generated', irn: '9c3d4e...1B7F', actionType: 'View' },
    { id: 'INV-2026-00128', date: '26 May 2026', customer: 'Kumar Distributors', taxable: '₹95,000.00', gst: '₹17,100.00', status: 'Generated', irn: '2a9f6b...3D21', actionType: 'View' },
    { id: 'INV-2026-00129', date: '26 May 2026', customer: 'Singh Retailers', taxable: '₹12,400.00', gst: '₹2,232.00', status: 'Cancelled', irn: '6d7c1a...9F11', actionType: 'View' },
    { id: 'INV-2026-00130', date: '25 May 2026', customer: 'Verma Enterprises', taxable: '₹38,000.00', gst: '₹6,840.00', status: 'Generated', irn: 'b1a9e3...4C9D', actionType: 'View' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Generated':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Generated</span>;
      case 'Pending':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold border border-amber-100"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Pending</span>;
      case 'Failed':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-bold border border-red-100"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Failed</span>;
      case 'Cancelled':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold border border-gray-200"><div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> Cancelled</span>;
      default:
        return null;
    }
  };

  const getActionButton = (type) => {
    switch (type) {
      case 'View':
        return <button className="border border-gray-200 text-indigo-600 px-4 py-1.5 rounded text-[12px] font-bold hover:bg-gray-50">View</button>;
      case 'Generate':
        return <button className="bg-indigo-600 text-white px-3 py-1.5 rounded text-[12px] font-bold hover:bg-indigo-700">Generate</button>;
      case 'Fix & Generate':
        return <button className="border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded text-[12px] font-bold hover:bg-indigo-50">Fix & Generate</button>;
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
            <span className="text-indigo-600 font-semibold">E-Invoice</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">E-Invoice</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Generate E-Invoice
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
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-400">Total Invoices</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">124</div>
              <div className="text-[11px] text-gray-400">All sales invoices</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" strokeWidth={3} />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-400">Generated</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">118</div>
              <div className="text-[11px] text-gray-400">E-invoices generated</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-400">Pending</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">3</div>
              <div className="text-[11px] text-gray-400">Waiting to be generated</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-red-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-bold text-gray-400">Failed</div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">3</div>
              <div className="text-[11px] text-gray-400">Need attention</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
        </div>
      </div>

      {/* Filters Row */}
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

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0">
          <div className="relative flex-1 max-w-[400px]">
            <input 
              type="text" 
              placeholder="Search invoice number, customer, GSTIN..." 
              className="w-full bg-gray-50/50 border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-[13px] font-medium focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
              Status: All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
              Customer: All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2">
              Invoice Type: All <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2 ml-1">
              <Filter className="w-4 h-4 text-gray-500" /> Filters
            </button>
            <button className="text-indigo-600 font-bold text-[13px] hover:text-indigo-800 px-2 py-2">
              Clear
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100 flex items-center gap-6 px-6 pt-2 shrink-0">
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
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow-sm shadow-gray-100 z-10">
              <tr className="border-b border-gray-200">
                <th className="py-3 px-5 w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Invoice ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Date ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700">Customer ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700 text-right">Taxable Amount ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700 text-right">GST ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 cursor-pointer hover:text-gray-700 text-center">E-Invoice Status ↑↓</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500">IRN</th>
                <th className="py-3 px-4 text-[12px] font-bold text-gray-500 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-3 px-5">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  </td>
                  <td className="py-3 px-4 text-[13px] font-bold text-indigo-600 cursor-pointer hover:underline">{inv.id}</td>
                  <td className="py-3 px-4 text-[13px] text-gray-600">{inv.date}</td>
                  <td className="py-3 px-4 text-[13px] font-bold text-gray-800">{inv.customer}</td>
                  <td className="py-3 px-4 text-[13px] font-bold text-gray-900 text-right">{inv.taxable}</td>
                  <td className="py-3 px-4 text-[13px] font-medium text-gray-600 text-right">{inv.gst}</td>
                  <td className="py-3 px-4 flex justify-center">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="py-3 px-4 text-[13px] font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      {inv.irn}
                      {inv.irn !== '—' && <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-pointer" />}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-3">
                      {getActionButton(inv.actionType)}
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
          <div className="text-[13px] font-medium text-gray-600">0 invoices selected</div>
          <div className="flex items-center gap-3">
            <button className="text-[13px] font-bold text-gray-500 hover:text-gray-700">Clear Selection</button>
            <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded-lg text-[13px] font-bold cursor-not-allowed">
              Generate E-Invoices
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default EInvoice;
