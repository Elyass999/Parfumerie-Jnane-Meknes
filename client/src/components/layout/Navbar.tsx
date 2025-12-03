import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, Search, ShoppingBag, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toggleMenu, closeMenu, selectIsMenuOpen, toggleSearch, closeSearch, selectIsSearchOpen, toggleTheme, selectTheme } from "@/store/uiSlice";
import { selectCartItemCount, openCart } from "@/store/cartSlice";
import { setSearchQuery } from "@/store/productsSlice";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Produits" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/localisation", label: "Localisation" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(selectIsMenuOpen);
  const isSearchOpen = useSelector(selectIsSearchOpen);
  const cartItemCount = useSelector(selectCartItemCount);
  const theme = useSelector(selectTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      dispatch(setSearchQuery(searchValue.trim()));
      dispatch(closeSearch());
      setLocation("/produits");
    }
  };

  const handleLinkClick = () => {
    dispatch(closeMenu());
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
        data-testid="navbar"
      >
        <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" onClick={handleLinkClick}>
            <a
              className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2"
              data-testid="link-logo"
            >
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                P
              </span>
              <span className="hidden sm:inline">Parfumerie</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate",
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleSearch())}
              aria-label="Rechercher"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              aria-label={theme === "light" ? "Mode sombre" : "Mode clair"}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => dispatch(openCart())}
              aria-label="Panier"
              data-testid="button-cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={() => dispatch(toggleMenu())}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  data-testid="button-menu"
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        onClick={handleLinkClick}
                        className={cn(
                          "block px-4 py-3 text-lg font-medium rounded-lg transition-colors hover-elevate",
                          location === link.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={() => dispatch(toggleSearch())}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Rechercher</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Rechercher un produit..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-1"
              autoFocus
              data-testid="input-search"
            />
            <Button type="submit" data-testid="button-search-submit">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
