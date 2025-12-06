import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  selectIsProductModalOpen,
  selectSelectedProduct,
  closeProductModal,
  selectWhatsAppNumber,
} from "@/store/uiSlice";
import { addToCart } from "@/store/cartSlice";
import { selectProductsByCategory, selectCategoryById } from "@/store/productsSlice";
import {  orderProductViaWhatsApp } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "./ProductCard";
import { useState } from "react";

export function ProductModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsProductModalOpen);
  const product = useSelector(selectSelectedProduct);
  const whatsAppNumber = useSelector(selectWhatsAppNumber);
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const category = useSelector(
    product ? selectCategoryById(product.categoryId) : () => undefined
  );
  const relatedProducts = useSelector(
    product ? selectProductsByCategory(product.categoryId) : () => []
  ).filter((p) => p.id !== product?.id).slice(0, 4);

  if (!product) return null;

  const images = product.images?.length ? product.images : [product.imageUrl];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const handleWhatsAppOrder = () => {
    orderProductViaWhatsApp(product, whatsAppNumber);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => dispatch(closeProductModal())}
    >
      <DialogContent
        className="max-w-4xl max-h-[90vh] p-0 overflow-hidden"
        data-testid="modal-product"
      >
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="sr-only">
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    data-testid="img-product-main"
                  />
                  
                  {hasDiscount && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm">
                      -{discountPercentage}%
                    </Badge>
                  )}

                  {images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2"
                        onClick={prevImage}
                        data-testid="button-prev-image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={nextImage}
                        data-testid="button-next-image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                        data-testid={`button-thumbnail-${index}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} - Vue ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Category */}
                {category && (
                  <Badge variant="secondary" className="mb-2">
                    {category.name}
                  </Badge>
                )}

                {/* Title */}
                <h2
                  className="font-serif text-2xl md:text-3xl font-semibold"
                  data-testid="text-modal-product-name"
                >
                  {product.name}
                </h2>

                {/* Rating */}
                {product.rating && product.rating > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating.toFixed(1)} ({product.reviewCount} avis)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-3xl font-bold text-primary"
                    data-testid="text-modal-price"
                  >
                    {(product.price)} MAD
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-muted-foreground line-through">
                      {(product.originalPrice!)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p
                    className="text-muted-foreground leading-relaxed"
                    data-testid="text-modal-description"
                  >
                    {product.description}
                  </p>
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">
                    {product.inStock ? "En stock" : "Rupture de stock"}
                  </span>
                </div>

                {/* Reference */}
                <p className="text-xs text-muted-foreground">
                  Référence: {product.id}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-green-600 hover:bg-green-700 border-green-700"
                    onClick={handleWhatsAppOrder}
                    data-testid="button-modal-whatsapp"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                    Commander maintenant
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    data-testid="button-modal-add-cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-serif text-xl font-semibold mb-6">
                  Produits similaires
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard
                      key={relatedProduct.id}
                      product={relatedProduct}
                      showQuickView={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
