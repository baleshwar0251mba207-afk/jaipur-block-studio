import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Info, ShieldCheck } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import { formatPrice, validateEmail } from '../utils/format';

export function CheckoutPage() {
  const { cartDetails, subtotal, shipping, total, currentUser, placeOrder } = useStore();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(currentUser?.city || 'London');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [paymentMethod, setPaymentMethod] = useState<
    'Demo Card Payment' | 'Demo Bank Transfer'
  >('Demo Card Payment');
  const [error, setError] = useState<string | null>(null);

  if (cartDetails.length === 0) {
    return (
      <div className="py-20 bg-[#FAF7F2] min-h-[65vh]">
        <div className="max-w-lg mx-auto px-4 text-center space-y-4 bg-white border border-[#E5DDD0] rounded-xl p-10">
          <h1 className="font-serif text-2xl font-semibold text-[#231F1D]">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-sm text-[#6B5E54]">
            Add at least one handmade Jaipur block-printed cushion cover before proceeding to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors"
          >
            Browse Cushion Covers
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(customerEmail)) {
      setError('Please enter a valid email address for order confirmation.');
      return;
    }
    if (!address.trim() || !city.trim() || !postcode.trim() || !country.trim()) {
      setError('Please complete all delivery address fields.');
      return;
    }

    const order = placeOrder({
      customerName,
      customerEmail,
      address,
      city,
      postcode,
      country,
      paymentMethod,
    });

    if (order) {
      navigate(`/order-confirmation/${order.orderNumber}`);
    }
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
            Demonstration Checkout
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
            Delivery &amp; Order Details
          </h1>
        </div>

        <div className="mb-8 bg-[#F2ECE1] border border-[#D4C8B8] rounded-lg p-4 flex items-start gap-3 text-sm text-[#231F1D]">
          <Info className="w-5 h-5 text-[#1E3A5F] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">MVP Demonstration Notice:</span> This checkout simulates order placement locally for evaluation. No real card numbers are collected and no financial transaction is processed.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-7 bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8 space-y-6"
          >
            <h2 className="font-serif text-xl font-semibold text-[#231F1D] pb-3 border-b border-[#EFE7DA]">
              Customer &amp; Delivery Address
            </h2>

            {error && (
              <div
                role="alert"
                className="p-3.5 rounded-md bg-[#FDF2F0] border border-[#E6B8AE] text-sm text-[#9B412B]"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="checkout-name" className="block text-xs font-medium text-[#231F1D]">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sophie Reynolds"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-email" className="block text-xs font-medium text-[#231F1D]">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="sophie@londonhome.co.uk"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="checkout-address" className="block text-xs font-medium text-[#231F1D]">
                Delivery Street Address
              </label>
              <input
                id="checkout-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 24 Redchurch Street, Shoreditch"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="checkout-city" className="block text-xs font-medium text-[#231F1D]">
                  City
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="London"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-postcode" className="block text-xs font-medium text-[#231F1D]">
                  Postcode
                </label>
                <input
                  id="checkout-postcode"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="E2 7DP"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-country" className="block text-xs font-medium text-[#231F1D]">
                  Country
                </label>
                <input
                  id="checkout-country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFE7DA] space-y-3">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
                Demo Payment Method
              </h2>
              <p className="text-xs text-[#6B5E54]">
                Select a simulated payment method for demonstration purposes. No real payment is charged.
              </p>

              <div className="space-y-2.5">
                <label className="flex items-start gap-3 p-4 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] cursor-pointer hover:border-[#B8533A] transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Demo Card Payment'}
                    onChange={() => setPaymentMethod('Demo Card Payment')}
                    className="mt-1 accent-[#B8533A]"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-[#231F1D]">
                      Demo Card Payment (Simulated)
                    </span>
                    <span className="block text-xs text-[#6B5E54]">
                      Simulates an instant UK debit/credit card checkout without collecting real card details.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] cursor-pointer hover:border-[#B8533A] transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'Demo Bank Transfer'}
                    onChange={() => setPaymentMethod('Demo Bank Transfer')}
                    className="mt-1 accent-[#B8533A]"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-[#231F1D]">
                      Demo Bank Transfer / Pay on Delivery (Simulated)
                    </span>
                    <span className="block text-xs text-[#6B5E54]">
                      Simulates an order placed for demonstration review and tracking.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
            >
              Place Demo Order · {formatPrice(total)}
            </button>
          </form>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-5 bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8 space-y-5">
            <h2 className="font-serif text-xl font-semibold text-[#231F1D] pb-3 border-b border-[#EFE7DA]">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {cartDetails.map(({ product, quantity, lineTotal }) => (
                <div key={product.id} className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0] shrink-0">
                    <SmartImage src={product.image} alt={product.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#231F1D] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-[#6B5E54] tabular-nums">
                      Qty: {quantity} × {formatPrice(product.price)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#231F1D] tabular-nums shrink-0">
                    {formatPrice(lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EFE7DA] space-y-2.5 text-sm">
              <div className="flex justify-between text-[#6B5E54]">
                <span>Subtotal</span>
                <span className="font-medium text-[#231F1D] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6B5E54]">
                <span>UK Tracked Delivery</span>
                <span className="font-medium text-[#231F1D] tabular-nums">
                  {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E5DDD0] flex justify-between text-base font-semibold text-[#231F1D]">
                <span>Total Amount</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#6B5E54]">
              <ShieldCheck className="w-4 h-4 text-[#1E3A5F] shrink-0" />
              <span>Order status updates immediately in Customer Order Tracking.</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
