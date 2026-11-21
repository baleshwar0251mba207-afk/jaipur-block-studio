import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShieldCheck, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';
import { useStore } from '../context/StoreContext';
import { formatApproxGBP, formatPrice } from '../utils/format';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="py-20 bg-[#FAF7F2] min-h-[65vh]">
        <div className="max-w-xl mx-auto px-4 text-center space-y-4">
          <h1 className="font-serif text-3xl font-semibold text-[#231F1D]">
            Cushion Cover Not Found
          </h1>
          <p className="text-sm text-[#6B5E54]">
            The cushion cover you requested could not be found in our current collection.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = product.inStock && product.stock > 0;
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.pattern === product.pattern ? 1 : 0;
      const bMatch = b.pattern === product.pattern ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <div className="py-10 lg:py-16 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#6B5E54]">
          <Link to="/" className="hover:text-[#231F1D]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop" className="hover:text-[#231F1D]">
            Shop
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#231F1D] font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Product Image */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0]">
              <SmartImage
                src={product.image}
                alt={product.name}
                fallbackLabel={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[#6B5E54]">
              <div className="bg-white border border-[#E5DDD0] rounded-md p-3">
                <span className="block font-semibold text-[#231F1D]">Origin</span>
                <span>{product.artisanRegion}</span>
              </div>
              <div className="bg-white border border-[#E5DDD0] rounded-md p-3">
                <span className="block font-semibold text-[#231F1D]">Motif</span>
                <span>{product.pattern} Block</span>
              </div>
              <div className="bg-white border border-[#E5DDD0] rounded-md p-3">
                <span className="block font-semibold text-[#231F1D]">SKU</span>
                <span className="font-mono">{product.sku}</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6 bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8">
            <div className="space-y-3 pb-6 border-b border-[#EFE7DA]">
              <div className="flex items-center justify-between gap-4 text-xs">
                <span className="text-[#6B5E54]">
                  {product.pattern} · {product.colour}
                </span>
                <span
                  className={`font-medium ${
                    isAvailable ? 'text-[#1E3A5F]' : 'text-[#9B412B]'
                  }`}
                >
                  {isAvailable
                    ? `In Stock (${product.stock} available)`
                    : 'Currently Out of Stock'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-2xl font-semibold text-[#231F1D] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-[#6B5E54] tabular-nums">
                  (Approx. {formatApproxGBP(product.price)} GBP reference)
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#231F1D] leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Bag */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-[#6B5E54]">Quantity</span>
                  <div className="inline-flex items-center border border-[#E5DDD0] rounded-md bg-[#FAF7F2]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={!isAvailable || quantity <= 1}
                      aria-label="Decrease quantity"
                      className="w-10 h-10 flex items-center justify-center text-[#231F1D] hover:bg-[#F2ECE1] disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((q) => Math.min(Math.max(1, product.stock), q + 1))
                      }
                      disabled={!isAvailable || quantity >= product.stock}
                      aria-label="Increase quantity"
                      className="w-10 h-10 flex items-center justify-center text-[#231F1D] hover:bg-[#F2ECE1] disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product.id, quantity, true)}
                  disabled={!isAvailable}
                  className={`flex-1 min-w-[200px] py-3 px-6 text-sm font-medium rounded-md transition-colors min-h-[44px] ${
                    isAvailable
                      ? 'bg-[#B8533A] text-white hover:bg-[#9B412B] cursor-pointer'
                      : 'bg-[#E5DDD0] text-[#6B5E54] cursor-not-allowed'
                  }`}
                >
                  {isAvailable
                    ? `Add to Bag · ${formatPrice(product.price * quantity)}`
                    : 'Currently Sold Out'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#6B5E54]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1E3A5F] shrink-0" />
                  <span>Complimentary UK shipping over ₹6,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1E3A5F] shrink-0" />
                  <span>Authentic Jaipur hand-block print</span>
                </div>
              </div>
            </div>

            {/* Fabric, Size, Care Specifications */}
            <div className="pt-6 border-t border-[#EFE7DA] space-y-4">
              <div>
                <h2 className="text-xs font-semibold tracking-wider text-[#231F1D] mb-1">
                  Fabric &amp; Material
                </h2>
                <p className="text-sm text-[#6B5E54] leading-relaxed">{product.fabric}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold tracking-wider text-[#231F1D] mb-1">
                  Dimensions &amp; Fit
                </h2>
                <p className="text-sm text-[#6B5E54] leading-relaxed">{product.size}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold tracking-wider text-[#231F1D] mb-1">
                  Care Instructions
                </h2>
                <p className="text-sm text-[#6B5E54] leading-relaxed">
                  {product.careInstructions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20 pt-14 border-t border-[#E5DDD0]">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-wider text-[#1E3A5F]">
                Pair &amp; Layer
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#231F1D]">
                Complementary Cushion Covers
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-sm font-medium text-[#B8533A] hover:underline whitespace-nowrap"
            >
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
