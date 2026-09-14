'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, PRODUCTS as INITIAL_PRODUCTS, Department, Subcategory } from '@/lib/products';

export interface InventoryItem extends ProductItem {
  stockCount: number;
  lowStockThreshold: number;
  costPrice: number;
  locationBin: string;
  batchNumber?: string;
  lastRestockedDate?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  finish?: string;
  customNote?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingCode?: string;
  notes?: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  tier: 'VIP Client' | 'Corporate Partner' | 'Retail Customer' | 'Apiary Member';
  status: 'active' | 'archived' | 'pending_verification';
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  outstandingBalance: number;
  creditLimit: number;
  notes?: string;
}

export interface SiteTicker {
  id: string;
  text: string;
  highlightText?: string;
  linkText?: string;
  linkHref?: string;
  active: boolean;
  type: 'announcement' | 'urgent' | 'seasonal' | 'exclusive';
  priority: number;
}

export interface FinancialMetric {
  totalRevenue: number;
  grossProfit: number;
  ordersCount: number;
  averageOrderValue: number;
  receivablesPending: number;
  inventoryAssetValue: number;
}

interface AdminContextType {
  inventory: InventoryItem[];
  orders: Order[];
  customers: CustomerAccount[];
  tickers: SiteTicker[];
  activeTicker: SiteTicker | null;
  // Inventory actions
  updateStock: (productId: string, newStock: number) => void;
  updateProductDetails: (productId: string, updates: Partial<InventoryItem>) => void;
  addProduct: (product: Omit<InventoryItem, 'id'>) => void;
  deleteProduct: (productId: string) => void;
  // Orders & Sales actions
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingCode?: string) => void;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void;
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  // Customer & Account actions
  updateCustomerTier: (customerId: string, tier: CustomerAccount['tier']) => void;
  updateCustomerAccount: (customerId: string, updates: Partial<CustomerAccount>) => void;
  addCustomer: (customer: Omit<CustomerAccount, 'id' | 'joinedDate' | 'totalOrders' | 'totalSpent'>) => void;
  recordCustomerPayment: (customerId: string, amount: number) => void;
  // Ticker actions
  updateTicker: (tickerId: string, updates: Partial<SiteTicker>) => void;
  addTicker: (ticker: Omit<SiteTicker, 'id'>) => void;
  deleteTicker: (tickerId: string) => void;
  setActiveTickerId: (tickerId: string) => void;
  // Reset demo
  resetToDefaults: () => void;
  // Metrics
  metrics: FinancialMetric;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const INVENTORY_STORAGE_KEY = 'avenoir_admin_inventory_v1';
const ORDERS_STORAGE_KEY = 'avenoir_admin_orders_v1';
const CUSTOMERS_STORAGE_KEY = 'avenoir_admin_customers_v1';
const TICKERS_STORAGE_KEY = 'avenoir_admin_tickers_v1';

// Initial Mock Inventory populated from core catalog
const INITIAL_INVENTORY: InventoryItem[] = INITIAL_PRODUCTS.map((prod, index) => ({
  ...prod,
  stockCount: index === 0 ? 12 : index === 1 ? 4 : index === 2 ? 48 : index === 7 ? 0 : 35 + ((index * 7) % 30),
  lowStockThreshold: 10,
  costPrice: Number((prod.price * 0.38).toFixed(2)),
  locationBin: `SUS-BAY-${String.fromCharCode(65 + (index % 6))}-${(index % 12) + 1}`,
  batchNumber: `AV-2026-${100 + index}`,
  lastRestockedDate: '2026-08-28',
}));

