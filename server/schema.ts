import { pgTable, serial, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
});

export const website_configs = pgTable('website_configs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  templateType: text('templateType').notNull().default('default'),
  logo: text('logo').notNull().default(''),
  heroImage: text('heroImage').notNull().default(''),
  profileImage: text('profileImage').notNull().default(''),
  whatsappMessage: jsonb('whatsappMessage').notNull().default({ es: '', en: '' }),
  facebookUrl: text('facebookUrl').notNull().default(''),
  instagramUrl: text('instagramUrl').notNull().default(''),
  defaultLanguage: text('defaultLanguage').notNull().default('es'),
  showWhyWebsiteButton: boolean('showWhyWebsiteButton').notNull().default(false),
  showDomainButton: boolean('showDomainButton').notNull().default(false),
  showChatbot: boolean('showChatbot').notNull().default(false),
  whatsappNumber: text('whatsappNumber').notNull().default(''),
  clientApproval: jsonb('clientApproval').notNull().default({}),
  templateShowcaseCards: jsonb('templateShowcaseCards').notNull().default([]),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type WebsiteConfig = typeof website_configs.$inferSelect;
export type InsertWebsiteConfig = typeof website_configs.$inferInsert;
