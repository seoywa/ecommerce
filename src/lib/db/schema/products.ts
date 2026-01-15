import { pgTable, text, decimal, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
  
  name: text('name').notNull(),
  description: text('description').notNull(),
  // categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  // genderId: uuid('gender_id').references(() => genders.id, { onDelete: 'set null' }),
  // brandId: uuid('brand_id').references(() => brands.id, { onDelete: 'set null' }),
  // isPublished: boolean('is_published').notNull().default(false),
  defaultVariantId: uuid('default_variant_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});