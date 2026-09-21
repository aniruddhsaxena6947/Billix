# Frontend Architecture & Initialization

## Technology Stack
- **Library**: React.js
- **Styling**: Tailwind CSS
- **Build Tool**: Vite (created using simplest template without unnecessary frameworks)

## Initialization Details
The frontend has been initialized in the `frontend/` directory. Unnecessary default files from the Vite template have been cleaned up. The architecture strictly follows the INVOXENX ERP development rule: "Build only what is required. Reuse before creating. Keep the codebase clean."

## UI Reference Analysis
Based on the provided references in `UI Refrences/` (specifically `INVOXENX — Desktop App Shell (1).png` and `Sales Document.png`), the application uses a consistent layout:
- **Sidebar**: A vertical navigation bar on the left containing links (Dashboard, Sales & Billing, Inventory, Parties, Purchase Documents, Returns, Accounts & Banking, GST & Compliance, Smart Scanner, Auto Bill Generator, Settings) and a User Profile block at the bottom.
- **Header**: A top horizontal bar containing a global Search (Cmd+K), Quick Access, AI, Notifications, and account/distributor info.
- **Main Content Area**: The area where page-specific content like tables, forms, and charts are rendered.

## Core Architectural Decisions
- No complex state management libraries (Redux/Zustand) or UI frameworks (MUI/Bootstrap) are used. 
- State management will be handled natively with React hooks unless explicitly required otherwise.
- The UI will be built by matching the visual references using raw Tailwind CSS utility classes.
- A foundational `AppLayout` component will act as a wrapper providing the `Sidebar` and `Header` to all main application pages.
- Components will only be made reusable when they appear across multiple reference screens. No preemptive component library will be built.

## UI Implementation Details
- **High-Fidelity Match**: Implemented `Sidebar.jsx`, `Header.jsx`, and `AppLayout.jsx` strictly following the layout, spacing, typography, and SVG icons presented in `INVOXENX — Desktop App Shell (1).png`.
- **Styling Specs**:
  - Main background: `#F9FAFB`.
  - Header: 72px height, with integrated search bar (grey background `#F3F4F6` with `⌘ K` indicator).
  - Sidebar: 260px width, `bg-white` with hover effects and right border. Includes exact navigation grouping and icon placement.
  - Active States: `bg-indigo-50` and `text-indigo-700` (`#4F46E5` primary color equivalent) for active links.
  - User Profile: Bottom anchored with a green online status indicator and avatar block.
- **Rule Enforcement**: The implementation prioritizes visual matching of the provided Figma images over arbitrary simplification, preserving all required UI elements precisely.

## Dashboard Implementation
- **Route**: Rendered inside `AppLayout` as the default view (`src/pages/Dashboard.jsx`).
- **Structure**:
  - **Header Section**: Contains personalized greeting on the left. The right side is stacked with primary transaction actions (New Sale, New Purchase, Receive Payment) on top, secondary smart actions (Generate Smart Bill, Create Customer, etc.) directly below them, followed by the 'This Month' period selector.
  - **KPI Grid**: Four prominent metric cards (Sales, Purchases, Receivables, Payables) with positive/warning trend indicators.
  - **Data Visualization**: A custom SVG-based line chart recreating the "Sales vs Purchases" trend without needing heavy external dependencies.
  - **Needs Attention**: A right-side panel highlighting urgent items (overdue invoices, low stock) using specific accent colors (orange/indigo).
  - **Recent Invoices**: A full-width data table showcasing the latest transactions with color-coded status badges (Paid, Pending, Overdue).
- **Component Strategy**: Helper UI components (`ActionPill`, `KPICard`, `AttentionItem`, `InvoiceRow`) were created locally inside `Dashboard.jsx` to maintain a clean codebase. They will be extracted into a shared library only when other pages require them, adhering to the "Reuse before creating" and "Build only what is required" principles.

## Routing Architecture
- Integrated `react-router-dom` to support client-side routing.
- The `App.jsx` handles global routing with the `<Router>` wrapping the `AppLayout`.
- Core Routes:
  - `/`: Renders `Dashboard`
  - `/inventory`: Renders `Inventory`
  - `/parties`: Renders `Parties`
  - `/purchase-documents`: Renders `PurchaseDocuments`
  - `/sales-billing/pos`: Renders `PosBilling`
  - `/sales-billing/sales-documents`: Renders `SalesDocuments`
- The sidebar implements nested active states and collapsible menus (e.g., Sales & Billing) synchronized with the current route.

