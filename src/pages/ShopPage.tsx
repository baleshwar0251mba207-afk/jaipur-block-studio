import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { ColourTone, PatternCategory } from '../types';

const PATTERN_OPTIONS: Array<'All' | PatternCategory> = [
  'All',
  'Floral',
  'Paisley',
  'Geometric',
  'Botanical',
];

const COLOUR_OPTIONS: Array<'All' | ColourTone> = [
  'All',
  'Terracotta',
  'Indigo',
  'Mustard',
  'Earthy & Cream',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export function ShopPage() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPattern = searchParams.get('pattern') as 'All' | PatternCategory | null;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<'All' | PatternCategory>(
    initialPattern && PATTERN_OPTIONS.includes(initialPattern) ? initialPattern : 'All'
  );
  const [selectedColour, setSelectedColour] = useState<'All' | ColourTone>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  useEffect(() => {
    const paramPattern = searchParams.get('pattern') as 'All' | PatternCategory | null;
    if (paramPattern && PATTERN_OPTIONS.includes(paramPattern)) {
      setSelectedPattern(paramPattern);
    } else if (!paramPattern) {
      setSelectedPattern('All');
    }
  }, [searchParams]);

  const handlePatternChange = (pattern: 'All' | PatternCategory) => {
    setSelectedPattern(pattern);
    if (pattern === 'All') {
      searchParams.delete('pattern');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ pattern });
    }
  };

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matches = products.filter((product) => {
      if (selectedPattern !== 'All' && product.pattern !== selectedPattern) return false;
      if (selectedColour !== 'All' && product.colour !== selectedColour) return false;
      if (onlyInStock && (!product.inStock || product.stock <= 0)) return false;

      if (query) {
        const haystack = [
          product.name,
          product.pattern,
          product.colour,
          product.shortDescription,
          product.artisanRegion,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    const sorted = [...matches];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return sorted;
  }, [products, searchQuery, selectedPattern, selectedColour, sortBy, onlyInStock]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedPattern !== 'All' ||
    selectedColour !== 'All' ||
    onlyInStock;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPattern('All');
    setSelectedColour('All');
    setOnlyInStock(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
            Jaipur Cotton Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
            Block-Printed Cushion Covers
          </h1>
          <p className="text-sm sm:text-base text-[#6B5E54] leading-relaxed">
            Every cover is crafted in small batches in Sanganer and Bagru on 100% organic handloom cotton. Filter by traditional motif, colourway, or availability.
          </p>
        </div>

        {/* Search, Filters & Sort Controls */}
        <div className="bg-white border border-[#E5DDD0] rounded-lg p-5 mb-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-[#6B5E54] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <label htmlFor="catalogue-search" className="sr-only">
                Search cushion covers
              </label>
              <input
                id="catalogue-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by design, motif, or colour (e.g. Paisley, Indigo)..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md text-[#231F1D] placeholder:text-[#6B5E54] focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6B5E54] hover:text-[#231F1D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="md:col-span-3 flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-[#231F1D] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 accent-[#B8533A] rounded cursor-pointer"
                />
                <span>In stock only</span>
              </label>
            </div>

            <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-2">
              <label htmlFor="sort-select" className="text-xs font-medium text-[#6B5E54] whitespace-nowrap">
                Sort by
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md text-[#231F1D] focus:outline-none focus:ring-2 focus:ring-[#B8533A] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFE7DA] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#6B5E54] mr-1">Pattern:</span>
              {PATTERN_OPTIONS.map((pattern) => {
                const active = selectedPattern === pattern;
                return (
                  <button
                    key={pattern}
                    type="button"
                    onClick={() => handlePatternChange(pattern)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#231F1D] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] text-[#6B5E54] hover:text-[#231F1D] border border-[#E5DDD0]'
                    }`}
                  >
                    {pattern}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#6B5E54] mr-1">Colour:</span>
              {COLOUR_OPTIONS.map((colour) => {
                const active = selectedColour === colour;
                return (
                  <button
                    key={colour}
                    type="button"
                    onClick={() => setSelectedColour(colour)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1E3A5F] text-white'
                        : 'bg-[#FAF7F2] text-[#6B5E54] hover:text-[#231F1D] border border-[#E5DDD0]'
                    }`}
                  >
                    {colour}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 text-sm text-[#6B5E54]">
          <span className="tabular-nums">
            Showing {filteredProducts.length} of {products.length} cushion covers
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-[#B8533A] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#E5DDD0] rounded-lg p-12 text-center space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-[#231F1D]">
              No cushion covers match your filters
            </h2>
            <p className="text-sm text-[#6B5E54] max-w-md mx-auto">
              Try clearing your search query or selecting another traditional block-print motif or colour tone.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-5 py-2.5 text-sm font-medium bg-[#231F1D] text-[#FAF7F2] rounded-md hover:bg-[#B8533A] transition-colors cursor-pointer"
            >
              Show All Cushion Covers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
