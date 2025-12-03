import { useSelector, useDispatch } from "react-redux";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "@/store/cartSlice";
import { selectWhatsAppNumber } from "@/store/uiSlice";
import { formatPrice, orderCartViaWhatsApp } from "@/lib/whatsapp";

export function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCartOpen);
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const whatsAppNumber = useSelector(selectWhatsAppNumber);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleWhatsAppOrder = () => {
    orderCartViaWhatsApp(items, total, whatsAppNumber);
    dispatch(closeCart());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(closeCart())}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col" data-testid="cart-drawer">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-serif text-2xl">
            <ShoppingBag className="h-6 w-6" />
            Votre Panier
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Votre panier est vide</h3>
            <p className="text-muted-foreground mb-6">
              Découvrez notre collection de parfums et cosmétiques
            </p>
            <Link href="/produits">
              <Button onClick={() => dispatch(closeCart())} data-testid="button-continue-shopping">
                Découvrir nos produits
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 rounded-lg bg-muted/50"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-primary font-semibold">
                        {formatPrice(item.product.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${item.product.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span
                          className="w-8 text-center text-sm font-medium"
                          data-testid={`text-quantity-${item.product.id}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          data-testid={`button-increase-${item.product.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                          onClick={() => handleRemove(item.product.id)}
                          data-testid={`button-remove-${item.product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-4 space-y-4">
              <Separator />

              {/* Subtotal */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span>À calculer</span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span
                  className="font-bold text-xl text-primary"
                  data-testid="text-cart-total"
                >
                  {formatPrice(total)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  size="lg"
                  className="w-full gap-2 bg-green-600 hover:bg-green-700 border-green-700"
                  onClick={handleWhatsAppOrder}
                  data-testid="button-order-whatsapp"
                >
                  <SiWhatsapp className="h-5 w-5" />
                  Commander via WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleClearCart}
                  data-testid="button-clear-cart"
                >
                  Vider le panier
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
