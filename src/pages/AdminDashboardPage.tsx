import React, { useState } from 'react';
import {
  Info,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Shield,
  Trash2,
  X,
} from 'lucide-react';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import {
  DEFAULT_UNIT_PRICE,
  STUDIO_IMAGES,
  STUDIO_IMAGE_OPTIONS,
} from '../data/seedData';
import { ColourTone, OrderStatus, PatternCategory, Product } from '../types';
import { formatDate, formatPrice } from '../utils/format';

const ORDER_STATUSES: OrderStatus[] = [
  'Order Placed',
  'Processing',
  'Shipped',
  'Delivered',
];

const PATTERNS: PatternCategory[] = ['Floral', 'Paisley', 'Geometric', 'Botanical'];
const COLOURS: ColourTone[] = ['Terracotta', 'Indigo', 'Mustard', 'Earthy & Cream'];

interface ProductFormState {
  sku: string;
  name: string;
  price: number;
  pattern: PatternCategory;
  colour: ColourTone;
  shortDescription: string;
  description: string;
  fabric: string;
  size: string;
  careInstructions: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
  image: string;
  artisanRegion: string;
}

const EMPTY_FORM: ProductFormState = {
  sku: 'JBS-NEW-09',
  name: '',
  price: DEFAULT_UNIT_PRICE,
  pattern: 'Floral',
  colour: 'Terracotta',
  shortDescription: '',
  description: '',
  fabric: '100% Organic Handloom Cotton (240 GSM), natural dyes, concealed brass zip.',
  size: '45 × 45 cm (18" × 18") — Cushion cover only.',
  careInstructions: 'Gentle cold wash at 30°C. Dry flat in shade.',
  stock: 15,
  inStock: true,
  featured: true,
  image: STUDIO_IMAGES.sanganerFloral,
  artisanRegion: 'Sanganer, Jaipur',
};