// Initial Mock Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AV-94281',
    customerName: 'Eleanor Vance-Sterling',
    customerEmail: 'eleanor@vancestirling.com',
    customerCompany: 'Vance Capital Partners',
    items: [
      {
        productId: 'AV-BOX-WALNUT',
        name: 'The Estate Walnut Tri-Vault',
        quantity: 3,
        price: 185.00,
        finish: 'Satin Walnut Lacquer',
        customNote: 'Compliments of Vance Capital',
      },
      {
        productId: 'AV-COMB-FLIGHT',
        name: 'Wildflower Edible Comb Flight',
        quantity: 2,
        price: 68.00,
      }
    ],
    subtotal: 691.00,
    tax: 45.80,
    shipping: 0,
    total: 736.80,
    status: 'delivered',
    paymentStatus: 'paid',
    date: '2026-09-11 14:32',
    shippingAddress: {
      street: '740 Park Avenue, Penthouse B',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States',
    },
    trackingCode: 'FDX-994829174US',
    notes: 'Hand-couriered to executive suite.',
  },
  {
    id: 'ord-1002',
    orderNumber: 'AV-94282',
    customerName: 'Dr. Harrison Hayes',
    customerEmail: 'hhayes@princetonbio.edu',
    customerCompany: 'Princeton Apiary Labs',
    items: [
      {
        productId: 'AV-BEE-SUIT',
        name: 'Pro-Vent 3-Layer Apiary Suit',
        quantity: 2,
        price: 195.00,
        finish: 'Size: L (Round Veil)',
      },
      {
        productId: 'AV-BEE-SMOKER',
        name: 'Heritage Bellows Smoker',
        quantity: 2,
        price: 54.00,
      }
    ],
    subtotal: 498.00,
    tax: 33.10,
    shipping: 0,
    total: 531.10,
    status: 'shipped',
    paymentStatus: 'paid',
    date: '2026-09-12 09:15',
    shippingAddress: {
      street: '42 College Road West',
      city: 'Princeton',
      state: 'NJ',
      postalCode: '08540',
      country: 'United States',
    },
    trackingCode: 'UPS-1Z998234882',
    notes: 'Institutional research tax exemption applied.',
  },
  {
    id: 'ord-1003',
    orderNumber: 'AV-94283',
    customerName: 'Marcus Aurelius Sterling',
    customerEmail: 'msterling@apexholdings.co',
    customerCompany: 'Apex Global Wealth',
    items: [
      {
        productId: 'AV-CHEST-MAPLE',
        name: 'The Monogram Maple Tasting Trunk',
        quantity: 8,
        price: 260.00,
        customNote: 'Custom Brass Monogram: APEX-2026',
      }
    ],
    subtotal: 2080.00,
    tax: 138.20,
    shipping: 0,
    total: 2218.20,
    status: 'processing',
    paymentStatus: 'pending',
    date: '2026-09-13 16:48',
    shippingAddress: {
      street: '100 Financial Way, 44th Floor',
      city: 'Boston',
      state: 'MA',
      postalCode: '02110',
      country: 'United States',
    },
    notes: 'Net-30 invoice term for corporate gifting account.',
  },
  {
    id: 'ord-1004',
    orderNumber: 'AV-94284',
    customerName: 'Clara Delacroix',
    customerEmail: 'clara.delacroix@artisanbakes.com',
    items: [
      {
        productId: 'AV-JAR-SOURWOOD',
        name: 'Appalachian Sourwood Reserve (32oz)',
        quantity: 4,
        price: 58.00,
      },
      {
        productId: 'AV-JAR-ORANGE',
        name: 'Citrus Blossom Raw Honey',
        quantity: 3,
        price: 38.00,
      }
    ],
    subtotal: 346.00,
    tax: 23.00,
    shipping: 0,
    total: 369.00,
    status: 'pending',
    paymentStatus: 'paid',
    date: '2026-09-14 01:20',
    shippingAddress: {
      street: '18 Walnut Grove Terrace',
      city: 'Philadelphia',
      state: 'PA',
      postalCode: '19106',
      country: 'United States',
    },
    notes: 'Requested fragile label on all jars.',
  }
];

