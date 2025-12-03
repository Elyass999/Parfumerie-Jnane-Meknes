import { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { Provider, useSelector, useDispatch } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { store } from "./store";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { PageLoader } from "@/components/layout/Loader";

// Widgets
import { WhatsAppWidget } from "@/components/widgets/WhatsAppWidget";
import { CartDrawer } from "@/components/widgets/CartDrawer";
import { ProductModal } from "@/components/products/ProductModal";
import { DevSettings } from "@/components/widgets/DevSettings";

// Pages - eager load home for fast initial render
import Home from "@/pages/Home";

// Lazy load other pages for code splitting
const Products = lazy(() => import("@/pages/Products"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const About = lazy(() => import("@/pages/About"));
const Location = lazy(() => import("@/pages/Location"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

import { selectTheme, setTheme } from "@/store/uiSlice";

function ThemeInitializer() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    // Apply theme on mount
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/produits" component={Products} />
        <Route path="/galerie" component={Gallery} />
        <Route path="/a-propos" component={About} />
        <Route path="/localisation" component={Location} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppContent() {
  return (
    <>
      <ThemeInitializer />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Router />
        </div>
        <Footer />
      </div>

      {/* Overlays and Widgets */}
      <WhatsAppWidget />
      <CartDrawer />
      <ProductModal />
      <BackToTop />
      <CookieNotice />
      <DevSettings />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
