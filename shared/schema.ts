import { pgTable, text, varchar, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories/Brands table
export const categories = pgTable("categories", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
});

// Products table
export const products = pgTable("products", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  price: real("price").notNull(),
  originalPrice: real("original_price"),
  categoryId: varchar("category_id", { length: 50 }).notNull(),
  imageUrl: text("image_url").notNull(),
  images: text("images").array(),
  rating: real("rating").default(0),
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  tags: text("tags").array(),
});

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: varchar("id", { length: 50 }).primaryKey(),
  productId: varchar("product_id", { length: 50 }).notNull(),
  quantity: integer("quantity").notNull().default(1),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscriptions table
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id", { length: 50 }).primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCartItemSchema = createInsertSchema(cartItems).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit({ id: true, createdAt: true });

// Types
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

// Frontend-specific types for cart with product details
export interface CartItemWithProduct extends CartItem {
  product: Product;
}

// Users table (keeping existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
