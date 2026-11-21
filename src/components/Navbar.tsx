import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function Navbar() {
  const { totalCartItems, setIsCartOpen, currentUser } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b ${
      isActive
        ? 'text-[#231F1D] border-[#B8533A]'
        : 'text-[#6B5E54] border-transparent hover:text-[#231F1D] hover:border-[#231F1D]/30'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#231F1D] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8533A] rounded-sm"
        >
          Jaipur Block Studio
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            Our Craft
          </NavLink>
          <NavLink to="/track-order" className={navLinkClass}>
            Track Order
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/account" className={navLinkClass}>
            {currentUser ? 'Account' : 'Sign In'}
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping bag with ${totalCartItems} items`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium bg-[#231F1D] text-[#FAF7F2] rounded-md hover:bg-[#B8533A] transition-colors whitespace-nowrap shrink-0 min-h-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8533A]"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
            <span className="tabular-nums">Bag ({totalCartItems})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#231F1D] rounded-md hover:bg-[#F2ECE1] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E5DDD0] bg-[#FAF7F2] px-4 py-4 space-y-1"
        >
          {[
            { to: '/shop', label: 'Shop Cushion Covers' },
            { to: '/about', label: 'Our Craft & Heritage' },
            { to: '/track-order', label: 'Track Order' },
            { to: '/contact', label: 'Contact Us' },
            { to: '/account', label: currentUser ? `Account (${currentUser.name})` : 'Sign In / Sign Up' },
            { to: '/cart', label: `Shopping Bag (${totalCartItems})` },
          ].map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#F2ECE1] text-[#B8533A]'
                    : 'text-[#231F1D] hover:bg-[#F2ECE1]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
