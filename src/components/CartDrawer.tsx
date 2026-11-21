import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FREE_UK_SHIPPING_THRESHOLD } from '../data/seedData';
import { formatPrice } from '../utils/format';
import { SmartImage } from './SmartImage';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartDetails,
    subtotal,
    shipping,
    total,
    updateCartQuantity,
    removeFromCart,
  } = useStore();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_UK_SHIPPING_THRESHOLD - subtotal);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className="fixed inset-0 bg-[#231F1D]/45 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <aside className="relative w-full max-w-md bg-[#FAF7F2] h-full flex flex-col shadow-2xl border-l border-[#E5DDD0] z-10">
        <div className="px-6 py-5 border-b border-[#E5DDD0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B8533A]" strokeWidth={1.75} />
            <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
              Your Shopping Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
            className="w-10 h-10 flex items-center justify-center rounded-md text-[#6B5E54] hover:text-[#231F1D] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartDetails.length > 0 && (
          <div className="px-6 py-3 bg-[#F2ECE1] border-b border-[#E5DDD0] text-xs text-[#231F1D]">
            {remainingForFreeShipping === 0
              ? 'Your order qualifies for complimentary UK tracked delivery.'
              : `Add ${formatPrice(remainingForFreeShipping)} more for complimentary UK tracked delivery.`}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {cartDetails.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F2ECE1] mx-auto flex items-center justify-center text-[#6B5E54]">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg text-[#231F1D]">Your bag is empty</p>
                <p className="text-sm text-[#6B5E54]">
                  Explore our handmade Jaipur cotton cushion covers to begin styling your space.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-[#FAF7F2] rounded-md hover:bg-[#B8533A] transition-colors cursor-pointer"
              >
                Browse Cushion Covers
              </button>
            </div>
          ) : (
            cartDetails.map(({ product, quantity, lineTotal }) => (
              <div
                key={product.id}
                className="flex gap-4 pb-5 border-b border-[#E5DDD0] last:border-b-0"
              >
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="w-20 h-20 rounded-md overflow-hidden bg-[#F2ECE1] shrink-0 border border-[#E5DDD0]"
                >
                  <SmartImage src={product.image} alt={product.name} />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="text-sm font-semibold text-[#231F1D] hover:text-[#B8533A] transition-colors line-clamp-2"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-1 text-[#6B5E54] hover:text-[#B8533A] transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#6B5E54] mt-0.5">
                      {product.pattern} · {product.colour}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-[#E5DDD0] rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 flex items-center justify-center text-[#231F1D] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                        disabled={quantity >= product.stock}
                        className="w-8 h-8 flex items-center justify-center text-[#231F1D] hover:bg-[#F2ECE1] disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#231F1D] tabular-nums">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartDetails.length > 0 && (
          <div className="p-6 border-t border-[#E5DDD0] bg-white space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#6B5E54]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#231F1D]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#6B5E54]">
                <span>UK Tracked Delivery</span>
                <span className="tabular-nums font-medium text-[#231F1D]">
                  {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E5DDD0] flex justify-between text-base font-semibold text-[#231F1D]">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3 px-4 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="py-2.5 px-3 text-xs font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="py-2.5 px-3 text-xs font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  View Full Bag
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