// Initial Mock Customers with Accounts
const INITIAL_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'cust-1',
    name: 'Eleanor Vance-Sterling',
    email: 'eleanor@vancestirling.com',
    phone: '+1 (212) 849-2041',
    company: 'Vance Capital Partners',
    tier: 'VIP Client',
    status: 'active',
    joinedDate: '2025-04-14',
    totalOrders: 6,
    totalSpent: 4890.00,
    outstandingBalance: 0,
    creditLimit: 15000.00,
    notes: 'Prefers walnut chest presentation with dark wax seals.',
  },
  {
    id: 'cust-2',
    name: 'Marcus Aurelius Sterling',
    email: 'msterling@apexholdings.co',
    phone: '+1 (617) 502-9901',
    company: 'Apex Global Wealth',
    tier: 'Corporate Partner',
    status: 'active',
    joinedDate: '2025-08-20',
    totalOrders: 14,
    totalSpent: 18450.00,
    outstandingBalance: 2218.20,
    creditLimit: 30000.00,
    notes: 'Quarterly gift vaults for top-tier family office clients.',
  },
  {
    id: 'cust-3',
    name: 'Dr. Harrison Hayes',
    email: 'hhayes@princetonbio.edu',
    phone: '+1 (609) 258-3000',
    company: 'Princeton Apiary Labs',
    tier: 'Apiary Member',
    status: 'active',
    joinedDate: '2025-11-05',
    totalOrders: 4,
    totalSpent: 1680.00,
    outstandingBalance: 0,
    creditLimit: 5000.00,
    notes: 'Consults on Sussex County botanical pollen tracking.',
  },
  {
    id: 'cust-4',
    name: 'Clara Delacroix',
    email: 'clara.delacroix@artisanbakes.com',
    phone: '+1 (215) 609-1122',
    company: 'Delacroix Pâtisserie',
    tier: 'Retail Customer',
    status: 'active',
    joinedDate: '2026-02-18',
    totalOrders: 3,
    totalSpent: 875.00,
    outstandingBalance: 0,
    creditLimit: 1000.00,
    notes: 'Orders raw honeycomb slabs and seasonal creamed jars.',
  },
  {
    id: 'cust-5',
    name: 'Julian Thorne',
    email: 'jthorne@thorne-estates.co.uk',
    phone: '+44 20 7946 0912',
    company: 'Thorne Architecture & Estates',
    tier: 'VIP Client',
    status: 'active',
    joinedDate: '2026-05-12',
    totalOrders: 2,
    totalSpent: 1240.00,
    outstandingBalance: 450.00,
    creditLimit: 10000.00,
    notes: 'Requested custom brass nameplate engraving.',
  }
];

