import React from 'react';
import { 
  Upload, Camera, Scan, Clock, MoreHorizontal, FileText, CheckCircle2, 
  ShieldCheck, Zap, ChevronRight, ChevronDown, FileCheck, FileWarning, ArrowRight,
  Check, AlertTriangle, RefreshCw
} from 'lucide-react';

const SmartScanner = () => {
  const recentScans = [
    { id: 'SCAN-2026-00124', type: 'Purchase Invoice', date: '02 Sep 2026', fields: '18 fields', status: 'Completed', actionType: 'View' },
    { id: 'SCAN-2026-00123', type: 'Sales Invoice', date: '01 Sep 2026', fields: '14 fields', status: 'Completed', actionType: 'View' },
    { id: 'SCAN-2026-00122', type: 'Receipt', date: '31 Aug 2026', fields: '8 fields', status: 'Needs Review', actionType: 'Review' },
    { id: 'SCAN-2026-00121', type: 'Purchase Invoice', date: '30 Aug 2026', fields: '21 fields', status: 'Failed', actionType: 'Retry' },
    { id: 'SCAN-2026-00120', type: 'Sales Invoice', date: '29 Aug 2026', fields: '16 fields', status: 'Processing', actionType: 'View' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[12px] font-medium border border-emerald-100 w-fit"><Check className="w-3.5 h-3.5" /> Completed</span>;
      case 'Needs Review':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[12px] font-medium border border-amber-100 w-fit"><Clock className="w-3.5 h-3.5" /> Needs Review</span>;
      case 'Failed':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[12px] font-medium border border-red-100 w-fit"><AlertTriangle className="w-3.5 h-3.5" /> Failed</span>;
      case 'Processing':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[12px] font-medium border border-indigo-100 w-fit"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Processing</span>;
      default:
        return null;
    }
  };

  const getActionButton = (type) => {
    switch (type) {
      case 'View':
        return <button className="border border-gray-200 text-indigo-600 px-4 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto">View</button>;
      case 'Review':
        return <button className="border border-indigo-200 text-indigo-600 px-4 py-1.5 rounded-lg text-[13px] font-medium hover:bg-indigo-50 transition-colors w-full sm:w-auto">Review</button>;
      case 'Retry':
        return <button className="border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto">Retry</button>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-y-auto">
      
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-[13px] font-medium mb-1">
            <span>Smart Scanner</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Smart Scanner</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
            <Scan className="w-4 h-4" /> Scan Document
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" /> Scan History
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            More <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Top Area */}
      <div className="flex gap-6 mb-8 shrink-0">
        
        {/* Upload Box (Left) */}
        <div className="flex-[2] bg-white rounded-xl border border-gray-200 border-dashed p-10 flex flex-col items-center justify-center relative hover:bg-indigo-50/30 transition-colors group">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Scan className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <h2 className="text-[18px] font-bold text-gray-900 mb-1">Scan a document</h2>
          <p className="text-[13px] text-gray-500 mb-6">Upload an invoice, bill, receipt, or business document.</p>
          
          <div className="flex items-center gap-3 mb-4">
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
              <Upload className="w-4 h-4" /> Choose File
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
              <Camera className="w-4 h-4" /> Use Camera
            </button>
          </div>
          
          <p className="text-[12px] text-gray-400 font-medium">or drop your file here</p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">PDF, JPG, PNG • Max 10 MB</p>
        </div>

        {/* Features List (Right) */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-6 shadow-sm">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">Fast & Accurate</h3>
              <p className="text-[12px] text-gray-500">Automatically reads key details from your documents.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">Connected to your ERP</h3>
              <p className="text-[12px] text-gray-500">Create purchases, sales, expenses and more.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">Saves Time</h3>
              <p className="text-[12px] text-gray-500">No manual data entry. Just scan, review and create.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 mb-0.5">Secure</h3>
              <p className="text-[12px] text-gray-500">Your documents stay private and safe.</p>
            </div>
          </div>
        </div>

      </div>

      {/* What can you scan? */}
      <h2 className="text-[15px] font-bold text-gray-900 mb-4 shrink-0">What can you scan?</h2>
      <div className="grid grid-cols-4 gap-5 mb-8 shrink-0">
        
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Purchase Invoice</div>
              <div className="text-[11px] text-gray-400">Create a purchase document</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-500 transition-colors" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Sales Invoice</div>
              <div className="text-[11px] text-gray-400">Create a sales document</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-emerald-300 group-hover:text-emerald-500 transition-colors" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Receipt</div>
              <div className="text-[11px] text-gray-400">Record a business expense</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-300 group-hover:text-amber-500 transition-colors" />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-300 transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-gray-900 mb-0.5">Other Document</div>
              <div className="text-[11px] text-gray-400">Review extracted information</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col flex-1 shrink-0 mb-8 overflow-hidden min-h-[400px]">
        
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-gray-900">Recent scans</h2>
          <button className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-white">
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">DOCUMENT NO.</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">TYPE</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600">DATE ↑↓</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">EXTRACTED DATA</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">STATUS</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentScans.map((scan, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-bold text-indigo-600 hover:underline cursor-pointer">{scan.id}</span>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-700">{scan.type}</td>
                  <td className="py-4 px-6 text-[13px] text-gray-600">{scan.date}</td>
                  <td className="py-4 px-6 text-[13px] text-gray-600">{scan.fields}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(scan.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      {getActionButton(scan.actionType)}
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

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-[13px] text-gray-500">
            Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">5</span> of <span className="font-bold text-gray-900">20</span> scans
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm">
              5 per page <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-600 text-white font-bold text-[13px] shadow-sm">
                1
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent text-gray-600 hover:bg-gray-50 font-medium text-[13px] transition-colors">
                2
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent text-gray-600 hover:bg-gray-50 font-medium text-[13px] transition-colors">
                3
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent text-gray-600 hover:bg-gray-50 font-medium text-[13px] transition-colors">
                4
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SmartScanner;
