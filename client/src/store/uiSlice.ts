import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@shared/schema";
import type { RootState } from "./index";

interface UIState {
  isLoading: boolean;
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  isWhatsAppOpen: boolean;
  selectedProduct: Product | null;
  isProductModalOpen: boolean;
  cookieConsent: boolean;
  theme: "light" | "dark";
  devWhatsAppNumber: string;
}

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
};

const getWhatsAppNumber = (): string => {
  // Check environment variable first, then localStorage for dev override
  const envNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  if (envNumber) return envNumber;
  
  const savedNumber = localStorage.getItem("dev-whatsapp-number");
  return savedNumber || "+212619470601"; // Default French number
};

const initialState: UIState = {
  isLoading: false,
  isMenuOpen: false,
  isSearchOpen: false,
  isWhatsAppOpen: false,
  selectedProduct: null,
  isProductModalOpen: false,
  cookieConsent: localStorage.getItem("cookie-consent") === "true",
  theme: getInitialTheme(),
  devWhatsAppNumber: getWhatsAppNumber(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    toggleWhatsApp: (state) => {
      state.isWhatsAppOpen = !state.isWhatsAppOpen;
    },
    closeWhatsApp: (state) => {
      state.isWhatsAppOpen = false;
    },
    openProductModal: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.isProductModalOpen = true;
    },
    closeProductModal: (state) => {
      state.isProductModalOpen = false;
      state.selectedProduct = null;
    },
    setCookieConsent: (state, action: PayloadAction<boolean>) => {
      state.cookieConsent = action.payload;
      localStorage.setItem("cookie-consent", action.payload.toString());
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setDevWhatsAppNumber: (state, action: PayloadAction<string>) => {
      state.devWhatsAppNumber = action.payload;
      localStorage.setItem("dev-whatsapp-number", action.payload);
    },
  },
});

export const {
  setLoading,
  toggleMenu,
  closeMenu,
  toggleSearch,
  closeSearch,
  toggleWhatsApp,
  closeWhatsApp,
  openProductModal,
  closeProductModal,
  setCookieConsent,
  toggleTheme,
  setTheme,
  setDevWhatsAppNumber,
} = uiSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.ui.isLoading;
export const selectIsMenuOpen = (state: RootState) => state.ui.isMenuOpen;
export const selectIsSearchOpen = (state: RootState) => state.ui.isSearchOpen;
export const selectIsWhatsAppOpen = (state: RootState) => state.ui.isWhatsAppOpen;
export const selectSelectedProduct = (state: RootState) => state.ui.selectedProduct;
export const selectIsProductModalOpen = (state: RootState) => state.ui.isProductModalOpen;
export const selectCookieConsent = (state: RootState) => state.ui.cookieConsent;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectWhatsAppNumber = (state: RootState) => state.ui.devWhatsAppNumber;

export default uiSlice.reducer;
