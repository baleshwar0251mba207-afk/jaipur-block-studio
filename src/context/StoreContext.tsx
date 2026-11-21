import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  FREE_UK_SHIPPING_THRESHOLD,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  UK_SHIPPING_FEE,
} from '../data/seedData';
import {
  CartItem,
  ContactSubmission,
  CustomerUser,
  Order,
  OrderStatus,
  Product,
} from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'jbs_products_v1',
  CART: 'jbs_cart_v1',
  USERS: 'jbs_users_v1',
  CURRENT_USER: 'jbs_current_user_v1',
  ORDERS: 'jbs_orders_v1',
  ADMIN_AUTH: 'jbs_admin_auth_v1',
  NEWSLETTER: 'jbs_newsletter_v1',
  CONTACTS: 'jbs_contacts_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

interface PlaceOrderPayload {
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  paymentMethod: 'Demo Card Payment' | 'Demo Bank Transfer';
}

interface StoreContextValue {
  products: Product[];
  cart: CartItem[];
  cartDetails: Array<{ product: Product; quantity: number; lineTotal: number }>;
  totalCartItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: string, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  currentUser: CustomerUser | null;
  registeredUsers: CustomerUser[];
  loginUser: (email: string, password: string) => { ok: boolean; error?: string };
  registerUser: (name: string, email: string, password: string, city?: string) => { ok: boolean; error?: string };
  logoutUser: () => void;

