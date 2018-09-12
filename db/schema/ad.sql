CREATE TABLE IF NOT EXISTS ad (
  id SERIAL PRIMARY KEY,
  ad_id VARCHAR,
  ad_name VARCHAR,
  ad_price NUMERIC,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);