import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, LogOut, Package, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatDate, formatPrice, validateEmail } from '../utils/format';

export function AccountPage({ initialMode = 'login' }: { initialMode?: 'login' | 'signup' }) {
  const { currentUser, loginUser, registerUser, logoutUser, orders } = useStore();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('London');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const res = loginUser(email, password);
    if (!res.ok && res.error) {
      setError(res.error);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Please choose a password of at least 6 characters.');
      return;
    }
    const res = registerUser(name, email, password, city);
    if (!res.ok && res.error) {
      setError(res.error);
    }
  };

  const fillSampleCustomer = () => {
    setMode('login');
    setEmail('arjun.mehta@londonhome.co.uk');
    setPassword('jaipur2026');
    setError(null);
  };

  if (currentUser) {
    const customerOrders = orders.filter(
      (o) => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
    );

    return (
      <div className="py-12 lg:py-16 bg-[#FAF7F2] min-h-[70vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DDD0]">
            <div className="space-y-1">
              <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
                Customer Account (Demo Session)
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
                Welcome, {currentUser.name}
              </h1>
            </div>
            <button
              type="button"
              onClick={logoutUser}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-[#E5DDD0] bg-white text-[#231F1D] rounded-md hover:bg-[#F2ECE1] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4 bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#EFE7DA]">
                <div className="w-10 h-10 rounded-full bg-[#F2ECE1] flex items-center justify-center text-[#1E3A5F]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[#231F1D]">
                    Profile Details
                  </h2>
                  <p className="text-xs text-[#6B5E54]">Stored locally for demo</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="block text-xs text-[#6B5E54]">Name</span>
                  <span className="font-medium text-[#231F1D]">{currentUser.name}</span>
                </div>
                <div>
                  <span className="block text-xs text-[#6B5E54]">Email</span>
                  <span className="font-medium text-[#231F1D]">{currentUser.email}</span>
                </div>
                <div>
                  <span className="block text-xs text-[#6B5E54]">Location</span>
                  <span className="font-medium text-[#231F1D]">
                    {currentUser.city || 'London'}, United Kingdom
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EFE7DA]">
                <Link
                  to="/shop"
                  className="block text-center py-2.5 px-4 text-sm font-medium bg-[#231F1D] text-white rounded-md hover:bg-[#B8533A] transition-colors"
                >
                  Browse Cushion Covers
                </Link>
              </div>
            </aside>

            <section className="lg:col-span-8 bg-white border border-[#E5DDD0] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE7DA]">
                <h2 className="font-serif text-xl font-semibold text-[#231F1D]">
                  Your Order History
                </h2>
                <span className="text-xs text-[#6B5E54] tabular-nums">
                  {customerOrders.length} orders
                </span>
              </div>

              {customerOrders.length === 0 ? (
                <div className="py-10 text-center space-y-3">
                  <Package className="w-6 h-6 text-[#6B5E54] mx-auto opacity-70" />
                  <p className="text-sm text-[#6B5E54]">
                    You haven’t placed any orders under {currentUser.email} yet.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center px-4 py-2 text-xs font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B]"
                  >
                    Shop Cushion Covers
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#EFE7DA]">
                  {customerOrders.map((order) => (
                    <div
                      key={order.orderNumber}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="font-mono font-semibold text-[#231F1D]">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs font-medium text-[#B8533A]">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B5E54]">
                          Placed {formatDate(order.createdAt)} · {order.items.length} item line(s)
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-[#231F1D] tabular-nums">
                          {formatPrice(order.total)}
                        </span>
                        <Link
                          to={`/track-order?order=${order.orderNumber}`}
                          className="px-3.5 py-2 text-xs font-medium border border-[#E5DDD0] text-[#231F1D] rounded-md hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
                        >
                          Track Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-16 bg-[#FAF7F2] min-h-[75vh]">
      <div className="max-w-lg mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-wider text-[#B8533A]">
            Customer Account
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231F1D]">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create a Customer Account'}
          </h1>
          <p className="text-sm text-[#6B5E54]">
            Save your London delivery details and track your Jaipur Block Studio orders.
          </p>
        </div>

        <div className="bg-[#F2ECE1] border border-[#D4C8B8] rounded-lg p-4 flex items-start gap-3 text-xs text-[#231F1D] leading-relaxed">
          <Info className="w-4 h-4 text-[#1E3A5F] shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p>
              <span className="font-semibold">Demonstration Authentication Notice:</span> This MVP uses browser localStorage rather than a production identity server.
            </p>
            <button
              type="button"
              onClick={fillSampleCustomer}
              className="font-semibold text-[#1E3A5F] underline hover:text-[#B8533A] cursor-pointer"
            >
              Use Sample Customer Account (arjun.mehta@londonhome.co.uk / jaipur2026)
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#F2ECE1] rounded-lg">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#231F1D] shadow-sm'
                  : 'text-[#6B5E54] hover:text-[#231F1D]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-[#231F1D] shadow-sm'
                  : 'text-[#6B5E54] hover:text-[#231F1D]'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3 rounded-md bg-[#FDF2F0] border border-[#E6B8AE] text-xs text-[#9B412B]"
            >
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="block text-xs font-medium text-[#231F1D]">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun.mehta@londonhome.co.uk"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="login-password" className="block text-xs font-medium text-[#231F1D]">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="signup-name" className="block text-xs font-medium text-[#231F1D]">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="signup-email" className="block text-xs font-medium text-[#231F1D]">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@londonhome.co.uk"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="signup-city" className="block text-xs font-medium text-[#231F1D]">
                  UK City
                </label>
                <input
                  id="signup-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="London"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="signup-password" className="block text-xs font-medium text-[#231F1D]">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#E5DDD0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#B8533A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium bg-[#B8533A] text-white rounded-md hover:bg-[#9B412B] transition-colors cursor-pointer"
              >
                Create Demo Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
