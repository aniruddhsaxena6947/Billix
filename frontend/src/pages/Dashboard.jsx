import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
      {/* Top Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Good morning, Aniruddh</h1>
          <p className="text-gray-500 mt-1 text-[15px]">Here is what needs your attention today.</p>
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            <button className="bg-[#0F172A] text-white px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-1.5">
              <span>+</span> New Sale
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1.5">
              <span>+</span> New Purchase
            </button>
            <button className="bg-white border border-gray-200 text-green-600 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-1.5">
              <span className="text-green-500">$</span> Receive Payment
            </button>
          </div>
          <div className="flex items-center gap-3">
            <ActionPill icon="✦" label="Generate Smart Bill" color="text-orange-500" />
            <ActionPill icon="👤" label="Create Customer" color="text-indigo-500" />
            <ActionPill icon="🏢" label="Create Supplier" color="text-indigo-500" />
            <ActionPill icon="⚏" label="Smart Scanner" color="text-gray-500" />
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-[13px] font-semibold shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
              This Month <span className="text-[10px]">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        <KPICard title="Sales" amount="₹12,84,500" stat="+18.4%" statType="positive" />
        <KPICard title="Purchases" amount="₹7,42,300" stat="+6.2%" statType="positive" />
        <KPICard title="Receivables" amount="₹3,18,750" stat="12 invoices" statType="warning" />
        <KPICard title="Payables" amount="₹1,84,200" stat="8 due" statType="warning" />
      </div>

      {/* Charts & Needs Attention */}
      <div className="grid grid-cols-3 gap-5">
        {/* Sales vs Purchases Chart (Mocked with SVG) */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900">Sales vs Purchases</h3>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="h-[220px] w-full relative flex items-center justify-center">
            {/* SVG line chart mock matching reference */}
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              {/* Horizontal grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#F3F4F6" strokeWidth="1.5" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#F3F4F6" strokeWidth="1.5" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeWidth="1.5" />
              <line x1="0" y1="170" x2="500" y2="170" stroke="#F3F4F6" strokeWidth="1.5" />
              
              {/* Grey Line (Purchases) */}
              <path d="M10 160 L80 170 L150 150 L220 165 L300 120 L370 145 L420 115 L480 150" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Purple Line (Sales) */}
              <path d="M10 145 L70 160 L140 100 L210 140 L280 85 L350 110 L410 70 L480 120" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Needs Attention Panel */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-gray-900 mb-6">Needs attention</h3>
          
          <div className="space-y-6 flex-1">
            <AttentionItem 
              color="bg-orange-500"
              title="3 invoices overdue"
              subtitle="₹84,200 receivable"
            />
            <AttentionItem 
              color="bg-orange-500"
              title="5 products low in stock"
              subtitle="Review reorder levels"
            />
            <AttentionItem 
              color="bg-indigo-600"
              title="2 GST tasks pending"
              subtitle="Due this week"
            />
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Recent invoices</h3>
          <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View all →</a>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 px-6 text-[13px] font-semibold text-gray-500 w-[20%]">Invoice</th>
                <th className="py-3 px-6 text-[13px] font-semibold text-gray-500 w-[30%]">Customer</th>
                <th className="py-3 px-6 text-[13px] font-semibold text-gray-500 w-[20%]">Date</th>
                <th className="py-3 px-6 text-[13px] font-semibold text-gray-500 w-[15%]">Amount</th>
                <th className="py-3 px-6 text-[13px] font-semibold text-gray-500 w-[15%]">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              <InvoiceRow id="INV-2026-00124" customer="Sharma Wholesale" date="25 Aug 2026" amount="₹42,800" status="Paid" />
              <InvoiceRow id="INV-2026-00123" customer="Mehta Foods" date="25 Aug 2026" amount="₹18,450" status="Pending" />
              <InvoiceRow id="INV-2026-00122" customer="Aarav Traders" date="24 Aug 2026" amount="₹67,200" status="Overdue" />
              <InvoiceRow id="INV-2026-00121" customer="Singh Distributors" date="24 Aug 2026" amount="₹31,500" status="Paid" />
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

/* Internal UI Helpers */

const ActionPill = ({ icon, label, color }) => (
  <button className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
    <span className={`${color} text-xs font-bold`}>{icon}</span>
    <span className="text-[13px] font-semibold text-gray-700">{label}</span>
  </button>
);

const KPICard = ({ title, amount, stat, statType }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
    <h3 className="text-[13px] font-semibold text-gray-500 mb-2">{title}</h3>
    <div className="text-2xl font-bold text-gray-900 mb-3">{amount}</div>
    <div className={`text-[13px] font-medium ${statType === 'positive' ? 'text-emerald-500' : 'text-orange-500'}`}>
      {stat}
    </div>
  </div>
);

const AttentionItem = ({ color, title, subtitle }) => (
  <div className="flex items-start justify-between group cursor-pointer">
    <div className="flex items-start gap-3">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${color}`}></div>
      <div>
        <h4 className="text-[14px] font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-[13px] text-gray-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="text-indigo-600 text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
      View →
    </div>
  </div>
);

const InvoiceRow = ({ id, customer, date, amount, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-emerald-500';
      case 'Pending': return 'text-orange-500';
      case 'Overdue': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 px-6 text-gray-600">{id}</td>
      <td className="py-4 px-6 text-gray-900">{customer}</td>
      <td className="py-4 px-6 text-gray-600">{date}</td>
      <td className="py-4 px-6 font-semibold text-gray-900">{amount}</td>
      <td className={`py-4 px-6 text-[13px] font-medium ${getStatusColor(status)}`}>{status}</td>
    </tr>
  );
};

export default Dashboard;
