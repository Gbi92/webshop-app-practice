CREATE TABLE IF NOT EXISTS `product` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);

CREATE TABLE IF NOT EXISTS `news` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `publish_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_path` varchar(255) DEFAULT NULL,
  `img_orientation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `country` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_admin` boolean NOT NULL DEFAULT 0,
  `is_verified` boolean NOT NULL DEFAULT 0,
  `phone_number` varchar(20) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `city` varchar(32) DEFAULT NULL,
  `street` varchar(256) DEFAULT NULL,
  `country_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  FOREIGN KEY (`country_id`) REFERENCES `country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `cart` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `cart_id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `product_id` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `order` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `user_id` varchar(36) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'Pending',
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `zip_code` varchar(20) NOT NULL,
  `city` varchar(32) NOT NULL,
  `street` varchar(256) NOT NULL,
  `country_id` varchar(36) NOT NULL,
  `order_price` int NOT NULL,
  `shipping_price` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`country_id`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `orderItem` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `order_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int DEFAULT 1,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `shipping` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `country_id` varchar(36) NOT NULL,
  `cost` int NOT NULL,
  `duration_in_days` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`country_id`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
