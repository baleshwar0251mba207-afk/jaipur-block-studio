import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import { FREE_UK_SHIPPING_THRESHOLD } from '../data/seedData';
import { formatPrice } from '../utils/format';

export function CartPage() {
  const {
    cartDetails,
    subtotal,
    shipping,
    total,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStore();
  const navigate = useNavigate();

  const remainingForFree = Math.max(0, FREE_UK_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
            Shopping Bag
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
            Your Cushion Selection
          </h1>
        </div>

        {cartDetails.length === 0 ? (
          <div className="bg-white border border-[#E5DDD0] rounded-xl p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#F2ECE1] mx-auto flex items-center justify-center text-[#6B5E54]">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#231F1D]">
              Your shopping bag is currently empty
            </h2>
            <p className="text-sm text-[#6B5E54] max-w-md mx-auto">
              Browse our Sanganer and Bagru block-printed cotton cushion covers to begin building your collection.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white border border-[#E5DDD0] rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-[#F2ECE1] border-b border-[#E5DDD0] flex items-center justify-between text-xs text-[#231F1D]">
                <span>
                  {remainingForFree === 0
                    ? 'Complimentary UK tracked delivery unlocked.'
                    : `Add ${formatPrice(remainingForFree)} more for complimentary UK tracked delivery.`}
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[#6B5E54] hover:text-[#B8533A] underline cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>

              <div className="divide-y divide-[#EFE7DA]">
                {cartDetails.map(({ product, quantity, lineTotal }) => (
                  <div
                    key={product.id}
                    className="p-6 flex flex-col sm:flex-row sm:items-center gap-5"
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="w-24 h-24 rounded-lg overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0] shrink-0"
                    >
                      <SmartImage src={product.image} alt={product.name} />
                    </Link>

                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs text-[#6B5E54]">
                        {product.pattern} · {product.colour}
                      </p>
                      <Link
                        to={`/product/${product.id}`}
                        className="font-serif text-lg font-semibold text-[#231F1D] hover:text-[#B8533A] transition-colors block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-[#6B5E54] tabular-nums">
                        Unit Price: {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="inline-flex items-center border border-[#E5DDD0] rounded-md bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center text-[#231F1D] hover:bg-[#F2ECE1] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-medium tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          disabled={quantity >= product.stock}
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center text-[#231F1D] hover:bg-[#F2ECE1] disabled:opacity-40 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[84px]">
                        <span className="text-base font-semibold text-[#231F1D] tabular-nums">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-2 text-[#6B5E54] hover:text-[#B8533A] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5">
              <h2 className="font-serif text-xl font-semibold text-[#231F1D] pb-3 border-b border-[#EFE7DA]">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
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
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 px-4 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/shop"
                  className="block w-full text-center py-2.5 px-4 text-sm font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
