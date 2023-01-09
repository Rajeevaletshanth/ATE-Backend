/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.admin
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

CREATE TABLE IF NOT EXISTS public.upload
(
    id SERIAL PRIMARY KEY,
    file CHARACTER VARYING NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.payment_customer
(
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL UNIQUE,
    customer_id CHARACTER VARYING NOT NULL UNIQUE,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);


CREATE TABLE IF NOT EXISTS public.payment_card
(
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    payment_method_id CHARACTER VARYING NOT NULL UNIQUE,
    card_holder_name CHARACTER VARYING NOT NULL,
    card_id CHARACTER VARYING NOT NULL,
    card_type CHARACTER VARYING NOT NULL,
    exp_month CHARACTER VARYING NOT NULL,
    exp_year CHARACTER VARYING NOT NULL,
    last_four_digits VARCHAR(4) NOT NULL,
    primary_card BOOLEAN DEFAULT true, 
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.stripe_product
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    product_id CHARACTER VARYING NOT NULL UNIQUE,
    price_id CHARACTER VARYING NOT NULL,
    product_type CHARACTER VARYING NOT NULL,
    price CHARACTER VARYING NOT NULL,
    image CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.payment
(
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    payment_intent_id CHARACTER VARYING NOT NULL,
    product_name CHARACTER VARYING,
    product_id CHARACTER VARYING,
    amount CHARACTER VARYING NOT NULL,
    status CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);
