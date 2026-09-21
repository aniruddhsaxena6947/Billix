import React, { useState } from 'react';
import { 
  Download, MoreHorizontal, ChevronDown, RefreshCw, Building2, Check,
  ArrowUp, ArrowDown, Equal, FileText, Truck, FileCheck, AlertTriangle,
  Lightbulb, ExternalLink
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const GstCompliance = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-y-auto">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <span>GST & Compliance</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="m9 18 6-6-6-6"/></svg>
            <span className="text-indigo-600 font-semibold">GST Compliance</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">GST Compliance</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            01 May 2026 - 31 May 2026 <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-gray-500" /> Refresh
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-3 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Top 2 Cards Row */}
      <div className="flex gap-5 mb-5 shrink-0">
        
        {/* GST Registration Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-bold text-gray-400 mb-1 tracking-wide">GST Registration</div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xl font-bold text-gray-900 tracking-tight">09ABCDE1234F1Z5</span>
              <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[11px] font-bold">Active</span>
            </div>
            <div className="text-[13px] font-bold text-gray-700">Demo Company Pvt. Ltd.</div>
            <div className="text-[13px] text-gray-500 mt-0.5">Regular <span className="mx-1">•</span> Uttar Pradesh</div>
          </div>
          <button className="bg-white border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-indigo-50 transition-colors">
            View Details
          </button>
        </div>

        {/* Account Status Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-center gap-5 flex-1">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Check className="w-6 h-6" strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Your GST account is active</h3>
            <p className="text-[13px] text-gray-500">You are all set. Keep your records updated for smooth compliance.</p>
          </div>
        </div>

      </div>

      {/* Tax Summary Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6 shrink-0">
        <h3 className="text-sm font-bold text-gray-900 mb-6">Tax Summary <span className="text-gray-400 font-medium ml-1">(1 May 2026 - 31 May 2026)</span></h3>
        
        <div className="grid grid-cols-3 gap-8 divide-x divide-gray-100">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-500 mb-1">Output GST</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">₹1,84,500</div>
              <div className="text-[12px] text-gray-400">From 86 sales invoices</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 pl-8">
            <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <ArrowDown className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-500 mb-1">Eligible Input GST</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">₹1,12,300</div>
              <div className="text-[12px] text-gray-400">From 74 purchase invoices</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 pl-8">
            <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <Equal className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-500 mb-1">Net GST Payable</div>
              <div className="text-2xl font-bold text-red-500 mb-1">₹72,200</div>
              <div className="text-[12px] text-gray-400">For this period</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 shrink-0">
        <h3 className="text-[11px] font-bold text-gray-500 tracking-wider mb-3">QUICK ACTIONS</h3>
        <div className="grid grid-cols-4 gap-4">
          
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-indigo-300 hover:shadow transition-all cursor-pointer group flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Generate E-Invoice</div>
              <div className="text-[11px] text-gray-500">Create IRN for your invoices</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors mt-0.5"><path d="m9 18 6-6-6-6"/></svg>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-indigo-300 hover:shadow transition-all cursor-pointer group flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Generate E-Way Bill</div>
              <div className="text-[11px] text-gray-500">For goods movement</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors mt-0.5"><path d="m9 18 6-6-6-6"/></svg>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-indigo-300 hover:shadow transition-all cursor-pointer group flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Check Return Status</div>
              <div className="text-[11px] text-gray-500">GSTR-1 / GSTR-3B</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors mt-0.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-red-300 hover:shadow transition-all cursor-pointer group flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="text-[13px] font-bold text-gray-900">View Issues</div>
                <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold leading-none">3</div>
              </div>
              <div className="text-[11px] text-gray-500">Fix pending items</div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors mt-0.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
          </div>
          
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 shrink-0 flex items-center gap-8 px-2">
        {['Overview', 'Sales GST', 'Purchase GST', 'Returns', 'Reconciliation'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[14px] font-semibold border-b-2 transition-colors ${
              activeTab === tab 
              ? 'border-indigo-600 text-indigo-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bottom Columns */}
      <div className="flex gap-5 shrink-0 mb-6">
        
        {/* Recent GST Activity */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Recent GST Activity</h3>
            <button className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="p-2">
            
            <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group border-b border-transparent">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5 group-hover:text-indigo-700 transition-colors">E-Invoice generated</div>
                  <div className="text-[12px] text-gray-500">INV-2026-00124 <span className="mx-0.5">•</span> Sharma Traders</div>
                </div>
              </div>
              <div className="text-[11px] font-medium text-gray-400 mt-1">Today, 04:21 PM</div>
            </div>

            <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group border-b border-transparent">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5 group-hover:text-indigo-700 transition-colors">Purchase marked as eligible ITC</div>
                  <div className="text-[12px] text-gray-500">PINV-2026-00078 <span className="mx-0.5">•</span> Gupta Enterprises</div>
                </div>
              </div>
              <div className="text-[11px] font-medium text-gray-400 mt-1">Today, 03:12 PM</div>
            </div>

            <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group border-b border-transparent">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5 group-hover:text-indigo-700 transition-colors">E-Way Bill generated</div>
                  <div className="text-[12px] text-gray-500">INV-2026-00118 <span className="mx-0.5">•</span> ABC Traders</div>
                </div>
              </div>
              <div className="text-[11px] font-medium text-gray-400 mt-1">Yesterday, 06:45 PM</div>
            </div>

            <div className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/></svg>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5 group-hover:text-indigo-700 transition-colors">GST return data updated</div>
                  <div className="text-[12px] text-gray-500">GSTR-1 <span className="mx-0.5">•</span> May 2026</div>
                </div>
              </div>
              <div className="text-[11px] font-medium text-gray-400 mt-1">Yesterday, 02:30 PM</div>
            </div>

          </div>
        </div>

        {/* Needs Attention */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Needs Attention</h3>
            <button className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="p-3">
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-red-500 bg-red-50 p-1.5 rounded">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5">3 sales invoices are missing GST details</div>
                  <div className="text-[12px] text-gray-500">Add GSTIN or correct tax rate</div>
                </div>
              </div>
              <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 shadow-sm">
                Review
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-red-500 bg-red-50 p-1.5 rounded">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5">2 E-Invoices failed generation</div>
                  <div className="text-[12px] text-gray-500">Check and regenerate</div>
                </div>
              </div>
              <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 shadow-sm">
                Review E-Invoices
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-amber-500 bg-amber-50 p-1.5 rounded">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-900 mb-0.5">1 return requires review</div>
                  <div className="text-[12px] text-gray-500">GSTR-3B for May 2026</div>
                </div>
              </div>
              <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 shadow-sm">
                Review Return
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Tip */}
      <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 flex items-center justify-between shrink-0 mb-6">
        <div className="flex items-center gap-3">
          <div className="text-amber-500">
            <Lightbulb className="w-5 h-5 fill-amber-500" />
          </div>
          <p className="text-[13px] font-semibold text-gray-800">
            Tip: Keep your customer and supplier GST details updated to avoid compliance issues.
          </p>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          Need help? Open GST Help <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

export default GstCompliance;
