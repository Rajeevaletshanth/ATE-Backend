/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS public.user_payment_customer
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    customer_id CHARACTER VARYING NOT NULL UNIQUE,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);


CREATE TABLE IF NOT EXISTS public.user_payment_card
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
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

CREATE TABLE IF NOT EXISTS public.user_payment
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    payment_intent_id CHARACTER VARYING NOT NULL,
    product_name CHARACTER VARYING,
    product_id CHARACTER VARYING,
    amount CHARACTER VARYING NOT NULL,
    status CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);