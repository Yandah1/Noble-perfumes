// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Perfume } from '@/components/EcommercePage';

interface CartItem {
  perfume: Perfume;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { perfume, quantity } = action.payload;
      const existingItem = state.items.find(item => item.perfume.name === perfume.name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ perfume, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.perfume._id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ name: string; quantity: number }>) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.perfume.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const perfumeName = action.payload;
      const item = state.items.find(item => item.perfume._id === perfumeName);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const perfumeName = action.payload;
      const item = state.items.find(item => item.perfume._id === perfumeName);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export default cartSlice.reducer;