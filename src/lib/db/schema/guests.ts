import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const guests = pgTable('guests', {
  id: uuid('guest_id').primaryKey().defaultRandom(),
  sessionToken: text('session_token').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('updated_at').defaultNow().notNull(),
});