import React, { useState } from 'react';
import { 
  Search, Plus, Minus, ScanBarcode, Trash2, Clock, 
  ListOrdered, User, Copy, FileText, ChevronDown, MoreVertical,
  CheckCircle2, Check
} from 'lucide-react';

const mockProducts = [
  { id: 1, name: 'Tata Salt 1kg', sku: 'SALT-001', stock: 84, price: 28.00, category: 'Grains', img: '🧂' },
  { id: 2, name: 'Aashirvaad Atta 5kg', sku: 'ATTA-002', stock: 35, price: 265.00, category: 'Grains', img: '🌾' },
  { id: 3, name: 'Fortune Sunflower Oil 1L', sku: 'OIL-003', stock: 18, price: 145.00, category: 'Household', img: '🛢️' },
  { id: 4, name: 'Red Chilli Powder 500g', sku: 'SPICE-004', stock: 12, price: 120.00, category: 'Spices', img: '🌶️' },
  { id: 5, name: 'Tata Tea Premium 1kg', sku: 'TEA-005', stock: 0, price: 92.00, category: 'Beverages', img: '☕' },
  { id: 6, name: 'Parle-G Biscuit 250g', sku: 'BIS-006', stock: 42, price: 20.00, category: 'Snacks', img: '🍪' },
  { id: 7, name: 'Surf Excel Matic 1kg', sku: 'DTR-007', stock: 9, price: 210.00, category: 'Household', img: '🫧' },
  { id: 8, name: 'Clinic Plus Shampoo', sku: 'SHP-008', stock: 63, price: 95.00, category: 'Personal Care', img: '🧴' },
];

const categories = ['All', 'Grains', 'Spices', 'Beverages', 'Snacks', 'Personal Care', 'Household', 'Other'];

