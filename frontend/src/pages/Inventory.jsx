import React, { useState } from 'react';
import { 
  MoreHorizontal, Download, Plus, Search, Filter,
  ChevronDown, ChevronLeft, ChevronRight, X, FileText,
  List, AlertCircle, XCircle, ArrowLeftRight, BarChart2,
  Edit, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// -- Mock Data --
const initialProducts = [
  { id: '1', name: 'Coca Cola 750ml', sku: 'SKU-1045', category: 'Beverages', unit: 'Bottle', currentStock: 18, minStock: 20, maxStock: 60, purchasePrice: 40.00 },
  { id: '2', name: 'Pepsi 600ml', sku: 'SKU-1046', category: 'Beverages', unit: 'Bottle', currentStock: 12, minStock: 15, maxStock: 50, purchasePrice: 32.00 },
  { id: '3', name: 'Tata Tea Premium 1kg', sku: 'SKU-1188', category: 'Beverages', unit: 'Pack', currentStock: 65, minStock: 30, maxStock: 80, purchasePrice: 180.00 },
  { id: '4', name: 'Sprite 750ml', sku: 'SKU-1047', category: 'Beverages', unit: 'Bottle', currentStock: 0, minStock: 10, maxStock: 40, purchasePrice: 35.00 },
  { id: '5', name: 'Limca 600ml', sku: 'SKU-1048', category: 'Beverages', unit: 'Bottle', currentStock: 30, minStock: 20, maxStock: 60, purchasePrice: 28.00 },
  { id: '6', name: 'Maaza Mango 600ml', sku: 'SKU-1049', category: 'Beverages', unit: 'Bottle', currentStock: 8, minStock: 12, maxStock: 48, purchasePrice: 30.00 },
];

const mockMovements = [
  { id: 'm1', date: '30 Aug 2026', product: 'Coca Cola 750ml', sku: 'SKU-1045', type: 'Sale', qty: -2, ref: 'INV-2026-00124', balance: 18 },
  { id: 'm2', date: '29 Aug 2026', product: 'Sprite 750ml', sku: 'SKU-1047', type: 'Sale', qty: -5, ref: 'INV-2026-00121', balance: 0 },
  { id: 'm3', date: '28 Aug 2026', product: 'Tata Tea Premium 1kg', sku: 'SKU-1188', type: 'Purchase', qty: 50, ref: 'PUR-2026-00040', balance: 65 },
  { id: 'm4', date: '25 Aug 2026', product: 'Pepsi 600ml', sku: 'SKU-1046', type: 'Adjustment', qty: -3, ref: 'ADJ-101', balance: 12 },
];

// -- Helpers --
const formatCurrency = (amt) => {
  return '₹' + amt.toFixed(2);
};

const getStockColor = (current, min) => {
  if (current === 0) return 'text-red-600';
  if (current < min) return 'text-red-600';
  return 'text-emerald-600';
};

const Inventory = () => {
  const [activeTab, setActiveTab] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState([]);
  
  // New Product Modal
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  // Filtering Logic
  const getFilteredProducts = () => {
    let filtered = products;
    
    // Tab Filters
    if (activeTab === 'Low Stock') {
      filtered = filtered.filter(p => p.currentStock > 0 && p.currentStock < p.minStock);
    } else if (activeTab === 'Out of Stock') {
      filtered = filtered.filter(p => p.currentStock === 0);
    }
    
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) setSelectedIds([]);
    else setSelectedIds(filteredProducts.map(p => p.id));
  };

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      id: Date.now().toString(),
      name: formData.get('name'),
      sku: formData.get('sku'),
      category: formData.get('category') || 'Uncategorized',
      unit: formData.get('unit') || 'Piece',
      currentStock: parseInt(formData.get('currentStock')) || 0,
      minStock: parseInt(formData.get('minStock')) || 0,
      maxStock: parseInt(formData.get('maxStock')) || 0,
      purchasePrice: parseFloat(formData.get('purchasePrice')) || 0
    };
    setProducts([newProduct, ...products]);
    setShowNewProductModal(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-[#F9FAFB] -m-8 p-8 relative overflow-hidden">
      
      {/* Header Area */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <div className="text-[13px] text-gray-500 font-medium mb-1 flex items-center gap-2">
            <div className="w-4 h-4 opacity-70"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>
            <span className="hover:text-gray-700 cursor-pointer">Inventory</span>
            <span className="text-gray-400">/</span>
            <span className="text-indigo-600 font-semibold">Products & Stock</span>
          </div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Products & Stock</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNewProductModal(true)}
            className="bg-[#4F46E5] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Product
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Edit className="w-4 h-4 text-gray-500" /> Adjust Stock
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500" /> Export <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <MoreHorizontal className="w-4 h-4 text-gray-500" /> More <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col min-h-0 flex-1 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 shrink-0 px-2 pt-2 overflow-x-auto">
          {[
            { name: 'All Products', icon: <List className="w-4 h-4" /> },
            { name: 'Low Stock', icon: <AlertCircle className="w-4 h-4" /> },
            { name: 'Out of Stock', icon: <XCircle className="w-4 h-4" /> },
            { name: 'Stock Movements', icon: <ArrowLeftRight className="w-4 h-4" /> },
            { name: 'Inventory Value', icon: <BarChart2 className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.name}
              onClick={() => { setActiveTab(tab.name); setSelectedIds([]); }}
              className={`px-5 py-3.5 flex items-center gap-2.5 text-[14px] font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === tab.name ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.name}
              {activeTab === tab.name && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
              )}
            </button>
          ))}
        </div>

        {/* Filters Area */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search product, SKU, barcode or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[480px] bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-10 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-gray-50">⌘ K</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" /> More Filters
            </button>
            <button onClick={() => { setSearchQuery(''); setActiveTab('All Products'); }} className="text-indigo-600 font-semibold text-[13px] hover:text-indigo-700 transition-colors">
              Clear Filters
            </button>
          </div>
        </div>

        {/* Selection Action Bar (Sticky beneath filters if active) */}
        {selectedIds.length > 0 && activeTab !== 'Stock Movements' && (
          <div className="bg-indigo-50/50 border-b border-indigo-100 px-5 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={true} onChange={toggleSelectAll} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" />
              <span className="text-[13.5px] font-bold text-gray-900">{selectedIds.length} selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm">
                <Edit className="w-3.5 h-3.5" /> Adjust Stock
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 flex items-center gap-1.5 shadow-sm">
                <FileText className="w-3.5 h-3.5" /> Draft
              </button>
              <button className="bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-red-50 flex items-center gap-1.5 shadow-sm">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
              <button onClick={() => setSelectedIds([])} className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-50 shadow-sm ml-2">
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Table Content */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          
          {/* Products View */}
          {activeTab !== 'Stock Movements' && activeTab !== 'Inventory Value' && (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
                <tr>
                  <th className="py-4 px-5 w-12 border-b border-gray-100">
                    <input type="checkbox" checked={selectedIds.length > 0 && selectedIds.length === filteredProducts.length} onChange={toggleSelectAll} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" />
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">PRODUCT <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">SKU <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">CATEGORY <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">UNIT <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">CURRENT STOCK <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">MINIMUM STOCK <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1.5">MAXIMUM STOCK <span className="text-[8px]">▲▼</span></div>
                  </th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">
                    PURCHASE PRICE
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr><td colSpan="9" className="py-16 text-center text-gray-500 text-[14px]">No products found.</td></tr>
                ) : (
                  filteredProducts.map(product => (
                    <tr 
                      key={product.id}
                      className={`border-b border-gray-50 hover:bg-gray-50/70 transition-colors group ${selectedIds.includes(product.id) ? 'bg-indigo-50/10' : ''}`}
                    >
                      <td className="py-3 px-5 w-12">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(product.id)} 
                          onChange={(e) => toggleSelect(product.id, e)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer" 
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded border border-gray-200 shrink-0"></div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 text-[13.5px]">{product.name}</span>
                            <span className="text-gray-500 text-[12px]">{product.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-[13.5px]">{product.sku}</td>
                      <td className="py-3 px-4 text-gray-600 text-[13.5px]">{product.category}</td>
                      <td className="py-3 px-4 text-gray-600 text-[13.5px]">{product.unit}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold text-[13.5px] ${getStockColor(product.currentStock, product.minStock)}`}>
                          {product.currentStock} {product.unit.toLowerCase()}{product.currentStock !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-[13.5px]">{product.minStock} {product.unit.toLowerCase()}s</td>
                      <td className="py-3 px-4 text-gray-600 text-[13.5px]">{product.maxStock} {product.unit.toLowerCase()}s</td>
                      <td className="py-3 px-4 font-semibold text-gray-600 text-[13.5px] text-right">{formatCurrency(product.purchasePrice)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Stock Movements View */}
          {activeTab === 'Stock Movements' && (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_#f3f4f6]">
                <tr>
                  <th className="py-4 px-5 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">DATE</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">PRODUCT</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">SKU</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">TYPE</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">REFERENCE</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">QUANTITY</th>
                  <th className="py-4 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">BALANCE</th>
                </tr>
              </thead>
              <tbody>
                {mockMovements.map(m => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                    <td className="py-4 px-5 text-gray-600 text-[13.5px] whitespace-nowrap">{m.date}</td>
                    <td className="py-4 px-4 font-semibold text-gray-900 text-[13.5px]">{m.product}</td>
                    <td className="py-4 px-4 text-gray-500 text-[13.5px]">{m.sku}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                        m.type === 'Purchase' ? 'bg-emerald-50 text-emerald-600' :
                        m.type === 'Sale' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {m.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-indigo-600 text-[13.5px]">{m.ref}</td>
                    <td className={`py-4 px-4 font-bold text-[13.5px] text-right ${m.qty > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {m.qty > 0 ? '+' : ''}{m.qty}
                    </td>
                    <td className="py-4 px-4 font-bold text-gray-900 text-[13.5px] text-right">{m.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {/* Inventory Value Placeholder */}
          {activeTab === 'Inventory Value' && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BarChart2 className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-[15px] font-bold text-gray-700">Inventory Valuation</h3>
              <p className="text-[13px] text-gray-500 mt-2 max-w-sm">Comprehensive reports on inventory value across categories will be available here.</p>
            </div>
          )}

        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="text-[13px] text-gray-500 font-medium">
            Showing 1 to {Math.min(20, filteredProducts.length)} of 128 products
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-[13px] font-medium text-gray-600 cursor-pointer hover:bg-gray-50">
              <span className="font-bold">20</span> per page <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors bg-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded bg-[#4F46E5] text-white text-[13px] font-bold flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded border border-gray-200 bg-white text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">2</button>
              <button className="w-8 h-8 rounded border border-gray-200 bg-white text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">3</button>
              <button className="w-8 h-8 rounded border border-gray-200 bg-white text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">4</button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-8 h-8 rounded border border-gray-200 bg-white text-gray-600 text-[13px] font-semibold hover:bg-gray-50 flex items-center justify-center">7</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors bg-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* --- New Product Modal --- */}
      {showNewProductModal && (
        <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[90vh] flex flex-col border border-gray-200 animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-gray-900">Add New Product</h3>
              <button onClick={() => setShowNewProductModal(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Product Name</label>
                    <input name="name" type="text" placeholder="e.g. Diet Coke 500ml" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">SKU</label>
                    <input name="sku" type="text" placeholder="e.g. SKU-1234" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Category</label>
                    <div className="relative">
                      <select name="category" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 pr-8 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none">
                        <option>Beverages</option>
                        <option>Snacks</option>
                        <option>Dairy</option>
                        <option>Grocery</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Purchase Price (₹)</label>
                    <input name="purchasePrice" type="number" step="0.01" placeholder="0.00" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Selling Price (₹)</label>
                    <input name="sellingPrice" type="number" step="0.01" placeholder="0.00" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Opening Stock</label>
                    <input name="currentStock" type="number" defaultValue="0" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Minimum Stock</label>
                    <input name="minStock" type="number" defaultValue="10" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Maximum Stock</label>
                    <input name="maxStock" type="number" defaultValue="50" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-[13px] font-medium focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>
              
              <div className="p-5 border-t border-gray-100 flex justify-end gap-3 shrink-0 bg-gray-50/50 rounded-b-xl">
                <button type="button" onClick={() => setShowNewProductModal(false)} className="px-5 py-2.5 text-[13px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm">Cancel</button>
                <button type="submit" className="px-5 py-2.5 text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">Save Product</button>
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

export default Inventory;
