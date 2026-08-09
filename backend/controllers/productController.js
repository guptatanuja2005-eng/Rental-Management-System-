import pool from '../db/db.js';

export async function listProducts(req, res) {
  const { rows } = await pool.query(
    'SELECT id, name, category, price, image_url FROM products ORDER BY id'
  );
  res.json({ products: rows });
}

export async function createProduct(req, res) {
  const { name, category, price, image_url } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: 'name, category and price are required' });
  }
  const { rows } = await pool.query(
    `INSERT INTO products (name, category, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, category, price, image_url || '']
  );
  res.status(201).json({ product: rows[0] });
}

export async function updateProduct(req, res) {
  const { name, category, price, image_url } = req.body;
  const { rows } = await pool.query(
    `UPDATE products SET name = $1, category = $2, price = $3, image_url = $4
     WHERE id = $5 RETURNING *`,
    [name, category, price, image_url || '', req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Product not found' });
  res.json({ product: rows[0] });
}

export async function deleteProduct(req, res) {
  const { rows } = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Product not found' });
  res.json({ deleted: true });
}