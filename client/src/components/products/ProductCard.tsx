import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addToCart } from "@/store/cartSlice";
import { openProductModal, selectWhatsAppNumber } from "@/store/uiSlice";
import { formatPrice, orderProductViaWhatsApp } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export function ProductCard({ product, showQuickView = true }: ProductCardProps) {
  const dispatch = useDispatch();
  const whatsAppNumber = useSelector(selectWhatsAppNumber);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    orderProductViaWhatsApp(product, whatsAppNumber);
  };

  const handleQuickView = () => {
    dispatch(openProductModal(product));
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <Card
      className="group overflow-visible cursor-pointer hover-elevate transition-all duration-300"
      onClick={handleQuickView}
      data-testid={`card-product-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <Badge
            className="absolute top-3 left-3 bg-destructive text-destructive-foreground"
            data-testid={`badge-discount-${product.id}`}
          >
            -{discountPercentage}%
          </Badge>
        )}

        {/* Quick View Overlay */}
        {showQuickView && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleQuickView();
              }}
              data-testid={`button-quickview-${product.id}`}
            >
              <Eye className="h-4 w-4" />
              Aperçu rapide
            </Button>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Rating */}
        {product.rating && product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2" data-testid={`rating-${product.id}`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating!)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Product Name */}
        <h3
          className="font-semibold text-sm md:text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p
          className="text-xs text-muted-foreground line-clamp-2 mb-3"
          data-testid={`text-product-desc-${product.id}`}
        >
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span
            className="text-lg font-bold text-primary"
            data-testid={`text-price-${product.id}`}
          >
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            className="w-full gap-2 bg-green-600 hover:bg-green-700 border-green-700"
            onClick={handleWhatsAppOrder}
            data-testid={`button-whatsapp-${product.id}`}
          >
            <SiWhatsapp className="h-4 w-4" />
            Commander
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={handleAddToCart}
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter au panier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
