CREATE TABLE users (  id SERIAL PRIMARY  KEY,
    firstname VARCHAR(150),
    password integer,
    lastname VARCHAR(255),
    email VARCHAR(100));

CREATE TABLE prdocuts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price integer
);

CREATE TABLE order_products(
    id SERIAL PRIMARY KEY , 
    items_count integer,
    product_price integer,
    order_id integer,
    product_id integer,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE orders(
    id SERIAL PRIMARY KEY ,
    order_status VARCHAR(50),
    total_price double precision,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
