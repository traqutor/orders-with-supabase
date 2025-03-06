import { boolean, pgTable, text } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core/columns/integer';
import { sql } from 'drizzle-orm';
import { v4 } from 'uuid';



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
  customer_type_id: integer().default(1)
});

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
 * Notes
 */
export const notes = pgTable('notes', {
  created_at: text(),
  created_by: text(),
  message: text(),
  order_id: text().primaryKey(),
  bg_color: text(),
  text_color: text(),
  pin: boolean(),
  id: text().primaryKey(),
  is_system: text(),
  seq: integer()
});

export type NewNote = typeof notes.$inferInsert;
export type Note = typeof notes.$inferSelect;

/**
 * Shipments
 */
export const shipments = pgTable('shipments', {
  id: text().primaryKey(),
  contact: text(),
  phone: text(),
  email: text(),
  address: text(),
  due_at: text()

});

export type NewShipment = typeof shipments.$inferInsert;
export type Shipment = typeof shipments.$inferSelect;

/**
 * Services *
 */
export const services = pgTable('services', {
  id: text().primaryKey().default(v4()),
  description: text(),
  location: text(),
  start_at: text(),
  end_at: text(),
  technician: text(),
  contact: text(),
  phone: text(),
  email: text(),
  address: text()
});

export type NewService = typeof services.$inferInsert;
export type Service = typeof services.$inferSelect;


/**
 * Services *
 */
export const services_positions = pgTable('services_positions', {
  id: text().primaryKey().default(v4()),
  service_id: text(),
  description: text(),
  vehicle_vin: text(),
  car_plate: text(),
  technician: text(),
  serial_no: text(),
  is_done: boolean(),
  is_confirmed: boolean(),
  seq: text()
});

export type NewServicePosition = typeof services_positions.$inferInsert;
export type ServicePosition = typeof services_positions.$inferSelect;

/**
 * Profiles *
 */
export const profiles = pgTable('profiles', {
  id: text().primaryKey(),
  full_name: text(),
  avatar_url: text(),
  is_disabled: boolean(),
  email: text()
});

export type NewProfile = typeof profiles.$inferInsert;
export type Profile = typeof profiles.$inferSelect;


/**
 * Pinned Orders *
 */
export const pinned_orders = pgTable('pinned_orders', {
  id: text().primaryKey().default(v4()),
  user_id: text(),
  order_id: text()
});

export type NewPinnedOrder = typeof pinned_orders.$inferInsert;
export type PinnedOrder = typeof pinned_orders.$inferSelect;

/**
 * Order Statuses
 **/
export const orders_statuses = pgTable('orders_statuses', {
  id: text().primaryKey(),
  title: text(),
  color_hex: text()
});

export type NewOrderStatus = typeof orders_statuses.$inferInsert;
export type OrderStatus = typeof orders_statuses.$inferSelect;

/**
 * Orders Positions
 **/
export const orders_positions = pgTable('orders_positions', {
  id: text().primaryKey(),
  order_id: text().primaryKey(),
  description: text(),
  position_type: text(),
  quantity: integer(),
  unit: text(),
  price: integer(),
  is_optima: boolean(),
  price_type: text(),
  seq: integer()
});

export type NewOrderPosition = typeof orders_positions.$inferInsert;
export type OrderPosition = typeof orders_positions.$inferSelect;

/**
 * Orders Labels
 **/
export const orders_labels = pgTable('orders_labels', {
  id: text().primaryKey(),
  order_id: text()
});

export type NewOrderLabel = typeof orders_labels.$inferInsert;
export type OrderLabel = typeof orders_labels.$inferSelect;


/**
 * Orders Actions
 **/

export const orders_actions = pgTable('orders_actions', {
  id: integer("id").primaryKey().default(sql`nextval('orders_actions_id_seq')`),
  order_id: text().primaryKey(),
  action_id: text().primaryKey(),
  performed: boolean(),
});

export type NewOrderAction = typeof orders_actions.$inferInsert;
export type OrderAction = typeof orders_actions.$inferSelect;


/**
 * Orders Actions
 **/
export const orders = pgTable('orders', {
  id: text().primaryKey(),
  created_at: text(),
  created_by: text(),
  title: text(),
  reference_number: integer(),
  due_at: text(),
  assigned_to: text(),
  status_id: text(),
  invoice_id: text(),
  service_id: text(),
  shipment_id: text(),
  description: text(),
  name: text(),
  phone: text(),
  email: text(),
  address: text(),
  nip: text(),
  regon: text(),
  customer_id: text(),
  seq: integer()
});

export type NewOrder = typeof orders.$inferInsert;
export type Order = typeof orders.$inferSelect;


/**
 * Invoices
 **/
export const invoices = pgTable('invoices', {
  id: text().primaryKey(),
  invoice_number: text(),
  description: text(),
  total_amount: integer(),
  payment_at: text(),
  payment_type: text(),
  is_invoice_group: boolean(),
  group_cost: integer(),
  group_description: text(),
  contact: text(),
  nip: text(),
  regon: text(),
  phone: text(),
  email: text(),
  address: text()
});

export type NewInvoice = typeof invoices.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;

/**
 * Customers Types
 **/
export const customers_types = pgTable('customers_types', {
  id: integer().primaryKey(),
  type_name: text()

});

export type NewCustomerType = typeof customers_types.$inferInsert;
export type CustomerType = typeof customers_types.$inferSelect;


/**
 * Customers list item response
 */

export type CustomersGetResponseData = { customers: Customer, customers_types: CustomerType }