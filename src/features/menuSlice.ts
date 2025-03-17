import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurant: string;
  rating: number;
  preparationTime: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestSeller?: boolean;
}

interface MenuState {
  items: MenuItem[];
  filteredItems: MenuItem[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
}

const initialState: MenuState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  selectedCategory: 'All',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    fetchMenuStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMenuSuccess: (state, action: PayloadAction<MenuItem[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    fetchMenuFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredItems = action.payload === 'All'
        ? state.items
        : state.items.filter(item => item.category.toLowerCase() === action.payload.toLowerCase());
    },
    searchItems: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredItems = state.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    },
    sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filteredItems = [...state.filteredItems].sort((a, b) =>
        action.payload === 'asc' ? a.price - b.price : b.price - a.price
      );
    },
    sortByRating: (state) => {
      state.filteredItems = [...state.filteredItems].sort((a, b) => b.rating - a.rating);
    },
  },
});

export const {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
  filterByCategory,
  searchItems,
  sortByPrice,
  sortByRating,
} = menuSlice.actions;

export default menuSlice.reducer; 