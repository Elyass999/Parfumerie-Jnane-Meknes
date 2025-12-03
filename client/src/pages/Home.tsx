import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Truck, Shield, HeartHandshake } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/products/CategorySection";
import { selectAllCategories, selectFeaturedProducts } from "@/store/productsSlice";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Produits Authentiques",
    description: "100% produits originaux garantis",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Expédition sous 24-48h",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Transactions 100% sécurisées",
  },
  {
    icon: HeartHandshake,
    title: "Service Client",
    description: "Support personnalisé 7j/7",
  },
];

export default function Home() {
  const categories = useSelector(selectAllCategories);
  const featuredProducts = useSelector(selectFeaturedProducts);

  useEffect(() => {
    document.title = "Parfumerie Élégance - Votre Destination Beauté";
  }, []);

  return (
    <main data-testid="page-home">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-card border-y border-card-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-none bg-transparent"
              >
                <CardContent className="p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 md:py-20" data-testid="section-featured">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                  Nos Produits Vedettes
                </h2>
                <p className="text-muted-foreground">
                  Découvrez notre sélection des meilleurs produits
                </p>
              </div>
              <Link href="/produits">
                <Button variant="outline" className="gap-2">
                  Voir tous les produits
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Sections */}
      <div id="categories-section">
        {categories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Découvrez l'Excellence
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Rejoignez notre communauté de passionnés de beauté et profitez
            d'offres exclusives, de conseils personnalisés et d'un service
            client exceptionnel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/produits">
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px]"
                data-testid="button-cta-products"
              >
                Explorer la Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-cta-contact"
              >
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
