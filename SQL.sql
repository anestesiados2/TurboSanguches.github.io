-- Tabla de Sándwiches
CREATE TABLE sandwiches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    INDEX(name) -- Indexado para búsquedas rápidas por nombre
);

-- Tabla de Pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL, -- Nombre del cliente
    customer_email VARCHAR(255) NOT NULL, -- Email del cliente
    customer_phone VARCHAR(20), -- Teléfono del cliente
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha y hora del pedido
    status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending', -- Estado del pedido
    total_price DECIMAL(10, 2) NOT NULL -- Precio total del pedido
);

-- Tabla de Detalles del Pedido (para manejar múltiples sándwiches por pedido)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    sandwich_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (sandwich_id) REFERENCES sandwiches(id),
    INDEX(order_id, sandwich_id) -- Índice compuesto para mejorar las consultas
);
