import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
});

export const website_configs = pgTable('website_configs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  profileImage: text('profileImage').notNull().default(''),
  whatsappMessage: text('whatsappMessage').notNull().default(''),
  facebookUrl: text('facebookUrl').notNull().default(''),
  instagramUrl: text('instagramUrl').notNull().default(''),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type WebsiteConfig = typeof website_configs.$inferSelect;
export type InsertWebsiteConfig = typeof website_configs.$inferInsert;
