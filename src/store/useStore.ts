import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Phone, User, CartItem, WishlistItem, Order } from '../types';

interface StoreState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;

  // Cart
  cartItems: CartItem[];
  addToCart: (phone: Phone, selectedColor: string) => void;
  removeFromCart: (phoneId: string) => void;
  updateCartItemQuantity: (phoneId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (phone: Phone) => void;
  removeFromWishlist: (phoneId: string) => void;
  isInWishlist: (phoneId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: true,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAuthenticated: false,

      // Cart
      cartItems: [],
      addToCart: (phone, selectedColor) => {
        const existingItem = get().cartItems.find(
          item => item.phone.id === phone.id && item.selectedColor === selectedColor
        );
        
        if (existingItem) {
          set((state) => ({
            cartItems: state.cartItems.map(item =>
              item.phone.id === phone.id && item.selectedColor === selectedColor
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }));
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { phone, quantity: 1, selectedColor }]
          }));
        }
      },
      removeFromCart: (phoneId) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.phone.id !== phoneId)
        }));
      },
      updateCartItemQuantity: (phoneId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(phoneId);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.phone.id === phoneId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      clearCart: () => set({ cartItems: [] }),
      get cartTotal() {
        return get().cartItems.reduce((total, item) => total + (item.phone.price * item.quantity), 0);
      },

      // Wishlist
      wishlistItems: [],
      addToWishlist: (phone) => {
        set((state) => ({
          wishlistItems: [...state.wishlistItems, { phone, addedAt: new Date() }]
        }));
      },
      removeFromWishlist: (phoneId) => {
        set((state) => ({
          wishlistItems: state.wishlistItems.filter(item => item.phone.id !== phoneId)
        }));
      },
      isInWishlist: (phoneId) => {
        return get().wishlistItems.some(item => item.phone.id === phoneId);
      },

      // Orders
      orders: [],
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders]
        }));
      },

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'Aurora Mobile Hub-store',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        orders: state.orders,
      }),
    }
  )
);