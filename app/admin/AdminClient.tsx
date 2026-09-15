'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Boxes, 
  TrendingUp, 
  Megaphone, 
  Users, 
  CreditCard, 
  SlidersHorizontal,
  Plus, 
  Search, 
  Filter, 
  Check, 
  AlertTriangle, 
  ArrowUpRight, 
  Eye, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  Package, 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Truck, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Info,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useAdmin, InventoryItem, Order, CustomerAccount, SiteTicker, OrderStatus, PaymentStatus } from '@/context/AdminContext';
import { HONEY_SUBCATEGORIES, BEEKEEPING_SUBCATEGORIES, Department, Subcategory } from '@/lib/products';

type AdminTab = 'overview' | 'inventory' | 'sales' | 'tickers' | 'customers' | 'accounts';

export default function AdminClient() {
  const {
    inventory,
    orders,
    customers,
    tickers,
    activeTicker,
    metrics,
    updateStock,
    updateProductDetails,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    updatePaymentStatus,
    updateCustomerTier,
    updateCustomerAccount,
    addCustomer,
    recordCustomerPayment,
    updateTicker,
    addTicker,
    deleteTicker,
    setActiveTickerId,
    resetToDefaults,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter States
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryDept, setInventoryDept] = useState<'all' | Department>('all');
  const [editingProduct, setEditingProduct] = useState<InventoryItem | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New Product Form State & File Upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadDragActive, setUploadDragActive] = useState(false);
  const [newProdForm, setNewProdForm] = useState({
    name: '',
    subtitle: '',
    department: 'honey' as Department,
    subcategory: 'honey-raw' as Subcategory,
    price: 45,
    costPrice: 16,
    stockCount: 50,
    lowStockThreshold: 10,
    locationBin: 'SUS-BAY-A-1',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    materials: 'Raw Sussex County Honey',
    details: ['100% Unheated Raw', 'Estate Extracted'],
  });

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (e.g. JPG, PNG, WEBP).');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setNewProdForm((prev) => ({ ...prev, imageUrl: result }));
          setUploadedFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setUploadDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please drop an image file (e.g. JPG, PNG, WEBP).');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setNewProdForm((prev) => ({ ...prev, imageUrl: result }));
          setUploadedFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setEditingProduct((prev) => prev ? { ...prev, imageUrl: result } : null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Sales/Orders states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Customer states
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustForm, setNewCustForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    tier: 'Retail Customer' as CustomerAccount['tier'],
    creditLimit: 2500,
    notes: '',
  });

  // New Ticker Form State
  const [showAddTickerModal, setShowAddTickerModal] = useState(false);
  const [newTickerForm, setNewTickerForm] = useState({
    text: '',
    highlightText: 'Sussex County Apiary',
    linkText: 'Learn More',
    linkHref: '/honey',
    type: 'announcement' as SiteTicker['type'],
    priority: 1,
    active: false,
  });

  // Payment Recording State for Accounts
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentTargetCustomer, setPaymentTargetCustomer] = useState<CustomerAccount | null>(null);

  // Filtered Inventory
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      if (inventoryDept !== 'all' && item.department !== inventoryDept) return false;
      if (inventorySearch.trim() !== '') {
        const q = inventorySearch.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          (item.locationBin && item.locationBin.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [inventory, inventoryDept, inventorySearch]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (orderStatusFilter !== 'all' && order.status !== orderStatusFilter) return false;
      if (orderSearch.trim() !== '') {
        const q = orderSearch.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(q) ||
          order.customerName.toLowerCase().includes(q) ||
          order.customerEmail.toLowerCase().includes(q) ||
          (order.customerCompany && order.customerCompany.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      if (customerSearch.trim() !== '') {
        const q = customerSearch.toLowerCase();
        return (
          cust.name.toLowerCase().includes(q) ||
          cust.email.toLowerCase().includes(q) ||
          (cust.company && cust.company.toLowerCase().includes(q)) ||
          cust.tier.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [customers, customerSearch]);

  // Quick low-stock count
  const lowStockItems = inventory.filter((i) => i.stockCount <= i.lowStockThreshold);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 xl:px-12 2xl:px-16 w-full max-w-(--breakpoint-2xl) 2xl:max-w-[1720px] mx-auto text-left space-y-8">
      
      {/* Admin Atelier Header with Clearly Visible Apiary Operations Background */}
      <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
        
        {/* Editorial Commercial Apiary Operations Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <Image
            src="/images/banner-beekeeping-gear.jpg"
            alt="Commercial Apiary Operations & Hardware"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] opacity-75 sm:opacity-85"
          />
          {/* Typographic Scrim Gradient: High contrast for left text, apiary operations clearly visible on center and right */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40 sm:from-slate-950/90 sm:via-slate-950/70 sm:to-slate-950/30" />
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2">
            {/* Clean Typographic Eyebrow (No Pill Badge) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Atelier OS &bull; Sussex Apiary</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-slate-400 font-mono text-[11px] lowercase">v2.6 enterprise</span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Operations &amp; Commerce Atelier
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Unified governance for reserve honey inventory, harvest bin hardware, client accounts, customer ledger, sales fulfillment, and active store tickers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
            <button
              onClick={resetToDefaults}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 backdrop-blur-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              title="Reset inventory, orders, and clients back to baseline demo datasets"
            >
              <RefreshCw size={14} />
              <span>Reset Demo State</span>
            </button>

            <Link
              href="/"
              prefetch={true}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Storefront</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Global Key Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-800/80 relative z-10">
          <div className="bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition-colors">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate">Total Revenue</span>
            <span className="text-base sm:text-2xl font-extrabold font-mono text-emerald-300 truncate mt-1">
              ${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs hover:border-amber-500/40 transition-colors">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate">Est. Gross Profit</span>
            <span className="text-base sm:text-2xl font-extrabold font-mono text-amber-300 truncate mt-1">
              ${metrics.grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs hover:border-slate-600 transition-colors">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate">Orders Placed</span>
            <span className="text-base sm:text-2xl font-extrabold font-mono text-white truncate mt-1">
              {metrics.ordersCount}
            </span>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition-colors">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate">Avg Order Value</span>
            <span className="text-base sm:text-2xl font-extrabold font-mono text-emerald-200 truncate mt-1">
              ${metrics.averageOrderValue.toFixed(2)}
            </span>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs hover:border-rose-500/40 transition-colors">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate">Pending Receivables</span>
            <span className="text-base sm:text-2xl font-extrabold font-mono text-rose-300 truncate mt-1">
              ${metrics.receivablesPending.toFixed(2)}
            </span>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xs hover:border-sky-500/40 transition-colors">
            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block truncate">Asset Valuation</span>
            <span className="text-base sm:text-2xl font-extrabold font-mono text-sky-300 truncate mt-1">
              ${metrics.inventoryAssetValue.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs: Smooth Horizontal Scroll on Mobile, Full Row on Desktop */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <TrendingUp size={16} strokeWidth={2.4} />
            <span>Executive Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Boxes size={16} strokeWidth={2.4} />
            <span>Inventory Management</span>
            {lowStockItems.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold">
                {lowStockItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sales')}
            className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'sales'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <ShoppingBag size={16} strokeWidth={2.4} />
            <span>Sales &amp; Dispatch</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-mono font-bold">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tickers')}
            className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'tickers'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Megaphone size={16} strokeWidth={2.4} />
            <span>Storefront Tickers &amp; Alerts</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] font-mono">
              {tickers.filter(t => t.active).length} Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Users size={16} strokeWidth={2.4} />
            <span>Customer Tracking</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-mono font-bold">
              {customers.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('accounts')}
            className={`shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'accounts'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <CreditCard size={16} strokeWidth={2.4} />
            <span>Accounts &amp; Ledger</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. EXECUTIVE OVERVIEW TAB */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 sm:space-y-8">
          {/* Active Broadcast Banner Alert */}
          {activeTicker && (
            <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start sm:items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-200/70 text-amber-900 shrink-0 mt-0.5 sm:mt-0">
                  <Megaphone size={18} />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                    Currently Broadcasting at Top of Storefront
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    &ldquo;{activeTicker.text}&rdquo;
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('tickers')}
                className="text-xs font-bold text-emerald-900 hover:underline cursor-pointer shrink-0 self-start sm:self-center"
              >
                Configure Tickers →
              </button>
            </div>
          )}

          {/* Low Stock Warning Banner if any */}
          {lowStockItems.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 shadow-2xs">
              <div className="flex items-start sm:items-center gap-3">
                <span className="p-2 rounded-xl bg-rose-200 text-rose-900 shrink-0 mt-0.5 sm:mt-0">
                  <AlertTriangle size={18} />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-rose-900">
                    {lowStockItems.length} Products Require Replenishment
                  </h4>
                  <p className="text-xs text-rose-700 leading-relaxed">
                    Inventory levels have fallen below set thresholds (e.g. {lowStockItems.map(i => i.name).slice(0, 2).join(', ')}).
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('inventory')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition cursor-pointer shrink-0 text-center"
              >
                Inspect Inventory
              </button>
            </div>
          )}

          {/* Quick Dual Columns: Recent Sales vs Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Recent Orders Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-emerald-800" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">Recent Sales &amp; Dispatches</h3>
                </div>
                <button
                  onClick={() => setActiveTab('sales')}
                  className="text-xs font-bold text-emerald-900 hover:underline cursor-pointer"
                >
                  View All ({orders.length}) →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {orders.slice(0, 4).map((order) => (
                  <div key={order.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900">{order.orderNumber}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-slate-600 font-medium truncate">
                        {order.customerName} {order.customerCompany ? `• ${order.customerCompany}` : ''}
                      </p>
                      <span className="text-[11px] text-slate-400 block">{order.date}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-sm sm:text-base text-slate-900 block">
                        ${order.total.toFixed(2)}
                      </span>
                      <span className={`inline-block text-[10px] font-semibold uppercase ${order.paymentStatus === 'paid' ? 'text-emerald-700 font-bold' : 'text-amber-700'}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Corporate & VIP Accounts Card (Bulletproof Mobile Layout) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-emerald-800" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">Top VIP &amp; Corporate Clients</h3>
                </div>
                <button
                  onClick={() => setActiveTab('customers')}
                  className="text-xs font-bold text-emerald-900 hover:underline cursor-pointer"
                >
                  View Directory ({customers.length}) →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {customers.slice(0, 4).map((cust) => (
                  <div key={cust.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug truncate">
                          {cust.name}
                        </h4>
                        <p className="text-slate-500 text-xs truncate">
                          {cust.company || cust.email}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-sm sm:text-base text-emerald-950 block">
                          ${cust.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        {cust.outstandingBalance > 0 && (
                          <span className="text-[10px] font-mono font-bold text-rose-600 block">
                            ${cust.outstandingBalance.toFixed(2)} due
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 pt-0.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 font-bold text-[10px] tracking-wide whitespace-nowrap">
                        {cust.tier}
                      </span>
                      <span className="font-medium text-slate-500">{cust.totalOrders} Lifetime Orders</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. INVENTORY MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-80">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Filter by product name, SKU, or storage bin..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-700"
                />
              </div>

              {/* Department Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setInventoryDept('all')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    inventoryDept === 'all' ? 'bg-white text-emerald-950 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  All ({inventory.length})
                </button>
                <button
                  onClick={() => setInventoryDept('honey')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    inventoryDept === 'honey' ? 'bg-white text-emerald-950 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Honey Products ({inventory.filter(i => i.department === 'honey').length})
                </button>
                <button
                  onClick={() => setInventoryDept('beekeeping')}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    inventoryDept === 'beekeeping' ? 'bg-white text-emerald-950 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Beekeeping Gear ({inventory.filter(i => i.department === 'beekeeping').length})
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={15} />
              <span>Catalog New Item</span>
            </button>
          </div>

          {/* Inventory Items List: Mobile Card View (md:hidden) + Desktop Table (hidden md:block) */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            {/* Mobile Card List (Zero Horizontal Scrolling) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredInventory.map((item) => {
                const margin = item.price > 0 ? (((item.price - item.costPrice) / item.price) * 100).toFixed(0) : '0';
                const isLow = item.stockCount <= item.lowStockThreshold;
                const isOut = item.stockCount === 0;

                return (
                  <div key={item.id} className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">{item.name}</h4>
                          {isOut ? (
                            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] uppercase tracking-wider shrink-0">
                              Depleted
                            </span>
                          ) : isLow ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-1">
                              <AlertTriangle size={10} /> Low
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider shrink-0">
                              Optimal
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                            item.department === 'honey' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {item.department === 'honey' ? 'Honey Atelier' : 'Apiary Gear'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">Lot: {item.batchNumber || 'N/A'}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Bin: {item.locationBin || 'UNASSIGNED'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Price</span>
                        <span className="font-mono font-bold text-slate-900 text-xs">${item.price.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Cost</span>
                        <span className="font-mono text-slate-600 text-xs">${item.costPrice.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Margin</span>
                        <span className="font-mono font-bold text-emerald-800 text-xs">{margin}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-600">Stock:</span>
                        <input
                          type="number"
                          min="0"
                          value={item.stockCount}
                          onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 rounded-lg border border-slate-200 bg-white text-center font-mono font-bold text-slate-900 text-xs focus:outline-hidden focus:border-emerald-700"
                        />
                        <button
                          onClick={() => updateStock(item.id, item.stockCount + 10)}
                          className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[10px] font-bold transition"
                        >
                          +10
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProduct(item)}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                          title="Edit product parameters"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => deleteProduct(item.id)}
                          className="p-2 rounded-lg hover:bg-rose-50 text-rose-600 transition"
                          title="Archive product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Item &amp; Department</th>
                    <th className="py-3 px-4">Storage Bin &amp; Batch</th>
                    <th className="py-3 px-4">Retail Price</th>
                    <th className="py-3 px-4">Cost Price</th>
                    <th className="py-3 px-4">Margin</th>
                    <th className="py-3 px-4">In-Stock Count</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Quick Stock Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInventory.map((item) => {
                    const margin = item.price > 0 ? (((item.price - item.costPrice) / item.price) * 100).toFixed(0) : '0';
                    const isLow = item.stockCount <= item.lowStockThreshold;
                    const isOut = item.stockCount === 0;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <Image
                                src={item.imageUrl}
                                alt={item.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block line-clamp-1">{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono block">ID: {item.id}</span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm inline-block mt-0.5 ${
                                item.department === 'honey' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                              }`}>
                                {item.department === 'honey' ? 'Honey Atelier' : 'Apiary Gear'}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-mono font-semibold text-slate-800 block">{item.locationBin || 'UNASSIGNED'}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">Lot: {item.batchNumber || 'N/A'}</span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          ${item.price.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-600">
                          ${item.costPrice.toFixed(2)}
                        </td>

                        <td className="py-3 px-4 font-mono font-semibold text-emerald-800">
                          {margin}%
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              value={item.stockCount}
                              onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-center font-mono font-bold text-slate-900 focus:outline-hidden focus:border-emerald-700"
                            />
                            <span className="text-slate-400 text-[11px]">units</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          {isOut ? (
                            <span className="px-2 py-1 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] uppercase tracking-wider">
                              Depleted (0)
                            </span>
                          ) : isLow ? (
                            <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1">
                              <AlertTriangle size={11} /> Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider">
                              Optimal
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => updateStock(item.id, item.stockCount + 10)}
                              className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-[10px] font-bold transition cursor-pointer"
                              title="Quick Restock +10 units"
                            >
                              +10 Restock
                            </button>
                            <button
                              onClick={() => setEditingProduct(item)}
                              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                              title="Edit product parameters"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => deleteProduct(item.id)}
                              className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600 transition cursor-pointer"
                              title="Archive product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SALES & DISPATCH MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
            <div className="relative flex-1 sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by order #, client name, or email..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-700"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer capitalize ${
                    orderStatusFilter === status ? 'bg-white text-emerald-950 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table & Mobile Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            {/* Mobile Card View (Zero Horizontal Scrolling) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-slate-900 text-sm block">{order.orderNumber}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{order.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-sm text-slate-900 block">
                        ${order.total.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Sub: ${order.subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{order.customerName}</span>
                      {order.customerCompany && (
                        <span className="text-[10px] text-emerald-800 font-semibold">{order.customerCompany}</span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">{order.customerEmail}</span>
                    <div className="pt-1 border-t border-slate-200/60 space-y-0.5">
                      {order.items.map((it, idx) => (
                        <p key={idx} className="text-slate-700 text-xs line-clamp-1">
                          <span className="font-bold text-slate-900">{it.quantity}x</span> {it.name}
                          {it.finish ? ` (${it.finish})` : ''}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Payment</label>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updatePaymentStatus(order.id, e.target.value as PaymentStatus)}
                        className={`w-full px-2 py-1.5 rounded-lg text-xs font-bold border ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="paid">PAID</option>
                        <option value="pending">PENDING</option>
                        <option value="refunded">REFUNDED</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Fulfillment</label>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`w-full px-2 py-1.5 rounded-lg text-xs font-bold border ${
                          order.status === 'delivered' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                          order.status === 'processing' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                          'bg-slate-100 text-slate-800 border-slate-300'
                        }`}
                      >
                        <option value="pending">PENDING</option>
                        <option value="processing">PROCESSING</option>
                        <option value="shipped">SHIPPED</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="cancelled">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {order.trackingCode ? (
                      <span className="text-[10px] text-slate-400 font-mono truncate">
                        Track: {order.trackingCode}
                      </span>
                    ) : <span />}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
                    >
                      Details / Pack Slip
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Order # &amp; Date</th>
                    <th className="py-3 px-4">Recipient Client</th>
                    <th className="py-3 px-4">Items Summary</th>
                    <th className="py-3 px-4">Total Value</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                    <th className="py-3 px-4 text-right">Dispatch Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 block text-sm">{order.orderNumber}</span>
                        <span className="text-[11px] text-slate-400 font-mono block">{order.date}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{order.customerName}</span>
                        <span className="text-[11px] text-slate-500 block">{order.customerEmail}</span>
                        {order.customerCompany && (
                          <span className="text-[10px] text-emerald-800 font-semibold block">{order.customerCompany}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          {order.items.map((it, idx) => (
                            <p key={idx} className="text-slate-700 line-clamp-1">
                              <span className="font-bold text-slate-900">{it.quantity}x</span> {it.name}
                              {it.finish ? ` (${it.finish})` : ''}
                            </p>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-sm text-slate-900 block">
                          ${order.total.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Sub: ${order.subtotal.toFixed(2)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value as PaymentStatus)}
                          className={`px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer border ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="paid">PAID</option>
                          <option value="pending">PENDING</option>
                          <option value="refunded">REFUNDED</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer border ${
                            order.status === 'delivered' ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                            order.status === 'processing' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                            'bg-slate-100 text-slate-800 border-slate-300'
                          }`}
                        >
                          <option value="pending">PENDING</option>
                          <option value="processing">PROCESSING</option>
                          <option value="shipped">SHIPPED</option>
                          <option value="delivered">DELIVERED</option>
                          <option value="cancelled">CANCELLED</option>
                        </select>

                        {order.trackingCode && (
                          <span className="block text-[10px] text-slate-400 font-mono mt-1">
                            {order.trackingCode}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition cursor-pointer"
                        >
                          Details / Pack Slip
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. STOREFRONT TICKERS & ALERTS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'tickers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Top Announcement Tickers &amp; Broadcast Bar
              </h3>
              <p className="text-xs text-slate-500 max-w-xl">
                Control the real-time ticker message displayed across the top banner of the site. Switch alerts instantly for seasonal honey harvests, urgent shipping notices, or VIP concierge deadlines.
              </p>
            </div>

            <button
              onClick={() => setShowAddTickerModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Plus size={15} />
              <span>Create New Ticker</span>
            </button>
          </div>

          {/* Tickers List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickers.map((ticker) => {
              const isActive = ticker.active;
              return (
                <div
                  key={ticker.id}
                  className={`rounded-2xl border p-5 space-y-4 flex flex-col justify-between transition-all ${
                    isActive
                      ? 'bg-emerald-950 text-white border-emerald-800 shadow-md ring-2 ring-emerald-500'
                      : 'bg-white text-slate-900 border-slate-200 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ticker.type}
                      </span>
                      <span className={`text-xs font-mono ${isActive ? 'text-emerald-300' : 'text-slate-400'}`}>
                        Priority #{ticker.priority}
                      </span>
                    </div>

                    <p className={`font-serif text-sm leading-relaxed ${isActive ? 'text-emerald-50' : 'text-slate-800'}`}>
                      &ldquo;{ticker.text}&rdquo;
                    </p>

                    <div className="space-y-1 text-xs pt-1 border-t border-slate-200/20">
                      <div className="flex justify-between">
                        <span className={isActive ? 'text-emerald-300' : 'text-slate-400'}>Highlight Tag:</span>
                        <span className="font-semibold">{ticker.highlightText || 'None'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isActive ? 'text-emerald-300' : 'text-slate-400'}>Action Link:</span>
                        <span className="font-mono text-[11px] underline">{ticker.linkText || 'None'} ({ticker.linkHref || '/'})</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/20 flex items-center justify-between gap-2">
                    {isActive ? (
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <CheckCircle2 size={15} /> Currently Live on Site
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveTickerId(ticker.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                      >
                        Publish to Storefront
                      </button>
                    )}

                    <button
                      onClick={() => deleteTicker(ticker.id)}
                      disabled={tickers.length <= 1}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        isActive ? 'text-emerald-300 hover:text-white' : 'text-rose-500 hover:bg-rose-50'
                      }`}
                      title="Delete ticker"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. CUSTOMER TRACKING TAB */}
      {/* ========================================================================= */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">
            <div className="relative flex-1 sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search customers by name, company, or email..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-700"
              />
            </div>

            <button
              onClick={() => setShowAddCustomerModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={15} />
              <span>Enroll Client Account</span>
            </button>
          </div>

          {/* Customers Table & Mobile Card View */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            {/* Mobile Card List (Zero Horizontal Scrolling) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredCustomers.map((cust) => (
                <div key={cust.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{cust.name}</h4>
                      <span className="text-[11px] text-slate-500 block truncate">{cust.email}</span>
                      {cust.company && (
                        <span className="text-[10px] text-emerald-800 font-semibold">{cust.company}</span>
                      )}
                    </div>
                    <select
                      value={cust.tier}
                      onChange={(e) => updateCustomerTier(cust.id, e.target.value as CustomerAccount['tier'])}
                      className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-950 border border-amber-200 cursor-pointer shrink-0"
                    >
                      <option value="VIP Client">VIP</option>
                      <option value="Corporate Partner">Corporate</option>
                      <option value="Retail Customer">Retail</option>
                      <option value="Apiary Member">Member</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Orders</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{cust.totalOrders}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Total Spent</span>
                      <span className="font-mono font-bold text-emerald-900 text-xs">
                        ${cust.totalSpent.toFixed(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-medium block">Open Due</span>
                      <span className={`font-mono font-bold text-xs ${cust.outstandingBalance > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {cust.outstandingBalance > 0 ? `$${cust.outstandingBalance.toFixed(0)}` : '$0'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Joined: {cust.joinedDate}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPaymentTargetCustomer(cust);
                          setPaymentAmount(cust.outstandingBalance > 0 ? cust.outstandingBalance : 100);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs transition"
                      >
                        Post Payment
                      </button>
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition"
                        title="View customer dossier"
                      >
                        <Eye size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Client Name &amp; Entity</th>
                    <th className="py-3 px-4">Membership Tier</th>
                    <th className="py-3 px-4">Enrolled Since</th>
                    <th className="py-3 px-4">Order Volume</th>
                    <th className="py-3 px-4">Cumulative Spend</th>
                    <th className="py-3 px-4">Open Balance</th>
                    <th className="py-3 px-4 text-right">Account Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block text-sm">{cust.name}</span>
                        <span className="text-[11px] text-slate-500 block">{cust.email}</span>
                        {cust.company && (
                          <span className="text-[10px] text-emerald-800 font-semibold block">{cust.company}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={cust.tier}
                          onChange={(e) => updateCustomerTier(cust.id, e.target.value as CustomerAccount['tier'])}
                          className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-950 border border-amber-200 cursor-pointer"
                        >
                          <option value="VIP Client">VIP Client</option>
                          <option value="Corporate Partner">Corporate Partner</option>
                          <option value="Retail Customer">Retail Customer</option>
                          <option value="Apiary Member">Apiary Member</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono">
                        {cust.joinedDate}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900">{cust.totalOrders} Orders</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-950">
                        ${cust.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        {cust.outstandingBalance > 0 ? (
                          <span className="text-rose-600 font-bold">
                            ${cust.outstandingBalance.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-semibold">Settled</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setPaymentTargetCustomer(cust);
                              setPaymentAmount(cust.outstandingBalance > 0 ? cust.outstandingBalance : 100);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-[11px] transition cursor-pointer"
                          >
                            Post Payment
                          </button>
                          <button
                            onClick={() => setSelectedCustomer(cust)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                            title="View customer dossier"
                          >
                            <Eye size={15} />
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
      )}

      {/* ========================================================================= */}
      {/* 6. ACCOUNTS & FINANCIAL LEDGER TAB */}
      {/* ========================================================================= */}
      {activeTab === 'accounts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Accounts Receivable</span>
              <p className="font-mono text-3xl font-extrabold text-rose-600">
                ${metrics.receivablesPending.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500">Corporate invoices awaiting Net-30 remittance.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Realized Gross Margin</span>
              <p className="font-mono text-3xl font-extrabold text-emerald-950">
                {metrics.totalRevenue > 0 ? (((metrics.grossProfit) / metrics.totalRevenue) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-slate-500">Calculated after cold-extraction harvest cost of goods.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Inventory Liquidity</span>
              <p className="font-mono text-3xl font-extrabold text-slate-900">
                ${metrics.inventoryAssetValue.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-slate-500">Total cost basis of honey jars and apiary hardware in stock.</p>
            </div>
          </div>

          {/* Accounts Tracking Table & Mobile Card View */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Corporate Credit Line &amp; Ledger Directory
            </h3>

            {/* Mobile Card List (Zero Horizontal Scrolling) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {customers.map((c) => {
                const available = Math.max(0, c.creditLimit - c.outstandingBalance);
                return (
                  <div key={c.id} className="py-4 space-y-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{c.name}</span>
                        <span className="text-[11px] text-slate-400 block">{c.company || c.email}</span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {c.tier === 'Corporate Partner' ? 'Net-30' : 'Due on Dispatch'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Credit Limit</span>
                        <span className="font-mono font-bold text-slate-800 text-xs">
                          ${c.creditLimit >= 1000 ? `${(c.creditLimit / 1000).toFixed(1)}k` : c.creditLimit}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Due</span>
                        <span className={`font-mono font-bold text-xs ${c.outstandingBalance > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                          ${c.outstandingBalance.toFixed(0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-medium block">Available</span>
                        <span className="font-mono font-bold text-emerald-800 text-xs">
                          ${available >= 1000 ? `${(available / 1000).toFixed(1)}k` : available.toFixed(0)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-1">
                      <button
                        onClick={() => {
                          setPaymentTargetCustomer(c);
                          setPaymentAmount(c.outstandingBalance > 0 ? c.outstandingBalance : 500);
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs transition"
                      >
                        Record Settlement
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Entity</th>
                    <th className="py-3 px-4">Credit Limit</th>
                    <th className="py-3 px-4">Outstanding Due</th>
                    <th className="py-3 px-4">Available Credit</th>
                    <th className="py-3 px-4">Payment Terms</th>
                    <th className="py-3 px-4 text-right">Ledger Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customers.map((c) => {
                    const available = Math.max(0, c.creditLimit - c.outstandingBalance);
                    return (
                      <tr key={c.id} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block">{c.name}</span>
                          <span className="text-[11px] text-slate-400 block">{c.company || c.email}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                          ${c.creditLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold">
                          {c.outstandingBalance > 0 ? (
                            <span className="text-rose-600">${c.outstandingBalance.toFixed(2)}</span>
                          ) : (
                            <span className="text-emerald-700">$0.00</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-800 font-semibold">
                          ${available.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {c.tier === 'Corporate Partner' ? 'Net-30 Invoice' : 'Due Upon Dispatch'}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setPaymentTargetCustomer(c);
                              setPaymentAmount(c.outstandingBalance > 0 ? c.outstandingBalance : 500);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-[11px] transition cursor-pointer"
                          >
                            Record Settlement
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW CATALOG ITEM */}
      {/* ========================================================================= */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl my-auto max-h-[92vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">Catalog New Atelier Item</h3>
                <p className="text-[11px] text-slate-500">Add reserve harvest or supply stock directly to store ledger</p>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProduct({
                  name: newProdForm.name,
                  subtitle: newProdForm.subtitle,
                  department: newProdForm.department,
                  subcategory: newProdForm.subcategory,
                  price: Number(newProdForm.price),
                  costPrice: Number(newProdForm.costPrice),
                  stockCount: Number(newProdForm.stockCount),
                  lowStockThreshold: Number(newProdForm.lowStockThreshold),
                  locationBin: newProdForm.locationBin,
                  description: newProdForm.description,
                  imageUrl: newProdForm.imageUrl || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
                  materials: newProdForm.materials,
                  details: newProdForm.details,
                  rating: 5.0,
                  reviewsCount: 1,
                  inStock: Number(newProdForm.stockCount) > 0,
                });
                setShowAddProductModal(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProdForm.name}
                  onChange={(e) => setNewProdForm({ ...newProdForm, name: e.target.value })}
                  placeholder="e.g. Basswood Forest Blossom Reserve"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-700 focus:outline-hidden text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Tasting Summary</label>
                <input
                  type="text"
                  required
                  value={newProdForm.subtitle}
                  onChange={(e) => setNewProdForm({ ...newProdForm, subtitle: e.target.value })}
                  placeholder="e.g. Minted herbal notes & light golden amber clarity"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-700 focus:outline-hidden text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={newProdForm.department}
                    onChange={(e) => {
                      const dept = e.target.value as Department;
                      setNewProdForm({
                        ...newProdForm,
                        department: dept,
                        subcategory: dept === 'honey' ? 'honey-raw' : 'bee-apparel',
                      });
                    }}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  >
                    <option value="honey">Honey Products</option>
                    <option value="beekeeping">Beekeeping Supplies</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subcategory</label>
                  <select
                    value={newProdForm.subcategory}
                    onChange={(e) => setNewProdForm({ ...newProdForm, subcategory: e.target.value as Subcategory })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  >
                    {newProdForm.department === 'honey'
                      ? HONEY_SUBCATEGORIES.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))
                      : BEEKEEPING_SUBCATEGORIES.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProdForm.price}
                    onChange={(e) => setNewProdForm({ ...newProdForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cost Basis ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProdForm.costPrice}
                    onChange={(e) => setNewProdForm({ ...newProdForm, costPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newProdForm.stockCount}
                    onChange={(e) => setNewProdForm({ ...newProdForm, stockCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Storage Location Bin</label>
                <input
                  type="text"
                  required
                  value={newProdForm.locationBin}
                  onChange={(e) => setNewProdForm({ ...newProdForm, locationBin: e.target.value })}
                  placeholder="e.g. SUS-BAY-B-3"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-medium"
                />
              </div>

              {/* Product Photo Upload (from system file) */}
              <div>
                <label className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
                  <span>Product Image Upload</span>
                  <span className="text-[10px] text-slate-400 font-normal">System file (PNG, JPG, WEBP)</span>
                </label>

                {/* Hidden standard file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />

                {newProdForm.imageUrl ? (
                  <div className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 flex items-center gap-3.5">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 shadow-2xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={newProdForm.imageUrl}
                        alt="Product Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
                        <span className="truncate">{uploadedFileName || 'Image selected from system'}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Ready to save with product catalog entry</p>
                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[11px] font-bold text-emerald-900 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Upload size={12} />
                          <span>Change File</span>
                        </button>
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewProdForm((prev) => ({ ...prev, imageUrl: '' }));
                            setUploadedFileName('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setUploadDragActive(true);
                    }}
                    onDragLeave={() => setUploadDragActive(false)}
                    onDrop={handleDropFile}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                      uploadDragActive 
                        ? 'border-emerald-600 bg-emerald-50/80' 
                        : 'border-slate-300 hover:border-emerald-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center">
                      <Upload size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">
                        Upload image file from device
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Click to browse local files or drop photo here
                      </span>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium mt-0.5">
                      Select file from your device
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  value={newProdForm.description}
                  onChange={(e) => setNewProdForm({ ...newProdForm, description: e.target.value })}
                  placeholder="Artisanal provenance, extraction temperature, botanical notes..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold transition cursor-pointer shadow-sm text-center"
                >
                  Save &amp; Stock Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT PRODUCT PARAMETERS */}
      {/* ========================================================================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Update Stock &amp; Pricing</h3>
                <p className="text-[11px] text-slate-500">Modify live inventory levels, location bin, or photo</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm leading-snug">{editingProduct.name}</span>
                <span className="text-slate-500 font-mono text-[11px]">SKU: {editingProduct.id}</span>
              </div>

              {/* Photo Upload for Edit Product */}
              <div>
                <label className="font-bold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>Product Image</span>
                  <span className="text-[10px] text-slate-400 font-normal">File from system</span>
                </label>
                <input
                  ref={editFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageFileUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={editingProduct.imageUrl}
                      alt={editingProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="text-xs font-bold text-emerald-900 hover:underline cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload size={13} />
                      <span>Upload New System File</span>
                    </button>
                    <p className="text-[10px] text-slate-400 mt-0.5">Click to replace photo from your device</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Retail Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cost Basis ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.costPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, costPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Stock (Units)</label>
                  <input
                    type="number"
                    value={editingProduct.stockCount}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location Bin</label>
                  <input
                    type="text"
                    value={editingProduct.locationBin || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, locationBin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateProductDetails(editingProduct.id, editingProduct);
                    setEditingProduct(null);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-center shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW TICKER / ALERT */}
      {/* ========================================================================= */}
      {showAddTickerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">Configure New Ticker</h3>
              <button
                onClick={() => setShowAddTickerModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTicker({
                  text: newTickerForm.text,
                  highlightText: newTickerForm.highlightText,
                  linkText: newTickerForm.linkText,
                  linkHref: newTickerForm.linkHref,
                  type: newTickerForm.type,
                  priority: Number(newTickerForm.priority),
                  active: newTickerForm.active,
                });
                setShowAddTickerModal(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ticker Message Text</label>
                <textarea
                  required
                  rows={2}
                  value={newTickerForm.text}
                  onChange={(e) => setNewTickerForm({ ...newTickerForm, text: e.target.value })}
                  placeholder="e.g. Free insured courier dispatch on all orders placed today."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-700 focus:outline-hidden text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Highlight Tag</label>
                  <input
                    type="text"
                    value={newTickerForm.highlightText}
                    onChange={(e) => setNewTickerForm({ ...newTickerForm, highlightText: e.target.value })}
                    placeholder="e.g. Apiary Notice"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ticker Type</label>
                  <select
                    value={newTickerForm.type}
                    onChange={(e) => setNewTickerForm({ ...newTickerForm, type: e.target.value as SiteTicker['type'] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="seasonal">Seasonal Harvest</option>
                    <option value="urgent">Urgent Notice</option>
                    <option value="exclusive">Exclusive / VIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Action Button Text</label>
                  <input
                    type="text"
                    value={newTickerForm.linkText}
                    onChange={(e) => setNewTickerForm({ ...newTickerForm, linkText: e.target.value })}
                    placeholder="e.g. Shop Now"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Action Destination Link</label>
                  <input
                    type="text"
                    value={newTickerForm.linkHref}
                    onChange={(e) => setNewTickerForm({ ...newTickerForm, linkHref: e.target.value })}
                    placeholder="e.g. /honey or /corporate"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activateNow"
                  checked={newTickerForm.active}
                  onChange={(e) => setNewTickerForm({ ...newTickerForm, active: e.target.checked })}
                  className="rounded-sm text-emerald-800 focus:ring-emerald-700 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="activateNow" className="font-bold text-slate-800 cursor-pointer select-none">
                  Activate &amp; broadcast on storefront immediately
                </label>
              </div>

              <div className="pt-3 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTickerModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold shadow-sm text-center cursor-pointer"
                >
                  Create Ticker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ENROLL NEW CUSTOMER */}
      {/* ========================================================================= */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full space-y-4 shadow-2xl my-auto max-h-[92vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900">Enroll Client Dossier</h3>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addCustomer({
                  name: newCustForm.name,
                  email: newCustForm.email,
                  phone: newCustForm.phone,
                  company: newCustForm.company,
                  tier: newCustForm.tier,
                  status: 'active',
                  outstandingBalance: 0,
                  creditLimit: Number(newCustForm.creditLimit),
                  notes: newCustForm.notes,
                });
                setShowAddCustomerModal(false);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={newCustForm.name}
                  onChange={(e) => setNewCustForm({ ...newCustForm, name: e.target.value })}
                  placeholder="e.g. Lord Charles Kensington"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newCustForm.email}
                    onChange={(e) => setNewCustForm({ ...newCustForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telephone</label>
                  <input
                    type="text"
                    value={newCustForm.phone}
                    onChange={(e) => setNewCustForm({ ...newCustForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Corporate Entity</label>
                  <input
                    type="text"
                    value={newCustForm.company}
                    onChange={(e) => setNewCustForm({ ...newCustForm, company: e.target.value })}
                    placeholder="e.g. Kensington Wealth"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Membership Tier</label>
                  <select
                    value={newCustForm.tier}
                    onChange={(e) => setNewCustForm({ ...newCustForm, tier: e.target.value as CustomerAccount['tier'] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium"
                  >
                    <option value="VIP Client">VIP Client</option>
                    <option value="Corporate Partner">Corporate Partner</option>
                    <option value="Retail Customer">Retail Customer</option>
                    <option value="Apiary Member">Apiary Member</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Credit Limit ($)</label>
                <input
                  type="number"
                  value={newCustForm.creditLimit}
                  onChange={(e) => setNewCustForm({ ...newCustForm, creditLimit: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 font-semibold"
                />
              </div>

              <div className="pt-3 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold shadow-sm text-center cursor-pointer"
                >
                  Save Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: RECORD PAYMENT SETTLEMENT */}
      {/* ========================================================================= */}
      {paymentTargetCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-2xl my-auto text-left">
            <h3 className="font-serif text-lg font-bold text-slate-900">Post Ledger Remittance</h3>
            <p className="text-xs text-slate-600">
              Record receipt of bank wire or check from <span className="font-bold text-slate-900">{paymentTargetCustomer.name}</span> ({paymentTargetCustomer.company || paymentTargetCustomer.email}).
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                <span>Current Balance Due:</span>
                <span className="font-bold text-rose-600">${paymentTargetCustomer.outstandingBalance.toFixed(2)}</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Amount Received ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm font-bold text-emerald-950"
                />
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-2">
                <button
                  onClick={() => setPaymentTargetCustomer(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    recordCustomerPayment(paymentTargetCustomer.id, paymentAmount);
                    setPaymentTargetCustomer(null);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold shadow-sm text-center cursor-pointer"
                >
                  Apply Settlement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ORDER DETAILS / PACKING SLIP */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl my-auto max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">PACKING SLIP &amp; MANIFEST</span>
                <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-slate-900">Order {selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer transition"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">Recipient Address</span>
                  <p className="font-bold text-slate-900">{selectedOrder.customerName}</p>
                  {selectedOrder.customerCompany && <p className="text-slate-600">{selectedOrder.customerCompany}</p>}
                  <p className="text-slate-600">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-slate-600">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-0.5">Dispatch Meta</span>
                  <p><span className="text-slate-500">Date:</span> <span className="font-mono font-semibold">{selectedOrder.date}</span></p>
                  <p><span className="text-slate-500">Status:</span> <span className="font-bold text-emerald-900 uppercase">{selectedOrder.status}</span></p>
                  <p><span className="text-slate-500">Payment:</span> <span className="font-bold text-emerald-900 uppercase">{selectedOrder.paymentStatus}</span></p>
                  {selectedOrder.trackingCode && (
                    <p><span className="text-slate-500">Tracking:</span> <span className="font-mono font-bold text-slate-800">{selectedOrder.trackingCode}</span></p>
                  )}
                </div>
              </div>

              {/* Items Manifest */}
              <div className="space-y-2">
                <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">Enclosed Products:</span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-slate-900 block truncate">{it.name}</span>
                        {it.finish && <span className="text-slate-500 block text-[11px]">{it.finish}</span>}
                        {it.customNote && <span className="text-amber-800 font-semibold block text-[11px]">Note: &ldquo;{it.customNote}&rdquo;</span>}
                      </div>
                      <div className="text-right font-mono shrink-0">
                        <span className="font-bold text-slate-900">{it.quantity}x</span> @ ${it.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-1 text-right font-mono">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Insured Courier:</span>
                  <span>{selectedOrder.shipping === 0 ? 'FREE' : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Remitted:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer text-center"
                >
                  Close Manifest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
