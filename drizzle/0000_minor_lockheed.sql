CREATE TABLE `enterprise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(45) NOT NULL,
	`NIT` text(30) NOT NULL,
	`email` text(100) NOT NULL,
	`phone_number` text(20) NOT NULL,
	`currency` text(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(45) NOT NULL,
	`description` text(255) NOT NULL,
	`enterprise_id` integer NOT NULL,
	`synced` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `supplier` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(45) NOT NULL,
	`email` text(255) NOT NULL,
	`phone_number` text(45) NOT NULL,
	`NIT` text(45) NOT NULL,
	`enterprise_id` integer NOT NULL,
	`synced` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `client` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(45) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `invoice` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`payment_method` text NOT NULL,
	`total_price` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(45) NOT NULL,
	`description` text(255) NOT NULL,
	`status` text NOT NULL,
	`stock` integer NOT NULL,
	`supplier_price` real NOT NULL,
	`public_price` real NOT NULL,
	`thumbnail` text(45) NOT NULL,
	`bar_code` text(45) NOT NULL,
	`minimal_safe_stock` integer NOT NULL,
	`discount` real NOT NULL,
	`enterprise_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`supplier_id` integer NOT NULL,
	`synced` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`enterprise_id`) REFERENCES `enterprise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sale` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quantity` integer NOT NULL,
	`discount` real NOT NULL,
	`price` real NOT NULL,
	`sell_date` text NOT NULL,
	`total_price` real NOT NULL,
	`invoice_id` integer NOT NULL,
	`client_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`synced` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`invoice_id`) REFERENCES `invoice`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