// Initial Site Banners / Tickers
const INITIAL_TICKERS: SiteTicker[] = [
  {
    id: 'tick-1',
    text: 'Complimentary Insured Courier on Orders Over $150 & All Heirloom Vaults',
    highlightText: 'Sussex County Apiary',
    linkText: 'Corporate Concierge',
    linkHref: '/corporate',
    active: true,
    type: 'announcement',
    priority: 1,
  },
  {
    id: 'tick-2',
    text: 'Limited Autumn Wildflower Comb Harvest now releasing — only 80 jars remaining.',
    highlightText: 'Fresh Extraction',
    linkText: 'Reserve Reserve Jars',
    linkHref: '/honey?sub=honey-raw',
    active: false,
    type: 'seasonal',
    priority: 2,
  },
  {
    id: 'tick-3',
    text: 'Corporate Holiday Gifting Concierge: Reserve custom monogrammed trunks before October 15th.',
    highlightText: 'Executive Vaults',
    linkText: 'Inquire Concierge',
    linkHref: '/corporate',
    active: false,
    type: 'exclusive',
    priority: 3,
  }
];

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_INVENTORY;
    try {
      const saved = localStorage.getItem(INVENTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_INVENTORY;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ORDERS;
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  // Customers State
  const [customers, setCustomers] = useState<CustomerAccount[]>(() => {
    if (typeof window === 'undefined') return INITIAL_CUSTOMERS;
    try {
      const saved = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_CUSTOMERS;
  });

  // Tickers State
  const [tickers, setTickers] = useState<SiteTicker[]>(() => {
    if (typeof window === 'undefined') return INITIAL_TICKERS;
    try {
      const saved = localStorage.getItem(TICKERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_TICKERS;
  });

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
    } catch {}
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
    } catch {}
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(TICKERS_STORAGE_KEY, JSON.stringify(tickers));
    } catch {}
  }, [tickers]);

  // Active Ticker derived
  const activeTicker = tickers.find((t) => t.active) || tickers[0] || null;

  // Inventory Management
  const updateStock = (productId: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, stockCount: Math.max(0, newStock), inStock: newStock > 0 }
          : item
      )
    );
  };

  const updateProductDetails = (productId: string, updates: Partial<InventoryItem>) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, ...updates } : item))
    );
  };

  const addProduct = (newProduct: Omit<InventoryItem, 'id'>) => {
    const id = `AV-MANUAL-${Date.now()}`;
    const item: InventoryItem = {
      ...newProduct,
      id,
    };
    setInventory((prev) => [item, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== productId));
  };

  // Orders Management
  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingCode?: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, ...(trackingCode ? { trackingCode } : {}) } : o))
    );
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus } : o))
    );
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>): Order => {
    const id = `ord-${Date.now()}`;
    const orderNumber = `AV-${Math.floor(10000 + Math.random() * 90000)}`;
    const date = new Date().toISOString().replace('T', ' ').slice(0, 16);
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      date,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct inventory
    newOrder.items.forEach((item) => {
      setInventory((prev) =>
        prev.map((inv) =>
          inv.id === item.productId
            ? {
                ...inv,
                stockCount: Math.max(0, inv.stockCount - item.quantity),
                inStock: inv.stockCount - item.quantity > 0,
              }
            : inv
        )
      );
    });

    // Update customer stats if customer exists
    setCustomers((prev) =>
      prev.map((c) =>
        c.email.toLowerCase() === newOrder.customerEmail.toLowerCase()
          ? {
              ...c,
              totalOrders: c.totalOrders + 1,
              totalSpent: c.totalSpent + newOrder.total,
              outstandingBalance:
                newOrder.paymentStatus === 'pending'
                  ? c.outstandingBalance + newOrder.total
                  : c.outstandingBalance,
            }
          : c
      )
    );

    return newOrder;
  };

  // Customer Management
  const updateCustomerTier = (customerId: string, tier: CustomerAccount['tier']) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, tier } : c))
    );
  };

  const updateCustomerAccount = (customerId: string, updates: Partial<CustomerAccount>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, ...updates } : c))
    );
  };

  const addCustomer = (customerData: Omit<CustomerAccount, 'id' | 'joinedDate' | 'totalOrders' | 'totalSpent'>) => {
    const id = `cust-${Date.now()}`;
    const joinedDate = new Date().toISOString().slice(0, 10);
    const newCustomer: CustomerAccount = {
      ...customerData,
      id,
      joinedDate,
      totalOrders: 0,
      totalSpent: 0,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
  };

  const recordCustomerPayment = (customerId: string, amount: number) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId
          ? { ...c, outstandingBalance: Math.max(0, c.outstandingBalance - amount) }
          : c
      )
    );
  };

  // Tickers Management
  const updateTicker = (tickerId: string, updates: Partial<SiteTicker>) => {
    setTickers((prev) =>
      prev.map((t) => (t.id === tickerId ? { ...t, ...updates } : t))
    );
  };

  const addTicker = (tickerData: Omit<SiteTicker, 'id'>) => {
    const id = `tick-${Date.now()}`;
    const newTicker: SiteTicker = {
      ...tickerData,
      id,
    };
    setTickers((prev) => [...prev, newTicker]);
  };

  const deleteTicker = (tickerId: string) => {
    setTickers((prev) => prev.filter((t) => t.id !== tickerId));
  };

  const setActiveTickerId = (tickerId: string) => {
    setTickers((prev) =>
      prev.map((t) => ({
        ...t,
        active: t.id === tickerId,
      }))
    );
  };

  const resetToDefaults = () => {
    setInventory(INITIAL_INVENTORY);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setTickers(INITIAL_TICKERS);
    localStorage.removeItem(INVENTORY_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    localStorage.removeItem(CUSTOMERS_STORAGE_KEY);
    localStorage.removeItem(TICKERS_STORAGE_KEY);
  };

  // Financial Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalCost = orders.reduce((acc, o) => {
    return (
      acc +
      o.items.reduce((itemAcc, item) => {
        const prod = inventory.find((p) => p.id === item.productId);
        const cost = prod ? prod.costPrice : item.price * 0.4;
        return itemAcc + cost * item.quantity;
      }, 0)
    );
  }, 0);
  const grossProfit = totalRevenue - totalCost;
  const ordersCount = orders.length;
  const averageOrderValue = ordersCount > 0 ? totalRevenue / ordersCount : 0;
  const receivablesPending = orders.reduce(
    (acc, o) => acc + (o.paymentStatus === 'pending' ? o.total : 0),
    0
  );
  const inventoryAssetValue = inventory.reduce(
    (acc, item) => acc + item.stockCount * item.costPrice,
    0
  );

  const metrics: FinancialMetric = {
    totalRevenue,
    grossProfit,
    ordersCount,
    averageOrderValue,
    receivablesPending,
    inventoryAssetValue,
  };

  return (
    <AdminContext.Provider
      value={{
        inventory,
        orders,
        customers,
        tickers,
        activeTicker,
        updateStock,
        updateProductDetails,
        addProduct,
        deleteProduct,
        updateOrderStatus,
        updatePaymentStatus,
        createOrder,
        updateCustomerTier,
        updateCustomerAccount,
        addCustomer,
        recordCustomerPayment,
        updateTicker,
        addTicker,
        deleteTicker,
        setActiveTickerId,
        resetToDefaults,
        metrics,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
