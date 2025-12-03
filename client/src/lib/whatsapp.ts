import type { Product } from "@shared/schema";
import type { CartItem } from "../store/cartSlice";

/**
 * Build a WhatsApp URL with prefilled message
 * @param phoneNumber - WhatsApp number without + or spaces (e.g., "33600000000")
 * @param message - Message to prefill
 * @returns Complete wa.me URL
 */
export const buildWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Generate a WhatsApp order message for a single product
 */
export const generateProductOrderMessage = (product: Product): string => {
  return `Bonjour! Je souhaite commander:

*${product.name}*
Référence: ${product.id}
Prix: ${formatPrice(product.price)}

Merci de me confirmer la disponibilité.`;
};

/**
 * Generate a WhatsApp order message for cart items
 */
export const generateCartOrderMessage = (items: CartItem[], total: number): string => {
  const itemsList = items
    .map(
      (item) =>
        `- ${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`
    )
    .join("\n");

  return `Bonjour! Je souhaite commander:

${itemsList}

*Total: ${formatPrice(total)}*

Merci de me confirmer la disponibilité et les modalités de livraison.`;
};

/**
 * Generate a general inquiry message
 */
export const generateInquiryMessage = (customMessage?: string): string => {
  if (customMessage) {
    return customMessage;
  }
  return "Bonjour! J'aimerais avoir des informations sur vos produits.";
};

/**
 * Format price in French locale
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

/**
 * Open WhatsApp with the given URL
 */
export const openWhatsApp = (url: string): void => {
  window.open(url, "_blank", "noopener,noreferrer");
};

/**
 * Quick function to order a product via WhatsApp
 */
export const orderProductViaWhatsApp = (
  product: Product,
  phoneNumber: string
): void => {
  const message = generateProductOrderMessage(product);
  const url = buildWhatsAppUrl(phoneNumber, message);
  openWhatsApp(url);
};

/**
 * Quick function to order cart via WhatsApp
 */
export const orderCartViaWhatsApp = (
  items: CartItem[],
  total: number,
  phoneNumber: string
): void => {
  const message = generateCartOrderMessage(items, total);
  const url = buildWhatsAppUrl(phoneNumber, message);
  openWhatsApp(url);
};