const PosBilling = () => {
  const [cart, setCart] = useState([
    { ...mockProducts[2], quantity: 2 },
    { ...mockProducts[3], quantity: 1 },
    { ...mockProducts[1], quantity: 1 }
  ]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountReceivedInput, setAmountReceivedInput] = useState('1000');
  const [billCreated, setBillCreated] = useState(false);

  // Cart operations
  const addToCart = (product) => {
    if (product.stock === 0) return;
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const handleCreateBill = () => {
    if (cart.length === 0) return;
    setBillCreated(true);
    setTimeout(() => {
      setBillCreated(false);
      clearCart();
    }, 2500);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 50.00; // Mock fixed discount matching UI
  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(taxableAmount * 0.12 * 100) / 100; // Mock 12% GST
  const grandTotal = Math.round(taxableAmount + gst);

  const amountReceived = amountReceivedInput === '' ? grandTotal : (parseFloat(amountReceivedInput) || 0);
  const changeDue = paymentMethod === 'Cash' ? Math.max(0, amountReceived - grandTotal) : 0;

  const filteredProducts = mockProducts.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-136px)] bg-[#F9FAFB]">
      
      {/* Toast Notification */}
      {billCreated && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="font-semibold text-sm">Bill INV-2026-00124 created successfully!</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-indigo-600 font-medium mb-1">Sales & Billing {'>'} POS Billing</div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">POS Billing</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-indigo-50 transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Bill
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" /> Hold Bill
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-indigo-500" /> Recent Bills
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Section - Products */}
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Top Actions (Customer & Outstanding) */}
          <div className="bg-white rounded-xl border border-gray-200 p-3 flex items-center justify-between shadow-sm mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <button className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 min-w-[200px] justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    Walk-in Customer
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <button className="bg-white border border-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> New Customer
              </button>
            </div>
            <div className="flex items-center gap-6 px-4 bg-gray-50 rounded-lg py-2 border border-gray-100">
              <div>
                <div className="text-[13px] font-bold text-gray-900">Walk-in Customer</div>
                <div className="text-[11px] text-gray-500">Default Customer Profile</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Outstanding</div>
                <div className="text-[15px] font-bold text-gray-900">₹0.00</div>
              </div>
            </div>
          </div>

          {/* Search & Scan */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search product by name, SKU or barcode..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-9 pr-12 text-[13px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium shadow-sm"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <span className="text-gray-400 font-medium text-[11px] bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">⌘ K</span>
              </div>
            </div>
            <button className="bg-white border border-gray-200 p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <ScanBarcode className="w-5 h-5" />
            </button>
            <button className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
              <ScanBarcode className="w-4 h-4" /> Scan Barcode
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm border ${
                  activeCategory === cat 
                    ? 'bg-[#4F46E5] text-white border-transparent' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pb-4 pr-2 custom-scrollbar">
            <div className="grid grid-cols-4 gap-4">
              {filteredProducts.map(product => {
                const inCart = cart.find(item => item.id === product.id);
                return (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
                    <h3 className="text-[14px] font-bold text-gray-900 leading-tight mb-1 line-clamp-2 mt-2">{product.name}</h3>
                    <p className="text-[11px] text-gray-500 mb-2">SKU: {product.sku}</p>
                    
                    <div className="flex items-center justify-between mb-4 mt-auto">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                        product.stock > 10 ? 'bg-green-100 text-green-700' : 
                        product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock > 0 ? `Stock: ${product.stock} pcs` : 'Out of Stock'}
                      </span>
                      <span className="text-[14px] font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                    </div>

                    {inCart ? (
                      <div className="flex items-center justify-between border border-indigo-200 rounded-lg overflow-hidden h-9">
                        <button onClick={() => updateQuantity(product.id, -1)} className="w-10 h-full flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[13px] font-bold text-indigo-900 w-8 text-center">{inCart.quantity}</span>
                        <button onClick={() => updateQuantity(product.id, 1)} className="w-10 h-full flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`w-full h-9 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors border ${
                          product.stock === 0 
                            ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'
                        }`}
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pagination */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto shrink-0">
            <div className="text-[13px] text-gray-500">
              Showing 1-8 of 128 products
            </div>
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
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent text-gray-400 font-medium text-[13px]">
                ...
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent text-gray-600 hover:bg-gray-50 font-medium text-[13px] transition-colors">
                16
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Current Bill */}
        <div className="w-[480px] bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-y-auto shrink-0 transition-all custom-scrollbar">
          
          {/* Bill Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[17px] font-bold text-gray-900 tracking-tight">Current Bill</h2>
              <div className="flex items-center gap-2">
                <button onClick={clearCart} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-gray-200 transition-colors">
                  Clear Cart
                </button>
                <button className="bg-gray-50 border border-gray-200 p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-gray-500">Bill No.</span>
              <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[13px] cursor-pointer hover:text-indigo-800">
                INV-2026-00124 <Copy className="w-3 h-3" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-gray-500">Customer</span>
              <span className="text-[13px] font-bold text-gray-900">Walk-in Customer</span>
            </div>
          </div>

          {/* Cart Table Header */}
          <div className="grid grid-cols-[1fr_60px_80px_70px_24px] gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <div>Item</div>
            <div className="text-right">Price</div>
            <div className="text-center">Qty</div>
            <div className="text-right">Total</div>
            <div></div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-2 custom-scrollbar min-h-[200px]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <FileText className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-[13px] font-medium">Cart is empty</p>
                <p className="text-[11px]">Add products to start billing</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="grid grid-cols-[1fr_60px_80px_70px_24px] gap-2 items-center py-2.5 px-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg group">
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-gray-900 truncate">{item.name}</div>
                    <div className="text-[10px] text-gray-500 truncate">SKU: {item.sku}</div>
                  </div>
                  <div className="text-[13px] text-gray-600 text-right">₹{item.price.toFixed(2)}</div>
                  <div className="flex justify-center">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white h-7 overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[12px] font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="text-[13px] font-bold text-gray-900 text-right">₹{(item.price * item.quantity).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Totals Section */}
          <div className="p-3 border-t border-gray-100 bg-gray-50/50">
            <div className="space-y-1 text-[13px]">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1 cursor-pointer hover:underline">Discount <span className="text-[10px]">✏️</span></span>
                <span className="font-semibold">- ₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 pt-1">
                <span>Taxable Amount</span>
                <span className="font-semibold text-gray-900">₹{taxableAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-1 cursor-pointer hover:underline">GST (12%) <span className="text-[10px]">✏️</span></span>
                <span className="font-semibold text-gray-900">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Round Off</span>
                <span className="font-semibold text-gray-900">₹0.00</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-1.5 mb-2">
              <span className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">Total</span>
              <span className="text-[24px] font-bold text-indigo-600 leading-none">₹{grandTotal.toFixed(2)}</span>
            </div>

            {/* Payment Methods */}
            <div className="mb-3">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Payment Method</div>
              <div className="flex flex-wrap gap-1.5">
                {['Cash', 'UPI', 'Card', 'Bank Transfer', 'Credit / Due', 'Split Payment'].map(method => (
                  <button 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors border ${
                      paymentMethod === method 
                        ? 'bg-[#4F46E5] text-white border-transparent' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs & Action */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wide">Amount Received</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 font-bold text-[13px]">₹</span>
                  <input 
                    type="text" 
                    className={`w-full bg-white border rounded-lg py-2 pl-7 pr-3 text-[13px] font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 ${paymentMethod === 'Cash' ? 'border-gray-300 text-gray-900' : 'border-gray-200 text-gray-400 bg-gray-50'}`}
                    value={paymentMethod === 'Cash' ? amountReceivedInput : grandTotal.toFixed(2)} 
                    onChange={(e) => setAmountReceivedInput(e.target.value)}
                    readOnly={paymentMethod !== 'Cash'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1 tracking-wide">Change Due</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700 font-bold text-[13px]">₹</span>
                  <input 
                    type="text" 
                    className="w-full bg-green-100 border border-transparent rounded-lg py-2 pl-7 pr-3 text-[13px] font-bold text-green-700 focus:outline-none" 
                    value={changeDue.toFixed(2)} 
                    readOnly 
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleCreateBill}
              disabled={cart.length === 0}
              className={`w-full py-2.5 rounded-lg text-[14px] font-bold flex items-center justify-center gap-2 transition-colors shadow-sm mb-2.5 ${
                cart.length > 0 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" strokeWidth={3} />
              CREATE BILL (F6)
            </button>
            
            <button className="w-full py-2.5 rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 transition-colors border border-gray-200 text-indigo-700 hover:bg-gray-50 bg-white shadow-sm">
              <FileText className="w-4 h-4" /> Save as Draft
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E5E7EB; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #D1D5DB; }
      `}} />
    </div>
  );
};

export default PosBilling;
