import {
  sqliteTable,
  text,
  integer,
  real,
} from 'drizzle-orm/sqlite-core'

// ───── ENUMS ─────
export const productStatusEnum = ['active', 'inactive', 'out_of_stock'] as const
export const paymentMethodEnum = ['cash', 'credit_card', 'debit_card'] as const

// ───── ENTERPRISE ─────
export const enterprise = sqliteTable('enterprise', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 45 }).notNull(),
  NIT: text('NIT', { length: 30 }).notNull(),
  email: text('email', { length: 100 }).notNull(),
  phone_number: text('phone_number', { length: 20 }).notNull(),
  currency: text('currency', { length: 20 }).notNull(),
})

// ───── CATEGORY ─────
export const category = sqliteTable('category', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 45 }).notNull(),
  description: text('description', { length: 255 }).notNull(),
  enterprise_id: integer('enterprise_id').notNull().references(() => enterprise.id),
  synced: integer('synced', { mode: 'boolean' }).default(false).notNull(),
})

// ───── SUPPLIER ─────
export const supplier = sqliteTable('supplier', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 45 }).notNull(),
  email: text('email', { length: 255 }).notNull(),
  phone_number: text('phone_number', { length: 45 }).notNull(),
  NIT: text('NIT', { length: 45 }).notNull(),
  enterprise_id: integer('enterprise_id').notNull().references(() => enterprise.id),
  synced: integer('synced', { mode: 'boolean' }).default(false).notNull(),
})

// ───── PRODUCT ─────
export const product = sqliteTable('product', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 45 }).notNull(),
  description: text('description', { length: 255 }).notNull(),
  status: text('status', { enum: productStatusEnum }).notNull(),
  stock: integer('stock').notNull(),
  supplier_price: real('supplier_price').notNull(),
  public_price: real('public_price').notNull(),
  thumbnail: text('thumbnail', { length: 45 }).notNull(),
  bar_code: text('bar_code', { length: 45 }).notNull(),
  minimal_safe_stock: integer('minimal_safe_stock').notNull(),
  discount: real('discount').notNull(),
  enterprise_id: integer('enterprise_id').notNull().references(() => enterprise.id),
  category_id: integer('category_id').notNull().references(() => category.id),
  supplier_id: integer('supplier_id').notNull().references(() => supplier.id),
  synced: integer('synced', { mode: 'boolean' }).default(false).notNull(),
})

// ───── CLIENT ─────
export const client = sqliteTable('client', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 45 }).notNull(),
})

// ───── INVOICE ─────
export const invoice = sqliteTable('invoice', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  payment_method: text('payment_method', { enum: paymentMethodEnum }).notNull(),
  total_price: real('total_price').notNull(),
})

// ───── SALE ─────
export const sale = sqliteTable('sale', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  quantity: integer('quantity').notNull(),
  discount: real('discount').notNull(),
  price: real('price').notNull(),
  sell_date: text('sell_date').notNull(), // ISO string
  total_price: real('total_price').notNull(),
  invoice_id: integer('invoice_id').notNull().references(() => invoice.id),
  client_id: integer('client_id').notNull().references(() => client.id),
  product_id: integer('product_id').notNull().references(() => product.id),
  synced: integer('synced', { mode: 'boolean' }).default(false).notNull(),
})
