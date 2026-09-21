import React, { useState } from 'react';
import { 
  Download, Printer, MoreHorizontal, Search, ChevronDown, ChevronRight,
  Filter, Calendar, BarChart2, Banknote, TrendingUp, ShoppingCart, 
  Package, Users, UserMinus, ArrowUp, ArrowDown
} from 'lucide-react';

const KPICard = ({ title, amount, change, isPositive, icon: Icon, iconColor, iconBg }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex-1 min-w-[200px]">
    <div className="flex flex-col items-center text-center">
      <div className="text-[12px] font-bold text-gray-500 mb-1">{title}</div>
      <div className="flex items-center justify-center mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${iconBg} ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-[22px] font-bold text-gray-900 tracking-tight">{amount}</div>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-gray-400">
        <span className={`flex items-center gap-0.5 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {change}
        </span>
        vs last year
      </div>
    </div>
  </div>
);

const ReportTypeBtn = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-28 h-24 shrink-0 rounded-xl border transition-all ${
      active 
      ? 'border-indigo-600 bg-indigo-50/30' 
      : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
    }`}
  >
    <Icon className={`w-6 h-6 mb-2 ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
    <span className={`text-[12px] font-bold text-center leading-tight px-2 ${active ? 'text-indigo-700' : 'text-gray-500'}`}>
      {label}
    </span>
  </button>
);

const Reports = () => {
  const [activeReport, setActiveReport] = useState('Business Overview');

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-y-auto">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Accounts & Banking</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-indigo-600 font-semibold">Reports & Analytics</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Reports & Analytics</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Printer className="w-4 h-4 text-gray-500" /> Print
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            More <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Choose a Report Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-5 shrink-0">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Choose a Report</h2>
          <div className="relative w-[280px]">
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-9 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2 custom-scrollbar">
          <ReportTypeBtn icon={BarChart2} label="Business Overview" active={activeReport === 'Business Overview'} onClick={() => setActiveReport('Business Overview')} />
          <ReportTypeBtn icon={Banknote} label="Profit & Loss" active={activeReport === 'Profit & Loss'} onClick={() => setActiveReport('Profit & Loss')} />
          <ReportTypeBtn icon={TrendingUp} label="Cash Flow" active={activeReport === 'Cash Flow'} onClick={() => setActiveReport('Cash Flow')} />
          <ReportTypeBtn icon={ShoppingCart} label="Sales Summary" active={activeReport === 'Sales Summary'} onClick={() => setActiveReport('Sales Summary')} />
          <ReportTypeBtn icon={ShoppingCart} label="Purchase Summary" active={activeReport === 'Purchase Summary'} onClick={() => setActiveReport('Purchase Summary')} />
          <ReportTypeBtn icon={Package} label="Stock Summary" active={activeReport === 'Stock Summary'} onClick={() => setActiveReport('Stock Summary')} />
          <ReportTypeBtn icon={Users} label="Customer Outstanding" active={activeReport === 'Customer Outstanding'} onClick={() => setActiveReport('Customer Outstanding')} />
          <ReportTypeBtn icon={UserMinus} label="Supplier Payables" active={activeReport === 'Supplier Payables'} onClick={() => setActiveReport('Supplier Payables')} />
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="flex gap-4 mb-5 shrink-0 overflow-x-auto pb-1">
        <KPICard title="Total Sales" amount="₹24,58,450" change="18.6%" isPositive={true} icon={TrendingUp} iconBg="bg-blue-50" iconColor="text-blue-500" />
        <KPICard title="Total Purchases" amount="₹18,42,750" change="12.4%" isPositive={true} icon={ShoppingCart} iconBg="bg-orange-50" iconColor="text-orange-500" />
        <KPICard title="Gross Profit" amount="₹5,76,200" change="22.3%" isPositive={true} icon={BarChart2} iconBg="bg-purple-50" iconColor="text-purple-500" />
        <KPICard title="Expenses" amount="₹2,42,500" change="8.7%" isPositive={false} icon={Banknote} iconBg="bg-red-50" iconColor="text-red-500" />
        <KPICard title="Net Profit" amount="₹3,33,700" change="28.1%" isPositive={true} icon={Banknote} iconBg="bg-emerald-50" iconColor="text-emerald-500" />
      </div>

      {/* Date Filters Row */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-5 shrink-0 flex items-center gap-4">
        <div className="flex flex-col gap-1.5 flex-1 max-w-[200px]">
          <label className="text-[11px] font-bold text-gray-500">Financial Year</label>
          <button className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
            2026 - 2027 <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-col gap-1.5 w-[160px]">
          <label className="text-[11px] font-bold text-gray-500">From Date</label>
          <div className="relative">
            <input type="text" value="01/04/2026" readOnly className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 pr-8 rounded-lg text-[13px] font-medium cursor-pointer" />
            <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-[160px]">
          <label className="text-[11px] font-bold text-gray-500">To Date</label>
          <div className="relative">
            <input type="text" value="31/03/2027" readOnly className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 pr-8 rounded-lg text-[13px] font-medium cursor-pointer" />
            <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 max-w-[200px]">
          <label className="text-[11px] font-bold text-gray-500">Quick Period</label>
          <button className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center justify-between">
            This Financial Year <ChevronDown className="w-4 h-4 text-gray-400 hidden" />
          </button>
        </div>
        
        <div className="flex items-end gap-3 pb-0.5 ml-2 mt-5">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" /> Filters
          </button>
          <button className="text-indigo-600 font-bold text-[13px] hover:text-indigo-800 px-2 py-2">
            Clear
          </button>
        </div>
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-3 gap-5 shrink-0">
        
        {/* Line Chart Card */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">Sales vs Purchases</h3>
              <p className="text-[12px] text-gray-500">(This Financial Year)</p>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-bold">
              <div className="flex items-center gap-1.5 text-gray-700">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Sales
              </div>
              <div className="flex items-center gap-1.5 text-gray-700">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Purchases
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-h-[220px] w-full relative mt-4">
            <svg className="w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="none">
              {/* Grid */}
              <line x1="30" y1="20" x2="400" y2="20" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="30" y1="65" x2="400" y2="65" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="30" y1="110" x2="400" y2="110" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="30" y1="155" x2="400" y2="155" stroke="#F3F4F6" strokeWidth="1" />
              <line x1="30" y1="200" x2="400" y2="200" stroke="#F3F4F6" strokeWidth="1" />
              
              {/* Y Axis Labels */}
              <text x="20" y="24" fontSize="10" fill="#9CA3AF" textAnchor="end">20L</text>
              <text x="20" y="69" fontSize="10" fill="#9CA3AF" textAnchor="end">15L</text>
              <text x="20" y="114" fontSize="10" fill="#9CA3AF" textAnchor="end">10L</text>
              <text x="20" y="159" fontSize="10" fill="#9CA3AF" textAnchor="end">5L</text>
              <text x="20" y="204" fontSize="10" fill="#9CA3AF" textAnchor="end">0</text>
              
              {/* X Axis Labels */}
              <text x="55" y="215" fontSize="10" fill="#9CA3AF" textAnchor="middle">Apr</text>
              <text x="110" y="215" fontSize="10" fill="#9CA3AF" textAnchor="middle">Jun</text>
              <text x="165" y="215" fontSize="10" fill="#9CA3AF" textAnchor="middle">Aug</text>
              <text x="220" y="215" fontSize="10" fill="#9CA3AF" textAnchor="middle">Oct</text>
              <text x="275" y="215" fontSize="10" fill="#9CA3AF" textAnchor="middle">Dec</text>
              <text x="330" y="215" fontSize="10" fill="#9CA3AF" textAnchor="middle">Feb</text>
              
              <text x="55" y="225" fontSize="9" fill="#D1D5DB" textAnchor="middle">'26</text>
              <text x="110" y="225" fontSize="9" fill="#D1D5DB" textAnchor="middle">'26</text>
              <text x="165" y="225" fontSize="9" fill="#D1D5DB" textAnchor="middle">'26</text>
              <text x="220" y="225" fontSize="9" fill="#D1D5DB" textAnchor="middle">'26</text>
              <text x="275" y="225" fontSize="9" fill="#D1D5DB" textAnchor="middle">'26</text>
              <text x="330" y="225" fontSize="9" fill="#D1D5DB" textAnchor="middle">'27</text>

              {/* Orange Line (Purchases) */}
              <path d="M55 125 L82 115 L110 135 L137 130 L165 110 L192 135 L220 120 L247 130 L275 145 L302 125 L330 145" fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="55" cy="125" r="3" fill="white" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="165" cy="110" r="3" fill="white" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="220" cy="120" r="3" fill="white" stroke="#f97316" strokeWidth="1.5" />

              {/* Blue Line (Sales) */}
              <path d="M55 80 L82 70 L110 90 L137 80 L165 65 L192 80 L220 75 L247 90 L275 80 L302 70 L330 85" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="55" cy="80" r="3" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="165" cy="65" r="3" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="220" cy="75" r="3" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Values are excluding GST</p>
        </div>

        {/* Top Customers Table */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-start justify-between p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900 w-1/2 leading-tight">Top Customers by Sales</h3>
            <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 text-right leading-tight">View<br/>All</button>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-2.5 px-5 text-[10px] font-bold text-gray-500 tracking-wider">CUSTOMER</th>
                  <th className="py-2.5 px-5 text-[10px] font-bold text-gray-500 tracking-wider text-right">SALES(₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Sharma Distributors</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">3,85,400</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Gupta Traders</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">2,95,800</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">R.K. Enterprises</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">2,45,600</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Kumar & Co.</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">2,15,900</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">M/s. Agarwal Stores</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">1,78,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Expenses Table */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 h-[65px]">
            <h3 className="text-base font-bold text-gray-900">Top Expenses</h3>
            <button className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-2.5 px-5 text-[10px] font-bold text-gray-500 tracking-wider">EXPENSE CATEGORY</th>
                  <th className="py-2.5 px-5 text-[10px] font-bold text-gray-500 tracking-wider text-right">AMOUNT(₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Rent</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">72,000</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Salary</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">68,500</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Transport</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">38,200</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Utilities</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">24,800</td>
                </tr>
                <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-5 text-[13px] font-bold text-gray-700">Office Expenses</td>
                  <td className="py-3 px-5 text-[13px] text-gray-600 text-right">18,600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #D1D5DB; }
      `}} />
    </div>
  );
};

export default Reports;