## POS Billing Implementation
- **Route**: `/sales-billing/pos` (`src/pages/PosBilling.jsx`)
- **Structure (Two-Column Layout)**:
  - **Left Section (Products)**: Implements a product grid with category filtering, a search bar (with Scan Barcode action), and customer selection. Products visually update when added or out of stock.
  - **Right Section (Current Bill)**: An always-visible cart panel detailing items, quantities, subtotal, discount, GST, and final totals. It also houses multiple payment method selectors and amount received calculation displays.
- **Interactivity (Local State)**: Uses native React state to manage cart arrays, selected categories, active payment methods, and mock successful bill creation without needing a backend.
- **Dependencies**: Added `lucide-react` for standard UI iconography required across the POS interface.
- **Component Strategy**: Built strictly as a monolithic page component (`PosBilling.jsx`) to avoid creating unnecessary small files, aligning with the "One responsibility per file, do not split everything into tiny files without a real reason" rule.

## Sales Documents Implementation
- **Route**: `/sales-billing/sales-documents` (`src/pages/SalesDocuments.jsx`)
- **Structure**:
  - **Tabs & KPI Cards**: Matches the provided reference with local state for tab switching and accurately styled KPI cards.
  - **Table**: Full-featured data table implementing selection, mock filtering, and badge-styled status columns.
  - **Document Detail Drawer**: A right-side slide-out drawer that activates upon row selection to present an overview of the document, strictly adhering to the established UI patterns.
  - **New Sale Flow**: Includes a functional dropdown linking to `PosBilling` and opening a lightweight local modal for other document types to demonstrate the UI behavior without requiring a backend.
- **Component Strategy**: Helper components like `KPICard` were kept local to `SalesDocuments.jsx` to prevent unnecessary fragmentation, fully aligning with "One responsibility per file" and "Reuse before creating".

## Inventory Implementation
- **Route**: `/inventory` (`src/pages/Inventory.jsx`)
- **Structure (Unified Workspace)**:
  - **Tabs Navigation**: An internal routing mechanism switches the workspace view between "All Products", "Low Stock", "Out of Stock", "Stock Movements", and "Inventory Value", keeping all related inventory logic in one seamless view without breaking page state.
  - **Table (Smart Statuses)**: The product grid implements real-time visual warnings, where "CURRENT STOCK" values are highlighted in red if they fall below the "MINIMUM STOCK".
  - **Selection Bar**: A dynamic floating action bar appears natively beneath the filters when rows are selected, permitting bulk mock actions (Adjust Stock, Export, Draft, Delete).
  - **Product Creation Modal**: A completely local "Add New Product" form handles basic inventory onboarding, immediately reflecting changes in the workspace's state.
- **Sidebar Integration**: The static Inventory sidebar item was dynamically upgraded into an expandable section containing "Products & Stocks", mirroring the existing "Sales & Billing" architecture.

## Parties Implementation
- **Route**: `/parties` (`src/pages/Parties.jsx`)
- **Structure (Unified Workspace)**:
  - **Unified Data Model**: Merges Customers and Suppliers into a single view. The local data model supports roles of `Customer`, `Supplier`, or `Both`, avoiding duplicated CRM/accounting pages.
  - **Tabs Navigation**: Local tabs (`All Parties`, `Customers`, `Suppliers`) instantly filter the dataset. Parties with the "Both" role correctly appear in both lists.
  - **Custom KPI Cards**: Employs a custom layout to accurately replicate the reference's distinct left-aligned, square-boxed icons.
  - **Table (Dual Badges)**: The `Type` column handles vertical stacking of the Customer (green) and Supplier (purple) badges when a party holds both roles, exactly as specified by the design.
  - **Add Party Modal**: A lightweight frontend form capable of creating parties with single or dual roles, seamlessly updating the unified workspace.
- **Sidebar Integration**: Integrated as a main navigation `<NavLink>` matching the "Dashboard" pattern, reflecting its status as a top-level standalone module.

## Purchase Documents Implementation
- **Route**: `/purchase-documents` (`src/pages/PurchaseDocuments.jsx`)
- **Structure (Unified Workspace)**:
  - **Unified Document Model**: Centralizes all purchase-side logic into a single workspace handling `Purchase Invoice`, `Purchase Order`, `Quotation`, and `Drafts`.
  - **Tabs Navigation**: Local tabs automatically update active records.
  - **Selection Bar**: Replicates the bulk-selection floating bar logic, enabling actions like `Export` and `Delete Drafts` when documents are checked.
  - **Mock Creation Flow**: `+ New Purchase` dropdown enables frontend-only creation of invoices, orders, or quick purchases, immediately reflecting in local state.
