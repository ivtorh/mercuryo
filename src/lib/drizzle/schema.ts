import { pgTable, serial, text, integer, timestamp, varchar, boolean, decimal } from "drizzle-orm/pg-core";

//define o esquema da tabela de usuários para o login e autenticação
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    isAdmin: boolean("is_admin").default(false),
});

//define o esquema da tabela de produtos do catálogo
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

//define o esquema da tabela de pedidos feitos pelos usuários
export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    productId: integer("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull(),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    paid: boolean("paid").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

//define o esquema da tabela de categorias para os produtos
export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
});

//define o esquema da tabela de carrinho de compras dos usuários
export const cartItems = pgTable("cart_items", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id).notNull(),
    productId: integer("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull().default(1),
    addedAt: timestamp("added_at").defaultNow().notNull(),
});
