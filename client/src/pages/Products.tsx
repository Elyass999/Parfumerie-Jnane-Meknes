import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGridSkeleton } from "@/components/layout/Loader";
import {
  selectAllCategories,
  selectFilteredProducts,
  selectSelectedCategory,
  selectSearchQuery,
  selectSortBy,
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  clearFilters,
} from "@/store/productsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const filteredProducts = useSelector(selectFilteredProducts);
  const selectedCategory = useSelector(selectSelectedCategory);
  const searchQuery = useSelector(selectSearchQuery);
  const sortBy = useSelector(selectSortBy);

  useEffect(() => {
    document.title = "Nos Produits - Parfumerie Élégance";
  }, []);

  const hasActiveFilters = selectedCategory || searchQuery;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Rechercher</label>
        <Input
          type="search"
          placeholder="Nom, description..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          data-testid="input-filter-search"
        />
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-medium mb-3 block">Catégories</label>
        <div className="space-y-2">
          <Button
            variant={!selectedCategory ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => dispatch(setSelectedCategory(null))}
            data-testid="button-category-all"
          >
            Toutes les catégories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => dispatch(setSelectedCategory(category.id))}
              data-testid={`button-category-${category.id}`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => dispatch(clearFilters())}
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4" />
          Effacer les filtres
        </Button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen pt-20 md:pt-24" data-testid="page-products">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-2">
            Nos Produits
          </h1>
          <p className="text-muted-foreground">
            Explorez notre collection complète de parfums et cosmétiques
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter & Sort Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtres
                    {hasActiveFilters && (
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                        !
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-100px)] pr-4">
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {/* Sort Select */}
              <Select
                value={sortBy}
                onValueChange={(value) => dispatch(setSortBy(value as typeof sortBy))}
              >
                <SelectTrigger className="w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom (A-Z)</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Meilleures notes</SelectItem>
                </SelectContent>
              </Select>

              {/* Active Filters */}
              <div className="flex flex-wrap gap-2 ml-auto">
                {selectedCategory && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => dispatch(setSelectedCategory(null))}
                  >
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="h-3 w-3" />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => dispatch(setSearchQuery(""))}
                  >
                    "{searchQuery}"
                    <X className="h-3 w-3" />
                  </Badge>
                )}
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  Aucun produit trouvé
                </p>
                <Button
                  variant="outline"
                  onClick={() => dispatch(clearFilters())}
                  data-testid="button-reset-search"
                >
                  Réinitialiser la recherche
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
