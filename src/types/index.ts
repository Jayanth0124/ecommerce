export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  specs: {
    ram: string;
    storage: string;
    battery: string;
    camera: string;
    display: string;
    processor: string;
    os: string;
    network: string;
  };
  colors: string[];
  features: string[];
  description: string;
  category: 'flagship' | 'premium' | 'mid-range' | 'budget';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface CartItem {
  phone: Phone;
  quantity: number;
  selectedColor: string;
}

export interface WishlistItem {
  phone: Phone;
  addedAt: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  ram: string[];
  storage: string[];
  battery: string[];
  rating: number;
  colors: string[];
  network: string[];
  discount: number;
}