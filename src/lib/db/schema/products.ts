import { pgTable, serial, text, decimal, integer, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  category: text('category').notNull(),
  brand: text('brand').notNull(),
  stock: integer('stock').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})