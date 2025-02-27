import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core/columns/integer';


/**
 * Actions
 **/

export const actions = pgTable('actions', {
  id: text('id').primaryKey(),
  title: text(),
  color_hex: text(),
  icon_name: text(),
  note_info: text(),
  seq: integer()
});

export type NewAction = typeof actions.$inferInsert;
export type Action = typeof actions.$inferSelect;

/**
 * Labels
 **/

export const customers = pgTable('customers', {
  id: text().primaryKey(),
  name: text(),
  description: text(),
  nip: text(),
  regon: text(),
  phone: text(),
  email: text(),
  address: text(),
  customer_type_id: integer()
});

export type NewCustomer = typeof customers.$inferInsert;
export type Customer = typeof customers.$inferSelect;

/**
 * Labels
 **/

export const labels = pgTable('labels', {
  id: text().primaryKey(),
  title: text(),
  color_hex: text(),
  icon_name: text()
});

export type NewLabel = typeof labels.$inferInsert;
export type Label = typeof labels.$inferSelect;

/**
 * Statuses
 **/

export const statuses = pgTable('orders_statuses', {
  id: text().primaryKey(),
  title: text(),
  color_hex: text()
});

export type NewStatus = typeof statuses.$inferInsert;
export type Status = typeof statuses.$inferSelect;


/**
 * Profiles
 **/

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  fullName: text('fullName'),
  phone: varchar('phone')
});

