#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();

const SQL = `
  CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand_name VARCHAR (255),
  country VARCHAR (255)
  );

  CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cat_name VARCHAR (255)
  );

  CREATE TABLE IF NOT EXISTS bikes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bike_name VARCHAR (255),
  speeds INTEGER,
  quantity INTEGER,
  price INTEGER,
  category_id INTEGER REFERENCES category (id) ON DELETE CASCADE,
  brand_id INTEGER REFERENCES brands (id) ON DELETE CASCADE
  );

  INSERT INTO brands (brand_name, country)
  VALUES ('CTM', 'Slovakia'),
  ('Commencal', 'Spain'),
  ('Specialized', 'United States'),
  ('Decathlon', 'France');

  INSERT INTO category (cat_name)
  VALUES ('Hardtail'),
  ('Full Suspension'),
  ('Road'),
  ('Gravel');

  INSERT INTO bikes (bike_name, speeds, quantity, price, category_id, brand_id) 
  VALUES 
  ('Zephyr Pro', 12, 7, 1250, (SELECT id FROM category WHERE cat_name = 'Hardtail'), (SELECT id FROM brands WHERE brand_name = 'CTM')),
  ('Meta FS', 12, 3, 1790, (SELECT id FROM category WHERE cat_name = 'Full Suspension'), (SELECT id FROM brands WHERE brand_name = 'Commencal')),
  ('Road Master', 22, 3, 990, (SELECT id FROM category WHERE cat_name = 'Road'), (SELECT id FROM brands WHERE brand_name = 'Decathlon')),
  ('Gravel Bro', 12, 2, 1150, (SELECT id FROM category WHERE cat_name = 'Gravel'), (SELECT id FROM brands WHERE brand_name = 'Specialized'));
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done!');
};

main();