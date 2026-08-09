import pool from '../db/db.js';

export async function getStats(req, res) {
  const { rows } = await pool.query(
    `SELECT
       (SELECT COUNT(*) FROM users) AS total_users,
       (SELECT COUNT(*) FROM products) AS total_products,
       (SELECT COUNT(*) FROM rentals) AS total_rentals,
       (SELECT COUNT(*) FROM rentals WHERE status = 'pending') AS pending,
       (SELECT COUNT(*) FROM rentals WHERE status = 'active') AS active,
       (SELECT COUNT(*) FROM rentals WHERE status = 'returned') AS returned,
       (SELECT COALESCE(SUM(amount), 0) FROM payments) AS revenue`
  );
  res.json(rows[0]);
}

export async function getUsers(req, res) {
  const { rows } = await pool.query(
    'SELECT id, name, email, role, created_at FROM users ORDER BY id'
  );
  res.json({ users: rows });
}