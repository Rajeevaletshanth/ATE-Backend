/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.user
(
    id SERIAL PRIMARY KEY,
    username CHARACTER VARYING NOT NULL,
    address CHARACTER VARYING,
    authority CHARACTER VARYING NOT NULL,
    phone_no CHARACTER VARYING,
    email CHARACTER VARYING NOT NULL UNIQUE,
    password CHARACTER VARYING NOT NULL,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.order
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    products CHARACTER VARYING NOT NULL,
    order_date DATE NOT NULL,
    order_time TIME NOT NULL,
    delivery_fee FLOAT,
    total_amount FLOAT,
    status CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.favourite
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);