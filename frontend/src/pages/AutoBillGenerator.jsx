import React, { useState } from 'react';
import { 
  Clock, MoreHorizontal, Sparkles, ChevronDown, RefreshCw, CheckCircle2, 
  Trash2, Plus, User, ArrowRight, Check, AlertTriangle, Circle
} from 'lucide-react';

const AutoBillGenerator = () => {
  const [targetAmount, setTargetAmount] = useState('1,000');
  const [minPrice, setMinPrice] = useState('10');
  const [maxPrice, setMaxPrice] = useState('5,000');
  const [quantityLimit, setQuantityLimit] = useState('10');
  const [gstAdjustment, setGstAdjustment] = useState(true);

  const generatedItems = [
    { id: 1, name: 'Basmati Rice 5kg', category: 'Food & Grains', sku: 'RICE-005', qty: 2, rate: '250.00', gst: '5%', amount: '500.00', icon: '🍚', color: 'bg-orange-50' },
    { id: 2, name: 'Cooking Oil 1L', category: 'Edible Oil', sku: 'OIL-001', qty: 2, rate: '150.00', gst: '5%', amount: '300.00', icon: '🛢️', color: 'bg-yellow-50' },
    { id: 3, name: 'Marie Biscuits 200g', category: 'Snacks', sku: 'BISC-002', qty: 4, rate: '50.00', gst: '18%', amount: '200.00', icon: '🍪', color: 'bg-amber-50' },
  ];

  const recentBills = [
    { id: 'INV-2026-00124', date: '04 Sep 2026', customer: 'Walk-in Customer', itemTotal: '₹1,000', gst: '₹180', grandTotal: '₹1,180', status: 'Created' },
    { id: 'INV-2026-00123', date: '03 Sep 2026', customer: 'Sharma Traders', itemTotal: '₹2,500', gst: '₹450', grandTotal: '₹2,950', status: 'Created' },
    { id: 'INV-2026-00122', date: '01 Sep 2026', customer: 'Gupta Stores', itemTotal: '₹1,800', gst: '₹324', grandTotal: '₹2,124', status: 'Created' },
    { id: 'INV-2026-00121', date: '31 Aug 2026', customer: 'Aarav Distributors', itemTotal: '₹750', gst: '₹135', grandTotal: '₹885', status: 'Draft' },
    { id: 'INV-2026-00120', date: '29 Aug 2026', customer: 'Walk-in Customer', itemTotal: '₹1,200', gst: '₹216', grandTotal: '₹1,416', status: 'Created' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Created':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Created</span>;
      case 'Draft':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold border border-amber-100"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Draft</span>;
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
            <span className="text-indigo-600 font-semibold">Auto Bill Generator</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Auto Bill Generator</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" /> Recent Bills
          </button>

          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            More <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex gap-6 mb-8 shrink-0 items-start">
        
        {/* Left Column - Generate a Bill */}
        <div className="w-[380px] bg-white rounded-xl border border-gray-200 shadow-sm shrink-0 flex flex-col">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-[16px] font-bold text-gray-900">Generate a Bill</h2>
          </div>
          
          <div className="p-6 flex flex-col gap-6">
            
            {/* Target Amount */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Target Amount (Before GST)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-[14px]">₹</span>
                <input 
                  type="text" 
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-7 pr-3 text-[14px] font-medium text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">Enter the item total before GST.</p>
            </div>

            {/* Customer */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Customer</label>
              <button className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium text-gray-700 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="flex items-center gap-2"><User className="w-4 h-4 text-gray-400" /> Walk-in Customer</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-2">Product Selection</label>
              <div className="flex items-center gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border-4 border-indigo-600"></div>
                  <span className="text-[13px] text-gray-700">Use all products</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                  <span className="text-[13px] text-gray-700">Select category</span>
                </label>
              </div>
              <button className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium text-gray-500 flex items-center justify-between">
                All Categories <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">Price Range (Optional)</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px]">Min</span>
                  <input 
                    type="text" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="absolute left-[26px] top-1/2 -translate-y-1/2 text-gray-500 text-[13px]">₹</span>
                </div>
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[11px]">Max</span>
                  <input 
                    type="text" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="absolute left-[30px] top-1/2 -translate-y-1/2 text-gray-500 text-[13px]">₹</span>
                </div>
              </div>
            </div>

            {/* GST Adjustment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[13px] font-medium text-gray-700">GST Adjustment</label>
                <button 
                  onClick={() => setGstAdjustment(!gstAdjustment)}
                  className={`w-9 h-5 rounded-full relative transition-colors ${gstAdjustment ? 'bg-fuchsia-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 bottom-0.5 w-4 rounded-full bg-white transition-all shadow-sm ${gstAdjustment ? 'left-[18px]' : 'left-0.5'}`}></span>
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mb-3">Adjust product price for GST</p>
              <button className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium text-gray-700 flex items-center justify-between hover:bg-gray-50 transition-colors">
                18% (Standard) <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Quantity Limit */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1">Quantity Limit</label>
              <p className="text-[11px] text-gray-400 mb-2">Maximum quantity per product</p>
              <input 
                type="text" 
                value={quantityLimit}
                onChange={(e) => setQuantityLimit(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium text-gray-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-[14px] font-bold shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-2">
              <Plus className="w-4 h-4" /> Generate Bill
            </button>

          </div>
          
          <div className="px-6 pb-6 flex justify-center">
            <ChevronDown className="w-5 h-5 text-gray-900" strokeWidth={3} />
          </div>
        </div>

        {/* Right Column - Generated Bill */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-[16px] font-bold text-gray-900">Generated Bill</h2>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-[12px] font-medium rounded-lg">Generation #1</span>
              <button className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 hover:bg-indigo-100 transition-colors">
                <RefreshCw className="w-3.5 h-3.5" /> Shuffle Again
              </button>
            </div>
          </div>

          <div className="p-6 bg-white flex-1 flex flex-col">
            
            {/* Success Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <p className="text-[13px] text-emerald-800">
                <span className="font-bold">Exact Match!</span> Generated item total matches your target amount of ₹1,000 (before GST).
              </p>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-4 gap-6 bg-[#FAFAFA] rounded-xl border border-gray-100 p-5 mb-6">
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Customer</p>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800">
                  <User className="w-3.5 h-3.5 text-gray-400" /> Walk-in Customer
                </div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Target Amount</p>
                <div className="text-[14px] font-bold text-gray-900">₹1,000</div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Item Total</p>
                <div className="text-[14px] font-bold text-gray-900">₹1,000</div>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">GST Amount</p>
                <div className="text-[14px] font-bold text-gray-900">₹180</div>
              </div>
              <div>
                <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider mb-1 mt-2">Grand Total</p>
                <div className="text-[16px] font-extrabold text-emerald-700">₹1,180</div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase w-10 text-center">#</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase">PRODUCT</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase">SKU</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase">QTY</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase text-right">RATE (₹) ↑↓</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase text-right">GST</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase text-right">AMOUNT (₹)</th>
                    <th className="py-3 px-4 text-[11px] font-bold text-gray-400 uppercase text-center w-16">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedItems.map((item, idx) => (
                    <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="py-4 px-4 text-[13px] font-medium text-gray-400 text-center">{item.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0 border border-gray-100 text-lg`}>
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-gray-900">{item.name}</span>
                            <span className="text-[11px] text-gray-400">{item.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[12px] font-medium text-gray-500 font-mono">{item.sku}</td>
                      <td className="py-4 px-4">
                        <div className="relative w-16">
                          <input type="text" defaultValue={item.qty} className="w-full border border-gray-200 rounded-md py-1.5 pl-3 pr-6 text-[13px] font-medium focus:outline-none focus:border-indigo-500" />
                          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[13px] font-medium text-gray-900 text-right">{item.rate}</td>
                      <td className="py-4 px-4 text-[13px] font-medium text-gray-500 text-right">{item.gst}</td>
                      <td className="py-4 px-4 text-[13px] font-bold text-gray-900 text-right">{item.amount}</td>
                      <td className="py-4 px-4 text-center">
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-white">
                    <td colSpan="8" className="py-3 px-4 border-t border-gray-50">
                      <button className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" /> Add Product
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Summary & Footer */}
            <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-100">
              <div className="max-w-[400px]">
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Tax calculation is applied per product category HSN rate. All prices are verified against physical stock counts.
                </p>
              </div>
              
              <div className="w-[300px]">
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[13px] text-gray-500">Item Total</span>
                  <span className="text-[13px] font-bold text-gray-900">₹1,000.00</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[13px] text-gray-500">GST Amount</span>
                  <span className="text-[13px] font-bold text-gray-900">₹180.00</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-[13px] text-gray-500">Round Off</span>
                  <span className="text-[13px] font-bold text-gray-900">₹0.00</span>
                </div>
                <div className="flex justify-between items-center pt-3 pb-1 border-t border-gray-100 mt-1">
                  <span className="text-[14px] font-bold text-gray-900">Grand Total</span>
                  <span className="text-[18px] font-extrabold text-indigo-700">₹1,180.00</span>
                </div>
              </div>
            </div>

          </div>

          {/* Actions Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              Clear
            </button>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Save as Draft
              </button>
              <button className="px-5 py-2.5 bg-indigo-600 rounded-lg text-[13px] font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
                Create Bill <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Recent Generated Bills Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col shrink-0 mb-8 overflow-hidden">
        
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-gray-900 mb-0.5">Recent Generated Bills</h2>
            <p className="text-[12px] text-gray-500">Your recently created bills using the auto generator.</p>
          </div>
          <button className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-white">
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">INVOICE NO.</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">DATE</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">CUSTOMER</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">ITEM TOTAL</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">GST</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">GRAND TOTAL</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">STATUS</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentBills.map((bill, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-bold text-indigo-600 hover:underline cursor-pointer">{bill.id}</span>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-medium text-gray-600">{bill.date}</td>
                  <td className="py-4 px-6 text-[13px] font-bold text-gray-900">{bill.customer}</td>
                  <td className="py-4 px-6 text-[13px] font-medium text-gray-700 text-right">{bill.itemTotal}</td>
                  <td className="py-4 px-6 text-[13px] font-medium text-gray-500 text-right">{bill.gst}</td>
                  <td className="py-4 px-6 text-[13px] font-bold text-gray-900 text-right">{bill.grandTotal}</td>
                  <td className="py-4 px-6 flex justify-center mt-1">
                    {getStatusBadge(bill.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-3">
                      <button className="border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto shadow-sm">View</button>
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

      </div>

    </div>
  );
};

export default AutoBillGenerator;