- **Sidebar Integration**: Integrated as a main standalone `<NavLink>` navigating directly to `/purchase-documents`, replacing the unnecessary dropdown pattern.

## Returns Implementation
- **Route**: `/returns` (`src/pages/Returns.jsx`)
- **Structure (Unified Workspace)**:
  - **Unified Data Model**: Merges both Sales Returns and Purchase Returns into a single integrated module.
  - **Tabs Navigation**: Local tabs (`All Returns`, `Sales Returns`, `Purchase Returns`) instantly filter the dataset without reloading or switching routes.
  - **Table**: Fully functional table reflecting the unique layout, featuring 2-line stacked `Type` badges (`Sales Return` in green, `Purchase Return` in orange) to easily distinguish return variants.
  - **Document Detail Drawer**: Clicking a return row triggers a right-side drawer summarizing the return (Original Invoice, Items, Return Amount, Status, and Overview/Notes).
  - **Mock Creation Flow**: `+ New Return` allows creating a new Sales or Purchase return through a dedicated form that mimics standard return flows (selecting original doc, party, items, amount, and reason).
- **Sidebar Integration**: The existing `Returns` sidebar item was upgraded to a `<NavLink>` directly routing to `/returns`.

## General Ledger Implementation
- **Route**: `/general-ledger` (`src/pages/GeneralLedger.jsx`)
- **Structure (Accounting Workspace)**:
  - **Account / Date Controls**: Recreated the top control card exactly from the reference, allowing selection of Account, Financial Year, and Date Range.
  - **Double-Entry Table Layout**: The ledger table accurately distinguishes debits (blue) and credits (green), implementing empty values as em-dashes `—`.
  - **Mock Data**: Simulates a balanced general ledger containing double-entry transactions (e.g. Sales debiting Accounts Receivable and crediting Sales) for UI demonstration.
  - **Transaction Detail Drawer**: Clicking a ledger entry slides out a detailed side-drawer showing the transaction ID, source, date, account, running balance, debit/credit breakdown, and description.
- **Sidebar Integration**: Refactored the `Accounts & Banking` sidebar item from a static item into an expandable block (matching `Sales & Billing`). Added nested routes for `General Ledger`, `Payments`, and `Reports & Analytics`, routing directly to `/general-ledger` when clicked.

## Payments Implementation
- **Route**: `/payments` (`src/pages/Payments.jsx`)
- **Structure (Unified Workspace)**:
  - **KPI Header**: Shows Total Received, Total Paid, Pending, and Net Movement.
  - **Date Filters**: Custom horizontal layout for quick date filtering (This Month, Last Month, etc.).
  - **Workspace Tabs**: Custom pill-shaped selector for Customer Payment, Supplier Payment, and Payment History.
  - **Table Layout**: Matches reference closely. Added custom `TYPE` badges (Received, Paid, Transfer, Refund) and custom `METHOD` icons for UPI, Bank Transfer, Cash, etc.
  - **Record Payment Modal**: A form that allows selecting Payment Type, Date, Party, Reference, Amount, Method, and Account, instantly adding a mock record to local state.
  - **Detail Drawer**: Slide-out panel for individual payments, showing the exact layout of Amount, Status, and associated metadata.
- **Sidebar Integration**: Added as a nested `<NavLink>` under the `Accounts & Banking` expanded group.

## Reports & Analytics Implementation
- **Route**: `/reports` (`src/pages/Reports.jsx`)
- **Structure**:
  - **Category Tabs**: Horizontal scrollable list to select the active report type (Business Overview, Profit & Loss, Cash Flow, etc.).
  - **KPI Row**: Key metrics showing Total Sales, Total Purchases, Gross Profit, Expenses, and Net Profit with percentage change vs last year.
  - **Date Filters**: Advanced white-box filter panel combining Financial Year dropdown, explicit From/To date fields, Quick Period, and standard filters.
  - **Charts & Tables**:
    - **Sales vs Purchases**: A frontend-only SVG line chart mimicking a dual-axis chart (Sales & Purchases) over several months.
    - **Top Customers by Sales**: A right-aligned summary table.
    - **Top Expenses**: A right-aligned summary table.
- **Sidebar Integration**: Available directly under `Accounts & Banking > Reports & Analytics`.

