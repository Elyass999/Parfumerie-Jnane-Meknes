import { useEffect, lazy, Suspense, useState } from "react"; // Ajout de useState
import { Switch, Route } from "wouter";
import { Provider, useSelector, useDispatch } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { store } from "./store";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// ⚠️ NOUVEAU : Importez le composant Preloader
import Preloader from "@/components/layout/Preloader"; // Assurez-vous que le chemin est correct

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
// import { BackToTop } from "@/components/layout/BackToTop";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { PageLoader } from "@/components/layout/Loader";

// Widgets
import { WhatsAppWidget } from "@/components/widgets/WhatsAppWidget";
import { CartDrawer } from "@/components/widgets/CartDrawer";
import { ProductModal } from "@/components/products/ProductModal";
// import { DevSettings } from "@/components/widgets/DevSettings";

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

// --- ThemeInitializer reste inchangé ---
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

// --- Router reste inchangé ---
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

// --- AppContent est MODIFIÉ pour gérer le Preloader ---
function AppContent() {
  // 1. Contrôle du Preloader
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // 2. Simule le temps de chargement des données initiales
  useEffect(() => {
    // ⚠️ REMPLACEZ CETTE LOGIQUE PAR VOS VRAIS APPELS D'API !
    // Quand toutes vos données sont prêtes, appelez setIsAppLoading(false);
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000); // Temps de simulation (2 secondes)

    return () => clearTimeout(timer);
  }, []);

  // 3. Callback après la fin de l'animation GSAP
  const handlePreloaderFinished = () => {
    setShowContent(true);
  };

  return (
    <>
      {/* ⚠️ Affichage conditionnel du Preloader */}
      <Preloader 
        loading={isAppLoading} 
        onLoaded={handlePreloaderFinished} 
      />

      <ThemeInitializer />
      
      {/* 4. Le contenu de l'application est masqué jusqu'à ce que l'animation du Preloader soit terminée */}
      <div 
        className="flex flex-col min-h-screen"
        style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
      >
        <Navbar />
        <div className="flex-1">
          <Router />
        </div>
        <Footer />
      </div>

      {/* Overlays and Widgets (Peut être rendu même si le contenu principal est masqué) */}
      <WhatsAppWidget />
      <CartDrawer />
      <ProductModal />
      {/* <BackToTop /> */}
      <CookieNotice />
      {/* <DevSettings /> */}
      <Toaster />
    </>
  );
}

// --- App reste inchangé ---
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