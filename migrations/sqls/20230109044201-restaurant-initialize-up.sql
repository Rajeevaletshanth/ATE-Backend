/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.restaurant
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    authority CHARACTER VARYING NOT NULL,
    email CHARACTER VARYING NOT NULL UNIQUE,
    phone_no CHARACTER VARYING,
    password CHARACTER VARYING NOT NULL,
    description CHARACTER VARYING,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.product
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    description CHARACTER VARYING,
    category_id INTEGER,
    restaurant_id INTEGER NOT NULL,
    price FLOAT NOT NULL,
    vegetarian BOOLEAN DEFAULT false,
    avatar CHARACTER VARYING,
    addons CHARACTER VARYING, 
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.category
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    restaurant_id INTEGER NOT NULL,
    description CHARACTER VARYING,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.addons
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    restaurant_id INTEGER NOT NULL,
    price FLOAT NOT NULL,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.combo_menu
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    restaurant_id INTEGER NOT NULL,
    description CHARACTER VARYING,
    price FLOAT NOT NULL,
    discount FLOAT,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.cuisines
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.delivery_people
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING NOT NULL,
    restaurant_id INTEGER NOT NULL,
    email CHARACTER VARYING NOT NULL,
    address CHARACTER VARYING,
    phone_no CHARACTER VARYING,
    device_id CHARACTER VARYING,
    device_os CHARACTER VARYING,
    avatar CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.restaurant_settings
(
    id SERIAL PRIMARY KEY,
    website CHARACTER VARYING,
    email CHARACTER VARYING NOT NULL,
    phone_no CHARACTER VARYING,
    restaurant_id INTEGER NOT NULL UNIQUE,
    longitude CHARACTER VARYING,
    latitude CHARACTER VARYING,
    avatar CHARACTER VARYING,
    currency CHARACTER VARYING,
    cuisines CHARACTER VARYING,
    vegetarian BOOLEAN,
    service_type CHARACTER VARYING,
    default_language CHARACTER VARYING,
    opening_hours CHARACTER VARYING,
    terms_and_conditions CHARACTER VARYING,
    bank_name CHARACTER VARYING,
    iban CHARACTER VARYING,
    delivery_fee FLOAT,
    orderlimit_min FLOAT,
    facebook CHARACTER VARYING,
    instagram CHARACTER VARYING,
    pinterest CHARACTER VARYING,
    vimeo CHARACTER VARYING,
    youtube CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS public.table
(
    id SERIAL PRIMARY KEY,
    table_no INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    table_type CHARACTER VARYING,
    seat_count INTEGER NOT NULL,
    qr_code CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE (restaurant_id, table_no) 
);

CREATE TABLE IF NOT EXISTS public.table_reservation
(
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    table_ids CHARACTER VARYING NOT NULL,   
    customer_name CHARACTER VARYING NOT NULL,
    customer_phone CHARACTER VARYING NOT NULL,
    customer_email CHARACTER VARYING,
    guests_count INTEGER NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_from TIME NOT NULL,
    reservation_to TIME NOT NULL,
    note CHARACTER VARYING,
    status CHARACTER VARYING,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT FK_RestaurantReservation FOREIGN KEY (restaurant_id)
    REFERENCES public.restaurant(id)
);