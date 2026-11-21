import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const isAvailable = product.inStock && product.stock > 0;

  return (
    <article className="group flex flex-col bg-white border border-[#E5DDD0] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-[4/3] w-full bg-[#F2ECE1] overflow-hidden block"
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-xs text-[#6B5E54]">
            <span>
              {product.pattern} · {product.colour}
            </span>
            <span
              className={
                isAvailable
                  ? 'text-[#1E3A5F] font-medium'
                  : 'text-[#9B412B] font-medium'
              }
            >
              {isAvailable ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-lg font-semibold text-[#231F1D] group-hover:text-[#B8533A] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-[#6B5E54] leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-[#EFE7DA] flex items-center justify-between gap-3">
          <div>
            <span className="text-base font-semibold text-[#231F1D] tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="block text-[11px] text-[#6B5E54]">
              45 × 45 cm · 100% Cotton
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product.id, 1, true)}
            disabled={!isAvailable}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
              isAvailable
                ? 'bg-[#231F1D] text-[#FAF7F2] hover:bg-[#B8533A] cursor-pointer'
                : 'bg-[#E5DDD0] text-[#6B5E54] cursor-not-allowed'
            }`}
          >
            {isAvailable ? 'Add to Bag' : 'Sold Out'}
          </button>
        </div>
      </div>
    </article>
  );
}
