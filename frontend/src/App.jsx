import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import PosBilling from './pages/PosBilling';
import SalesDocuments from './pages/SalesDocuments';
import Inventory from './pages/Inventory';
import Parties from './pages/Parties';
import PurchaseDocuments from './pages/PurchaseDocuments';
import Returns from './pages/Returns';
import GeneralLedger from './pages/GeneralLedger';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import GstCompliance from './pages/GstCompliance';
import EInvoice from './pages/EInvoice';
import EWayBill from './pages/EWayBill';
import SmartScanner from './pages/SmartScanner';
import AutoBillGenerator from './pages/AutoBillGenerator';

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales-billing/pos" element={<PosBilling />} />
          <Route path="/sales-billing/sales-documents" element={<SalesDocuments />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/purchase-documents" element={<PurchaseDocuments />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/general-ledger" element={<GeneralLedger />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/gst-compliance" element={<GstCompliance />} />
          <Route path="/gst-compliance/e-invoice" element={<EInvoice />} />
          <Route path="/gst-compliance/e-way-bill" element={<EWayBill />} />
          <Route path="/smart-scanner" element={<SmartScanner />} />
          <Route path="/auto-bill-generator" element={<AutoBillGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
