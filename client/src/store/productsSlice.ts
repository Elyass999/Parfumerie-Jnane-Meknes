import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product, Category } from "@shared/schema";
import { products as seedProducts } from "../data/products";
import { categories as seedCategories } from "../data/categories";
import type { RootState } from "./index";

interface ProductsState {
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  sortBy: "name" | "price-asc" | "price-desc" | "rating";
}

const initialState: ProductsState = {
  products: seedProducts,
  categories: seedCategories,
  selectedCategory: null,
  searchQuery: "",
  sortBy: "name",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ProductsState["sortBy"]>) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.searchQuery = "";
      state.sortBy = "name";
    },
  },
});

export const {
  setProducts,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  clearFilters,
} = productsSlice.actions;

// Selectors
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectAllCategories = (state: RootState) => state.products.categories;
export const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;
export const selectSearchQuery = (state: RootState) => state.products.searchQuery;
export const selectSortBy = (state: RootState) => state.products.sortBy;

export const selectFilteredProducts = (state: RootState): Product[] => {
  let filtered = [...state.products.products];

  // Filter by category
  if (state.products.selectedCategory) {
    filtered = filtered.filter(
      (p) => p.categoryId === state.products.selectedCategory
    );
  }

  // Filter by search query
  if (state.products.searchQuery) {
    const query = state.products.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  // Sort products
  switch (state.products.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "name":
    default:
      filtered.sort((a, b) => a.name.localeCompare(b.name, "fr"));
      break;
  }

  return filtered;
};

export const selectProductsByCategory = (categoryId: string) => (state: RootState) =>
  state.products.products.filter((p) => p.categoryId === categoryId);

export const selectFeaturedProducts = (state: RootState) =>
  state.products.products.filter((p) => p.featured);

export const selectProductById = (productId: string) => (state: RootState) =>
  state.products.products.find((p) => p.id === productId);

export const selectCategoryById = (categoryId: string) => (state: RootState) =>
  state.products.categories.find((c) => c.id === categoryId);

export default productsSlice.reducer;