  orders: Order[];
  placeOrder: (payload: PlaceOrderPayload) => Order | null;
  updateOrderStatus: (orderNumber: string, status: OrderStatus) => void;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, password: string) => { ok: boolean; error?: string };
  logoutAdmin: () => void;

  newsletterSubscribers: string[];
  subscribeNewsletter: (email: string) => { ok: boolean; message: string };

  contactSubmissions: ContactSubmission[];
  submitContactForm: (data: Omit<ContactSubmission, 'id' | 'submittedAt'>) => ContactSubmission;

  toast: string | null;
  showToast: (message: string) => void;
  resetDemoStore: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    readStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );
  const [registeredUsers, setRegisteredUsers] = useState<CustomerUser[]>(() =>
    readStorage<CustomerUser[]>(STORAGE_KEYS.USERS, INITIAL_USERS)
  );
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() =>
    readStorage<CustomerUser | null>(STORAGE_KEYS.CURRENT_USER, null)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS)
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() =>
    readStorage<boolean>(STORAGE_KEYS.ADMIN_AUTH, false)
  );
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.NEWSLETTER, [])
  );
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(() =>
    readStorage<ContactSubmission[]>(STORAGE_KEYS.CONTACTS, [])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(newsletterSubscribers));
  }, [newsletterSubscribers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contactSubmissions));
  }, [contactSubmissions]);

  const showToast = (message: string) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const cartDetails = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((entry): entry is { product: Product; quantity: number; lineTotal: number } => entry !== null);
  }, [cart, products]);

  const totalCartItems = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.quantity, 0),
    [cartDetails]
  );

  const subtotal = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartDetails]
  );

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_UK_SHIPPING_THRESHOLD ? 0 : UK_SHIPPING_FEE;
  }, [subtotal]);

  const total = subtotal + shipping;

  const addToCart = (productId: string, quantity = 1, openDrawer = true) => {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.inStock || product.stock <= 0) {
      showToast('This cushion cover is currently out of stock.');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        const nextQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQty } : item
        );
      }
      return [...prev, { productId, quantity: Math.min(product.stock, quantity) }];
    });

    showToast(`Added ${product.name} to your bag.`);
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find((p) => p.id === productId);
    const maxStock = product ? Math.max(1, product.stock) : 99;
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(quantity, maxStock) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const loginUser = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const matched = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );
    if (!matched) {
      return { ok: false, error: 'Invalid email or password for this demonstration account.' };
    }
    setCurrentUser(matched);
    showToast(`Welcome back, ${matched.name}.`);
    return { ok: true };
  };

  const registerUser = (name: string, email: string, password: string, city = 'London') => {
    const cleanEmail = email.trim().toLowerCase();
    if (registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const newUser: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password,
      city: city.trim() || 'London',
      createdAt: new Date().toISOString(),
    };
    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created for ${newUser.name}.`);
    return { ok: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('You have signed out.');
  };

  const placeOrder = (payload: PlaceOrderPayload): Order | null => {
    if (cartDetails.length === 0) return null;
    const nextSequence = 1044 + orders.length;
    const orderNumber = `JBS-2026-${nextSequence}`;

    const newOrder: Order = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: payload.customerName.trim(),
      customerEmail: payload.customerEmail.trim().toLowerCase(),
      address: payload.address.trim(),
      city: payload.city.trim(),
      postcode: payload.postcode.trim().toUpperCase(),
      country: payload.country.trim(),
      paymentMethod: payload.paymentMethod,
      items: cartDetails.map(({ product, quantity }) => ({
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        image: product.image,
        pattern: product.pattern,
      })),
      subtotal,
      shipping,
      total,
      status: 'Order Placed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setProducts((prev) =>
      prev.map((prod) => {
        const ordered = cartDetails.find((c) => c.product.id === prod.id);
        if (!ordered) return prod;
        const remaining = Math.max(0, prod.stock - ordered.quantity);
        return {
          ...prod,
          stock: remaining,
          inStock: remaining > 0,
        };
      })
    );
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderNumber: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
    );
    showToast(`Order ${orderNumber} updated to ${status}.`);
  };

  const getOrderByNumber = (orderNumber: string) => {
    const needle = orderNumber.trim().toUpperCase();
    return orders.find((o) => o.orderNumber.toUpperCase() === needle);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newProduct: Product = {
      ...productData,
      id: `jbs-${slug || 'cushion'}-${Date.now()}`,
      inStock: productData.stock > 0 && productData.inStock,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalogue.`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextStock = updates.stock !== undefined ? updates.stock : p.stock;
        const nextInStock =
          updates.inStock !== undefined
            ? updates.inStock && nextStock > 0
            : nextStock > 0;
        return {
          ...p,
          ...updates,
          stock: nextStock,
          inStock: nextInStock,
        };
      })
    );
    showToast('Product details updated.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.productId !== id));
    showToast('Product removed from catalogue.');
  };

  const loginAdmin = (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@jaipurblockstudio.co.uk' && password === 'admin2026') {
      setIsAdminAuthenticated(true);
      showToast('Signed in to Admin Dashboard.');
      return { ok: true };
    }
    return {
      ok: false,
      error: 'Invalid demonstration admin credentials.',
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    showToast('Signed out of Admin Portal.');
  };

  const subscribeNewsletter = (email: string) => {
    const clean = email.trim().toLowerCase();
    if (newsletterSubscribers.includes(clean)) {
      return {
        ok: true,
        message: 'You are already subscribed to Jaipur Block Studio studio dispatches.',
      };
    }
    setNewsletterSubscribers((prev) => [...prev, clean]);
    return {
      ok: true,
      message: 'Thank you for subscribing. Seasonal block-print releases will arrive in your inbox.',
    };
  };

  const submitContactForm = (data: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
    const submission: ContactSubmission = {
      ...data,
      id: `msg-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    setContactSubmissions((prev) => [submission, ...prev]);
    return submission;
  };

  const resetDemoStore = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setRegisteredUsers(INITIAL_USERS);
    setCart([]);
    showToast('Demo catalogue and orders restored to defaults.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartDetails,
        totalCartItems,
        subtotal,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        currentUser,
        registeredUsers,
        loginUser,
        registerUser,
        logoutUser,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderByNumber,
        addProduct,
        updateProduct,
        deleteProduct,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        newsletterSubscribers,
        subscribeNewsletter,
        contactSubmissions,
        submitContactForm,
        toast,
        showToast,
        resetDemoStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
}
