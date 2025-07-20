-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS tiendadb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tiendadb;

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price DECIMAL(10, 2),
    image_url VARCHAR(500),
    sizes VARCHAR(255),
    colors VARCHAR(255),
    rating DECIMAL(3, 2),
    reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de prueba
INSERT IGNORE INTO product (id, name, description, category, price, image_url, sizes, colors, rating, reviews) VALUES
(1, 'Camiseta Casual', 'Camiseta de algodón 100% con diseño moderno', 'Camisetas', 29.99, 'https://via.placeholder.com/300x400', 'S,M,L,XL', 'Negro,Blanco,Azul', 4.5, 127),
(2, 'Jeans Slim Fit', 'Jeans ajustados de mezclilla premium', 'Pantalones', 59.99, 'https://via.placeholder.com/300x400', '28,30,32,34,36', 'Azul Oscuro,Negro', 4.3, 89),
(3, 'Chaqueta de Cuero', 'Chaqueta de cuero sintético para estilo urbano', 'Chaquetas', 129.99, 'https://via.placeholder.com/300x400', 'S,M,L,XL', 'Negro,Marrón', 4.7, 54),
(4, 'Vestido Elegante', 'Vestido largo perfecto para ocasiones especiales', 'Vestidos', 89.99, 'https://via.placeholder.com/300x400', 'XS,S,M,L', 'Negro,Rojo,Azul Marino', 4.6, 76);