export function AdminDashboardPage() {
  const {
    products,
    orders,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDemoStore,
  } = useStore();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState<ProductFormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = loginAdmin(adminEmail, adminPassword);
    if (!res.ok && res.error) {
      setAuthError(res.error);
    }
  };

  const fillDemoAdmin = () => {
    setAdminEmail('admin@jaipurblockstudio.co.uk');
    setAdminPassword('admin2026');
    setAuthError(null);
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="py-14 lg:py-20 bg-[#FAF7F2] min-h-[75vh]">
        <div className="max-w-md mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-11 h-11 rounded-full bg-[#1E3A5F] text-white mx-auto flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-[#1E3A5F]">
              Restricted Store Management
            </p>
            <h1 className="font-serif text-3xl font-semibold text-[#231F1D]">
              Admin Portal Sign In
            </h1>
            <p className="text-sm text-[#6B5E54]">
              Separate demonstration login for managing Jaipur Block Studio inventory, pricing, and orders.
            </p>
          </div>

          <div className="bg-[#F2ECE1] border border-[#D4C8B8] rounded-lg p-4 flex items-start gap-3 text-xs text-[#231F1D]">
            <Info className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p>
                <span className="font-semibold">Demo Evaluator Credentials:</span> admin@jaipurblockstudio.co.uk / admin2026
              </p>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="font-semibold text-[#1E3A5F] underline hover:text-[#B8533A] cursor-pointer"
              >
                Autofill Demo Admin Credentials
              </button>
            </div>
          </div>

          <form
            onSubmit={handleAdminLogin}
            noValidate
            className="bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8 space-y-4"
          >
            {authError && (
              <div
                role="alert"
                className="p-3 rounded-md bg-[#FDF2F0] border border-[#E6B8AE] text-xs text-[#9B412B]"
              >
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-xs font-medium text-[#231F1D]">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@jaipurblockstudio.co.uk"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-xs font-medium text-[#231F1D]">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-medium bg-[#1E3A5F] text-white rounded-md hover:bg-[#162C49] transition-colors cursor-pointer"
            >
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered').length;

  const openAddForm = () => {
    setEditingProductId(null);
    setFormState({
      ...EMPTY_FORM,
      sku: `JBS-CS-${String(products.length + 1).padStart(2, '0')}`,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProductId(product.id);
    setFormState({
      sku: product.sku,
      name: product.name,
      price: product.price,
      pattern: product.pattern,
      colour: product.colour,
      shortDescription: product.shortDescription,
      description: product.description,
      fabric: product.fabric,
      size: product.size,
      careInstructions: product.careInstructions,
      stock: product.stock,
      inStock: product.inStock,
      featured: product.featured,
      image: product.image,
      artisanRegion: product.artisanRegion,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formState.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (formState.price <= 0 || Number.isNaN(formState.price)) {
      setFormError('Price must be greater than zero.');
      return;
    }
    if (!formState.shortDescription.trim()) {
      setFormError('Short description is required.');
      return;
    }

    const sanitized: Omit<Product, 'id'> = {
      ...formState,
      name: formState.name.trim(),
      sku: formState.sku.trim() || 'JBS-CUSTOM',
      shortDescription: formState.shortDescription.trim(),
      description: formState.description.trim() || formState.shortDescription.trim(),
      stock: Math.max(0, Number(formState.stock) || 0),
      inStock: formState.stock > 0 && formState.inStock,
    };

    if (editingProductId) {
      updateProduct(editingProductId, sanitized);
    } else {
      addProduct(sanitized);
    }

    setIsFormOpen(false);
    setEditingProductId(null);
  };

  return (
    <div className="py-10 lg:py-14 bg-[#FAF7F2] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DDD0]">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wider text-[#1E3A5F]">
              Jaipur Block Studio · Store Administration
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
              Merchant Operations Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={resetDemoStore}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border border-[#E5DDD0] bg-white text-[#6B5E54] hover:text-[#231F1D] rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
            <button
              type="button"
              onClick={logoutAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Admin</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-[#E5DDD0] rounded-lg p-5 space-y-1">
            <span className="text-xs font-medium text-[#6B5E54]">Total Sales (Sample + Demo)</span>
            <p className="font-serif text-3xl font-semibold text-[#231F1D] tabular-nums">
              {formatPrice(totalSales)}
            </p>
          </div>

          <div className="bg-white border border-[#E5DDD0] rounded-lg p-5 space-y-1">
            <span className="text-xs font-medium text-[#6B5E54]">Total Orders</span>
            <p className="font-serif text-3xl font-semibold text-[#231F1D] tabular-nums">
              {orders.length}
            </p>
          </div>

          <div className="bg-white border border-[#E5DDD0] rounded-lg p-5 space-y-1">
            <span className="text-xs font-medium text-[#6B5E54]">Total Products</span>
            <p className="font-serif text-3xl font-semibold text-[#231F1D] tabular-nums">
              {products.length}
            </p>
          </div>

          <div className="bg-white border border-[#E5DDD0] rounded-lg p-5 space-y-1">
            <span className="text-xs font-medium text-[#6B5E54]">Orders In Progress</span>
            <p className="font-serif text-3xl font-semibold text-[#B8533A] tabular-nums">
              {pendingOrders}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex p-1 bg-[#F2ECE1] rounded-lg">
            {(
              [
                { id: 'overview', label: 'Overview' },
                { id: 'products', label: `Products (${products.length})` },
                { id: 'orders', label: `Customer Orders (${orders.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#231F1D] shadow-sm'
                    : 'text-[#6B5E54] hover:text-[#231F1D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Cushion Cover</span>
          </button>
        </div>

        {/* Recent Orders Section (Overview & Orders Tab) */}
        {(activeTab === 'overview' || activeTab === 'orders') && (
          <section className="bg-white border border-[#E5DDD0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EFE7DA] flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
                {activeTab === 'overview' ? 'Recent Customer Orders' : 'All Customer Orders'}
              </h2>
              <span className="text-xs text-[#6B5E54]">
                Status updates reflect immediately in Order Tracking
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF7F2] text-xs text-[#6B5E54] border-b border-[#E5DDD0]">
                  <tr>
                    <th className="py-3 px-5 font-medium">Order #</th>
                    <th className="py-3 px-5 font-medium">Date</th>
                    <th className="py-3 px-5 font-medium">Customer</th>
                    <th className="py-3 px-5 font-medium">Items</th>
                    <th className="py-3 px-5 font-medium">Total</th>
                    <th className="py-3 px-5 font-medium">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DA]">
                  {(activeTab === 'overview' ? orders.slice(0, 5) : orders).map((order) => (
                    <tr key={order.orderNumber} className="hover:bg-[#FAF7F2]/60">
                      <td className="py-3.5 px-5 font-mono text-xs font-semibold text-[#231F1D] whitespace-nowrap">
                        {order.orderNumber}
                      </td>
                      <td className="py-3.5 px-5 text-xs text-[#6B5E54] whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-3.5 px-5">
                        <p className="font-medium text-[#231F1D]">{order.customerName}</p>
                        <p className="text-xs text-[#6B5E54]">
                          {order.city}, {order.postcode}
                        </p>
                      </td>
                      <td className="py-3.5 px-5 text-xs text-[#6B5E54] max-w-xs">
                        {order.items
                          .map((i) => `${i.quantity}× ${i.productName}`)
                          .join(', ')}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-[#231F1D] tabular-nums whitespace-nowrap">
                        {formatPrice(order.total)}
                      </td>
                      <td className="py-3.5 px-5">
                        <select
                          aria-label={`Status for order ${order.orderNumber}`}
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.orderNumber,
                              e.target.value as OrderStatus
                            )
                          }
                          className="px-3 py-1.5 text-xs font-medium bg-[#FAF7F2] border border-[#E5DDD0] rounded-md text-[#231F1D] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] cursor-pointer"
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Product Management Section (Overview & Products Tab) */}
        {(activeTab === 'overview' || activeTab === 'products') && (
          <section className="bg-white border border-[#E5DDD0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EFE7DA] flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
                Cushion Cover Catalogue Management
              </h2>
              <span className="text-xs text-[#6B5E54]">
                Edit pricing, stock quantities, or add new block-print designs
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF7F2] text-xs text-[#6B5E54] border-b border-[#E5DDD0]">
                  <tr>
                    <th className="py-3 px-5 font-medium">Product</th>
                    <th className="py-3 px-5 font-medium">Pattern / Colour</th>
                    <th className="py-3 px-5 font-medium">Price (₹)</th>
                    <th className="py-3 px-5 font-medium">Stock Qty</th>
                    <th className="py-3 px-5 font-medium">Availability</th>
                    <th className="py-3 px-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7DA]">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#FAF7F2]/60">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0] shrink-0">
                            <SmartImage src={product.image} alt={product.name} />
                          </div>
                          <div>
                            <p className="font-medium text-[#231F1D]">{product.name}</p>
                            <p className="text-xs font-mono text-[#6B5E54]">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-xs text-[#6B5E54] whitespace-nowrap">
                        {product.pattern} · {product.colour}
                      </td>
                      <td className="py-3.5 px-5">
                        <input
                          type="number"
                          min={100}
                          step={50}
                          aria-label={`Price for ${product.name}`}
                          value={product.price}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val > 0) updateProduct(product.id, { price: val });
                          }}
                          className="w-24 px-2.5 py-1 text-xs font-mono bg-[#FAF7F2] border border-[#E5DDD0] rounded-md tabular-nums"
                        />
                      </td>
                      <td className="py-3.5 px-5">
                        <input
                          type="number"
                          min={0}
                          aria-label={`Stock for ${product.name}`}
                          value={product.stock}
                          onChange={(e) => {
                            const qty = Math.max(0, Number(e.target.value) || 0);
                            updateProduct(product.id, {
                              stock: qty,
                              inStock: qty > 0,
                            });
                          }}
                          className="w-20 px-2.5 py-1 text-xs font-mono bg-[#FAF7F2] border border-[#E5DDD0] rounded-md tabular-nums"
                        />
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() =>
                            updateProduct(product.id, {
                              inStock: !product.inStock,
                              stock: !product.inStock && product.stock === 0 ? 10 : product.stock,
                            })
                          }
                          className={`px-2.5 py-1 text-xs font-medium rounded-md cursor-pointer ${
                            product.inStock && product.stock > 0
                              ? 'bg-[#EAF1F8] text-[#1E3A5F]'
                              : 'bg-[#FDF2F0] text-[#9B412B]'
                          }`}
                        >
                          {product.inStock && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(product)}
                            aria-label={`Edit ${product.name}`}
                            className="p-2 text-[#1E3A5F] hover:bg-[#F2ECE1] rounded-md transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(product.id)}
                            aria-label={`Delete ${product.name}`}
                            className="p-2 text-[#9B412B] hover:bg-[#FDF2F0] rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231F1D]/50"
          role="dialog"
          aria-modal="true"
          aria-label={editingProductId ? 'Edit Product' : 'Add Product'}
        >
          <div className="bg-white border border-[#E5DDD0] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="px-6 py-4 border-b border-[#E5DDD0] flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
                {editingProductId ? 'Edit Cushion Cover' : 'Add New Cushion Cover'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                aria-label="Close modal"
                className="p-2 text-[#6B5E54] hover:text-[#231F1D] rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-md bg-[#FDF2F0] border border-[#E6B8AE] text-xs text-[#9B412B]">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Bagru Marigold Floral Cushion Cover"
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">SKU</label>
                  <input
                    type="text"
                    value={formState.sku}
                    onChange={(e) => setFormState({ ...formState, sku: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-mono bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min={100}
                    step={50}
                    value={formState.price}
                    onChange={(e) =>
                      setFormState({ ...formState, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formState.stock}
                    onChange={(e) => {
                      const stock = Math.max(0, Number(e.target.value) || 0);
                      setFormState({
                        ...formState,
                        stock,
                        inStock: stock > 0,
                      });
                    }}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Pattern
                  </label>
                  <select
                    value={formState.pattern}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        pattern: e.target.value as PatternCategory,
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  >
                    {PATTERNS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Colour Tone
                  </label>
                  <select
                    value={formState.colour}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        colour: e.target.value as ColourTone,
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  >
                    {COLOURS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Product Photography
                  </label>
                  <select
                    value={formState.image}
                    onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  >
                    {STUDIO_IMAGE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Artisan Region
                  </label>
                  <input
                    type="text"
                    value={formState.artisanRegion}
                    onChange={(e) =>
                      setFormState({ ...formState, artisanRegion: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#231F1D]">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formState.shortDescription}
                  onChange={(e) =>
                    setFormState({ ...formState, shortDescription: e.target.value })
                  }
                  placeholder="Concise 1-sentence summary for catalogue cards"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-[#231F1D]">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Fabric &amp; Material
                  </label>
                  <input
                    type="text"
                    value={formState.fabric}
                    onChange={(e) =>
                      setFormState({ ...formState, fabric: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#231F1D]">
                    Size Information
                  </label>
                  <input
                    type="text"
                    value={formState.size}
                    onChange={(e) => setFormState({ ...formState, size: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="inline-flex items-center gap-2 text-xs text-[#231F1D] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.featured}
                    onChange={(e) =>
                      setFormState({ ...formState, featured: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#B8533A]"
                  />
                  <span>Feature on Homepage</span>
                </label>
                <label className="inline-flex items-center gap-2 text-xs text-[#231F1D] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formState.inStock}
                    onChange={(e) =>
                      setFormState({ ...formState, inStock: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#B8533A]"
                  />
                  <span>Available for Purchase</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EFE7DA] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] cursor-pointer"
                >
                  {editingProductId ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
