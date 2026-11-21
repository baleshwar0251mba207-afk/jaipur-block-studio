import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function Footer() {
  const { isAdminAuthenticated } = useStore();

  return (
    <footer className="bg-[#231F1D] text-[#FAF7F2] border-t border-[#3A332F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3A332F]">
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="font-serif text-2xl font-semibold tracking-tight text-[#FAF7F2]">
              Jaipur Block Studio
            </Link>
            <p className="text-sm text-[#D6CCC0] leading-relaxed max-w-md">
              Handmade Jaipur block-printed cotton cushion covers crafted in partnership with Sanganer and Bagru artisan families for modern London and UK interiors.
            </p>
            <p className="text-xs text-[#A89B8C] tracking-wide">
              Handcrafted in Jaipur, India · Delivered across the United Kingdom
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold tracking-wider text-[#C48B22]">
              Collection
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D6CCC0]">
              <li>
                <Link to="/shop" className="hover:text-[#FAF7F2] transition-colors">
                  All Cushion Covers
                </Link>
              </li>
              <li>
                <Link to="/shop?pattern=Floral" className="hover:text-[#FAF7F2] transition-colors">
                  Floral Prints
                </Link>
              </li>
              <li>
                <Link to="/shop?pattern=Paisley" className="hover:text-[#FAF7F2] transition-colors">
                  Paisley Motifs
                </Link>
              </li>
              <li>
                <Link to="/shop?pattern=Geometric" className="hover:text-[#FAF7F2] transition-colors">
                  Geometric Jali
                </Link>
              </li>
              <li>
                <Link to="/shop?pattern=Botanical" className="hover:text-[#FAF7F2] transition-colors">
                  Botanical Prints
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-semibold tracking-wider text-[#C48B22]">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D6CCC0]">
              <li>
                <Link to="/about" className="hover:text-[#FAF7F2] transition-colors">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-[#FAF7F2] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#FAF7F2] transition-colors">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#FAF7F2] transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FAF7F2] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-sans text-xs font-semibold tracking-wider text-[#C48B22]">
              Studio Contact
            </h3>
            <div className="space-y-2 text-sm text-[#D6CCC0]">
              <p>hello@jaipurblockstudio.co.uk</p>
              <p className="text-xs text-[#A89B8C] leading-relaxed">
                London Correspondence Desk: Shoreditch, London E2, United Kingdom
              </p>
              <p className="text-xs text-[#A89B8C] leading-relaxed">
                Printing Workshops: Sanganer &amp; Bagru, Jaipur, Rajasthan
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A89B8C]">
          <p>
            © {new Date().getFullYear()} Jaipur Block Studio. Handmade cotton homeware MVP demonstration.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-[#FAF7F2] transition-colors">
              UK Shipping Info
            </Link>
            <Link to="/admin" className="hover:text-[#FAF7F2] transition-colors">
              {isAdminAuthenticated ? 'Admin Dashboard (Signed In)' : 'Admin Portal'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