## GST & Compliance Implementation
- **Route**: `/gst-compliance` (`src/pages/GstCompliance.jsx`)
- **Structure**:
  - **Header & Action Bar**: Standard page header with date picker, export, and refresh.
  - **Status Cards**: GST Registration summary and Account Status confirmation.
  - **Tax Summary**: Three-column block displaying Output GST, Eligible Input GST, and Net GST Payable.
  - **Quick Actions**: 4 quick-access tiles (Generate E-Invoice, Generate E-Way Bill, Check Return Status, View Issues).
  - **Tabs**: Internal state-based switching (Overview, Sales GST, Purchase GST, Returns, Reconciliation).
  - **Recent GST Activity**: Activity feed mimicking real-time compliance tasks.
  - **Needs Attention**: Actionable alerts for missing details or failed generations.
- **Sidebar Integration**: Added as an expandable `GST & Compliance` section in the sidebar with sub-links for `GST Compliance`, `E-Invoice`, and `E-Way Bill`.

## E-Invoice Implementation
- **Route**: `/gst-compliance/e-invoice` (`src/pages/EInvoice.jsx`)
- **Structure**:
  - **Header & Action Bar**: Standard page header with + Generate E-Invoice button.
  - **Summary Cards**: Four interactive KPI cards (Total Invoices, Generated, Pending, Failed).
  - **Filters Row**: Date picker, quick date pills, search input, and dropdown filters (Status, Customer, Invoice Type).
  - **Tabs**: Internal state-based switching (All, Pending, Generated, Failed, Cancelled) with count badges.
  - **E-Invoice Table**: Detailed data table with columns for Date, Customer, Taxable Amount, GST, E-Invoice Status, and IRN.
  - **Action States**: Table rows feature status-specific badges and action buttons (View, Generate, Fix & Generate).
  - **Selection Footer**: Sticky bottom bar for bulk actions (Generate E-Invoices, Clear Selection).

## E-Way Bill Implementation
- **Route**: `/gst-compliance/e-way-bill` (`src/pages/EWayBill.jsx`)
- **Structure**:
  - **Header & Action Bar**: Standard page header with + Generate E-Way Bill button.
  - **Summary Cards**: Four interactive KPI cards (Total, Active, Pending, Expiring Soon).
  - **Filters Row**: Date picker, quick date pills, search input, and filter controls including active applied pill tokens.
  - **Tabs**: Internal state-based switching (All, Active, Pending, Expiring Soon, Expired, Failed, Cancelled) with count badges.
  - **E-Way Bill Table**: Detailed data table with columns for E-Way Bill No, Invoice/Document, Date, Party, From → To, Value, Valid Until, Status.
  - **Action States**: Table rows feature status-specific badges and action buttons (View, Generate).
- **Integration**: Operates locally mimicking logistics tracking linked to Sales/Purchase invoices.

## Smart Scanner Implementation
- **Route**: `/smart-scanner` (`src/pages/SmartScanner.jsx`)
- **Structure**:
  - **Header & Action Bar**: Standard page header with Scan Document button.
  - **Upload Area**: Large drag-and-drop zone with Choose File and Use Camera buttons.
  - **Features List**: Side-card highlighting ERP integration benefits (Fast & Accurate, Connected, Saves Time, Secure).
  - **Document Types**: 4 quick-action cards outlining supported scans (Purchase Invoice, Sales Invoice, Receipt, Other Document).
  - **Recent Scans Table**: History list showing Document No., Type, Date, Extracted Data (field counts), Status, and Action.
  - **Status States**: Mock processing statuses (Completed, Needs Review, Failed, Processing) with custom badges and corresponding action buttons (View, Review, Retry).
  - **Pagination**: Dedicated footer section for table pagination controls.

## Auto Bill Generator Implementation
- **Route**: `/auto-bill-generator` (`src/pages/AutoBillGenerator.jsx`)
- **Structure**:
  - **Independent Module**: Added as a top-level independent main sidebar module, distinct from Sales & Billing.
  - **Header & Action Bar**: Standard page header with Recent Bills and More buttons.
  - **Generate a Bill Card**: Left-hand configuration panel containing Target Amount, Customer Dropdown, Product Selection (radio+dropdown), Price Range limits, GST Adjustment toggle, and Quantity Limit inputs, generating via the primary action button.
  - **Generated Bill Card**: Right-hand preview workspace highlighting success match states, a robust summary grid (Customer, Target Amount, Item Total, GST Amount, Grand Total), an editable generated items table (Qty modification, inline deletion), and final summary totals mirroring standard invoices.
  - **Recent Generated Bills Table**: Bottom history section tracking local mock generation events (Invoice No, Date, Customer, Item Total, GST, Grand Total, Status, Action).
- **Integration**: Mimics generation of local Sales Documents with deterministic items and pre-calculated tax fields, reusing existing patterns without full API complexity.
