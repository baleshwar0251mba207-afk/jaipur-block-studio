import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Package } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import { formatDate, formatPrice } from '../utils/format';

export function OrderConfirmationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { getOrderByNumber } = useStore();

  const order = orderNumber ? getOrderByNumber(orderNumber) : undefined;

  if (!order) {
    return (
      <div className="py-20 bg-[#FAF7F2] min-h-[65vh]">
        <div className="max-w-lg mx-auto px-4 text-center space-y-4 bg-white border border-[#E5DDD0] rounded-xl p-10">
          <h1 className="font-serif text-2xl font-semibold text-[#231F1D]">
            Order Receipt Not Found
          </h1>
          <p className="text-sm text-[#6B5E54]">
            We could not locate order {orderNumber || ''}. You can search your order number in Order Tracking.
          </p>
          <Link
            to="/track-order"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors"
          >
            Go to Order Tracking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-10 space-y-8">
          <div className="space-y-3 pb-6 border-b border-[#EFE7DA]">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-[#1E3A5F]">
              <CheckCircle2 className="w-5 h-5 text-[#1E3A5F]" />
              <span>Demo Order Confirmed · {order.status}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
              Thank You for Your Order, {order.customerName}
            </h1>
            <p className="text-sm text-[#6B5E54]">
              Your demonstration order has been recorded locally. No real payment was charged.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF7F2] p-5 rounded-lg border border-[#E5DDD0] text-sm">
            <div>
              <span className="block text-xs text-[#6B5E54]">Order Number</span>
              <span className="font-mono font-semibold text-[#231F1D]">
                {order.orderNumber}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#6B5E54]">Order Date</span>
              <span className="font-medium text-[#231F1D]">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div>
              <span className="block text-xs text-[#6B5E54]">Current Status</span>
              <span className="font-semibold text-[#B8533A]">{order.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold tracking-wider text-[#6B5E54]">
                Customer &amp; Delivery Address
              </h2>
              <p className="font-medium text-[#231F1D]">{order.customerName}</p>
              <p className="text-[#6B5E54]">{order.customerEmail}</p>
              <p className="text-[#6B5E54]">{order.address}</p>
              <p className="text-[#6B5E54]">
                {order.city}, {order.postcode}
              </p>
              <p className="text-[#6B5E54]">{order.country}</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-xs font-semibold tracking-wider text-[#6B5E54]">
                Payment Summary
              </h2>
              <p className="font-medium text-[#231F1D]">{order.paymentMethod}</p>
              <p className="text-xs text-[#6B5E54]">
                Simulated demonstration payment only.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#EFE7DA]">
            <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
              Items Ordered
            </h2>
            <div className="divide-y divide-[#EFE7DA]">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="py-3.5 flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0] shrink-0">
                    <SmartImage src={item.image} alt={item.productName} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#231F1D]">
                      {item.productName}
                    </p>
                    <p className="text-xs text-[#6B5E54] tabular-nums">
                      {item.pattern} · Qty {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#231F1D] tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E5DDD0] space-y-2 text-sm">
              <div className="flex justify-between text-[#6B5E54]">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#231F1D]">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6B5E54]">
                <span>UK Tracked Delivery</span>
                <span className="tabular-nums text-[#231F1D]">
                  {order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#231F1D] pt-2 border-t border-[#EFE7DA]">
                <span>Total Amount</span>
                <span className="tabular-nums">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to={`/track-order?order=${order.orderNumber}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#1E3A5F] text-white rounded-md hover:bg-[#162C49] transition-colors"
            >
              <Package className="w-4 h-4" />
              <span>Track Order Progress</span>
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 text-sm font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
