CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'customer'
        CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    price_per_day NUMERIC(10,2) NOT NULL CHECK (price_per_day >= 0),
    security_deposit NUMERIC(10,2) NOT NULL CHECK (security_deposit >= 0),
    total_quantity INTEGER NOT NULL CHECK (total_quantity >= 0),
    available_quantity INTEGER NOT NULL CHECK (available_quantity >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rental_orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'booked'
        CHECK (status IN ('booked', 'picked_up', 'returned', 'cancelled')),
    rental_amount NUMERIC(10,2) NOT NULL CHECK (rental_amount >= 0),
    deposit_amount NUMERIC(10,2) NOT NULL CHECK (deposit_amount >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (end_date >= start_date)
);

CREATE TABLE rental_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rental_order_id INTEGER NOT NULL REFERENCES rental_orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_per_day NUMERIC(10,2) NOT NULL CHECK (price_per_day >= 0)
);

CREATE TABLE returns (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rental_order_id INTEGER UNIQUE NOT NULL REFERENCES rental_orders(id),
    returned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    condition VARCHAR(20) NOT NULL
        CHECK (condition IN ('good', 'damaged', 'missing')),
    damage_charge NUMERIC(10,2) DEFAULT 0 CHECK (damage_charge >= 0),
    late_fee NUMERIC(10,2) DEFAULT 0 CHECK (late_fee >= 0),
    refund_amount NUMERIC(10,2) DEFAULT 0 CHECK (refund_amount >= 0),
    notes TEXT
);

CREATE TABLE payments (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rental_order_id INTEGER NOT NULL REFERENCES rental_orders(id),
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    type VARCHAR(30) NOT NULL
        CHECK (type IN ('rental', 'deposit', 'refund', 'late_fee', 'damage_charge')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'refunded')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);