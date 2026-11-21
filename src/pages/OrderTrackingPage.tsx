import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, PackageCheck, Search, Truck, Clock } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import { formatDate, formatPrice } from '../utils/format';

const STATUS_STEPS: Array<{
  status: OrderStatus;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    status: 'Order Placed',
    description: 'Order received and confirmed by our London desk.',
    icon: Clock,
  },
  {
    status: 'Processing',
    description: 'Cushion covers inspected, pressed, and packed in cotton wraps.',
    icon: PackageCheck,
  },
  {
    status: 'Shipped',
    description: 'Dispatched via tracked courier for UK delivery.',
    icon: Truck,
  },
  {
    status: 'Delivered',
    description: 'Delivered to customer address.',
    icon: Check,
  },
];

export function OrderTrackingPage() {
  const { orders, getOrderByNumber } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('order') || orders[0]?.orderNumber || '';

  const [lookupInput, setLookupInput] = useState(initialQuery);
  const [activeOrderNumber, setActiveOrderNumber] = useState(initialQuery);
  const [notFoundError, setNotFoundError] = useState<string | null>(null);

  useEffect(() => {
    const paramOrder = searchParams.get('order');
    if (paramOrder) {
      setLookupInput(paramOrder);
      setActiveOrderNumber(paramOrder);
      setNotFoundError(null);
    }
  }, [searchParams]);

  const activeOrder = activeOrderNumber ? getOrderByNumber(activeOrderNumber) : undefined;
  const activeStepIndex = activeOrder
    ? STATUS_STEPS.findIndex((s) => s.status === activeOrder.status)
    : -1;

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = lookupInput.trim().toUpperCase();
    if (!cleaned) {
      setNotFoundError('Please enter an order number such as JBS-2026-1041.');
      return;
    }
    const found = getOrderByNumber(cleaned);
    if (!found) {
      setNotFoundError(`No order found matching "${cleaned}".`);
      setActiveOrderNumber('');
      return;
    }
    setNotFoundError(null);
    setActiveOrderNumber(found.orderNumber);
    setSearchParams({ order: found.orderNumber });
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2] min-h-[75vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
            Customer Order Tracking
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
            Track Your Cushion Cover Delivery
          </h1>
          <p className="text-sm sm:text-base text-[#6B5E54]">
            Enter your Jaipur Block Studio order number below or select a sample order to view live fulfilment status.
          </p>
        </div>

        {/* Lookup Bar + Quick Sample Selector */}
        <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5">
          <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#6B5E54] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="order-lookup" className="sr-only">
                Order number
              </label>
              <input
                id="order-lookup"
                type="text"
                value={lookupInput}
                onChange={(e) => setLookupInput(e.target.value)}
                placeholder="Enter order number (e.g. JBS-2026-1042)"
                className="w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Track Order
            </button>
          </form>

          {notFoundError && (
            <p className="text-sm text-[#9B412B]">{notFoundError}</p>
          )}

          <div className="pt-3 border-t border-[#EFE7DA] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#6B5E54] mr-1">Available orders:</span>
            {orders.slice(0, 6).map((ord) => {
              const selected = activeOrder?.orderNumber === ord.orderNumber;
              return (
                <button
                  key={ord.orderNumber}
                  type="button"
                  onClick={() => {
                    setLookupInput(ord.orderNumber);
                    setActiveOrderNumber(ord.orderNumber);
                    setNotFoundError(null);
                    setSearchParams({ order: ord.orderNumber });
                  }}
                  className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#1E3A5F] text-white'
                      : 'bg-[#FAF7F2] text-[#231F1D] border border-[#E5DDD0] hover:bg-[#F2ECE1]'
                  }`}
                >
                  {ord.orderNumber} ({ord.status})
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Order Tracker */}
        {activeOrder && (
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8 space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#EFE7DA] text-sm">
              <div>
                <span className="block text-xs text-[#6B5E54]">Order Number</span>
                <span className="font-mono font-semibold text-[#231F1D]">
                  {activeOrder.orderNumber}
                </span>
              </div>
              <div>
                <span className="block text-xs text-[#6B5E54]">Order Date</span>
                <span className="font-medium text-[#231F1D]">
                  {formatDate(activeOrder.createdAt)}
                </span>
              </div>
              <div>
                <span className="block text-xs text-[#6B5E54]">Total Amount</span>
                <span className="font-semibold text-[#231F1D] tabular-nums">
                  {formatPrice(activeOrder.total)}
                </span>
              </div>
              <div>
                <span className="block text-xs text-[#6B5E54]">Current Status</span>
                <span className="font-semibold text-[#B8533A]">
                  {activeOrder.status}
                </span>
              </div>
            </div>

            {/* Visual Progress Tracker */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
                Fulfilment Progress
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {STATUS_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index < activeStepIndex;
                  const isCurrent = index === activeStepIndex;
                  const isReached = index <= activeStepIndex;

                  return (
                    <div
                      key={step.status}
                      className={`p-4 rounded-lg border transition-colors ${
                        isCurrent
                          ? 'bg-[#FAF7F2] border-[#B8533A]'
                          : isCompleted
                          ? 'bg-[#F4F7FA] border-[#1E3A5F]/40'
                          : 'bg-white border-[#E5DDD0] opacity-65'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCurrent
                              ? 'bg-[#B8533A] text-white'
                              : isCompleted
                              ? 'bg-[#1E3A5F] text-white'
                              : 'bg-[#F2ECE1] text-[#6B5E54]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-medium text-[#6B5E54]">
                          {isCurrent
                            ? 'Current Stage'
                            : isCompleted
                            ? 'Completed'
                            : 'Pending'}
                        </span>
                      </div>
                      <h3
                        className={`text-sm font-semibold ${
                          isReached ? 'text-[#231F1D]' : 'text-[#6B5E54]'
                        }`}
                      >
                        {step.status}
                      </h3>
                      <p className="text-xs text-[#6B5E54] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Products Ordered & Delivery Destination */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#EFE7DA]">
              <div className="lg:col-span-8 space-y-3">
                <h3 className="text-xs font-semibold tracking-wider text-[#6B5E54]">
                  Products Ordered
                </h3>
                <div className="divide-y divide-[#EFE7DA] border border-[#E5DDD0] rounded-lg px-4">
                  {activeOrder.items.map((item) => (
                    <div
                      key={item.productId}
                      className="py-3.5 flex items-center gap-4"
                    >
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0] shrink-0">
                        <SmartImage src={item.image} alt={item.productName} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#231F1D] truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-[#6B5E54] tabular-nums">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-[#231F1D] tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2 text-sm bg-[#FAF7F2] p-5 rounded-lg border border-[#E5DDD0]">
                <h3 className="text-xs font-semibold tracking-wider text-[#6B5E54]">
                  Delivery Destination
                </h3>
                <p className="font-semibold text-[#231F1D]">
                  {activeOrder.customerName}
                </p>
                <p className="text-[#6B5E54]">{activeOrder.address}</p>
                <p className="text-[#6B5E54]">
                  {activeOrder.city}, {activeOrder.postcode}
                </p>
                <p className="text-[#6B5E54]">{activeOrder.country}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
