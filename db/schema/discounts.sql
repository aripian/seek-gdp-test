CREATE TABLE IF NOT EXISTS discounts (
  id SERIAL PRIMARY KEY,
  discount_name VARCHAR,
  discount_desc VARCHAR,
  discount_formula VARCHAR,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);