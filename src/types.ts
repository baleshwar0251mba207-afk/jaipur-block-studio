export type PatternCategory = 'Floral' | 'Paisley' | 'Geometric' | 'Botanical';

export type ColourTone = 'Terracotta' | 'Indigo' | 'Mustard' | 'Earthy & Cream';

export type OrderStatus = 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered';

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  pattern: PatternCategory;
  colour: ColourTone;
  shortDescription: string;
  description: string;
  fabric: string;
  size: string;
  careInstructions: string;
  stock: number;
  inStock: boolean;
  featured: boolean;
  image: string;
  artisanRegion: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  password: string;
  city?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  pattern: string;
}

export interface Order {
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  paymentMethod: 'Demo Card Payment' | 'Demo Bank Transfer';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  submittedAt: string;
}
