import pool from '../db/db.js';

export async function createRental(req, res) {
  const { product_id, quantity } = req.body;
  const { rows } = await pool.query('SELECT id, name, price FROM products WHERE id = $1', [product_id]);
  const product = rows[0];
  if (!product) return res.status(404).json({ error: 'Product not found' });
  const qty = quantity || 1;
  const result = await pool.query(
    `INSERT INTO rentals (user_id, product_id, product_name, quantity, amount)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [req.user.id, product.id, product.name, qty, product.price * qty]
  );
  res.status(201).json({ rental: result.rows[0] });
}

export async function listRentals(req, res) {
  if (req.user.role === 'admin') {
    const { rows } = await pool.query(
      `SELECT r.*, u.name AS user_name, u.email AS user_email,
              p.method AS payment_method, p.paid_at, i.invoice_number
       FROM rentals r
       JOIN users u ON u.id = r.user_id
       LEFT JOIN payments p ON p.rental_id = r.id
       LEFT JOIN invoices i ON i.rental_id = r.id
       ORDER BY r.created_at DESC`
    );
    return res.json({ rentals: rows });
  }
  const { rows } = await pool.query(
    `SELECT r.*, p.method AS payment_method, p.paid_at, i.invoice_number
     FROM rentals r
     LEFT JOIN payments p ON p.rental_id = r.id
     LEFT JOIN invoices i ON i.rental_id = r.id
     WHERE r.user_id = $1
     ORDER BY r.created_at DESC`,
    [req.user.id]
  );
  res.json({ rentals: rows });
}

export async function getRental(req, res) {
  const { rows } = await pool.query('SELECT * FROM rentals WHERE id = $1', [req.params.id]);
  const rental = rows[0];
  if (!rental) return res.status(404).json({ error: 'Rental not found' });
  if (req.user.role !== 'admin' && rental.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Not your rental' });
  }
  res.json({ rental });
}

export async function getInvoice(req, res) {
  const { rows } = await pool.query(
    `SELECT r.id, r.user_id, r.product_name, r.quantity, r.amount, r.status, r.created_at,
            u.name AS user_name, u.email AS user_email,
            p.method AS payment_method, p.paid_at,
            i.invoice_number, i.issued_at
     FROM rentals r
     JOIN users u ON u.id = r.user_id
     LEFT JOIN payments p ON p.rental_id = r.id
     LEFT JOIN invoices i ON i.rental_id = r.id
     WHERE r.id = $1`,
    [req.params.id]
  );
  const row = rows[0];
  if (!row) return res.status(404).json({ error: 'Rental not found' });
  if (req.user.role !== 'admin' && row.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Not your rental' });
  }
  if (!row.invoice_number) return res.status(400).json({ error: 'Not paid yet' });
  res.json({ invoice: row });
}

export async function payRental(req, res) {
  const { method } = req.body;
  const methods = ['UPI', 'Card', 'Cash on Pickup', 'Mock Payment'];
  if (!methods.includes(method)) {
    return res.status(400).json({ error: 'Invalid payment method' });
  }
  const { rows } = await pool.query(
    `SELECT * FROM rentals WHERE id = $1 AND user_id = $2 AND status = 'pending'`,
    [req.params.id, req.user.id]
  );
  const rental = rows[0];
  if (!rental) return res.status(404).json({ error: 'Pending rental not found' });

  const payment = await pool.query(
    `INSERT INTO payments (rental_id, amount, method) VALUES ($1, $2, $3) RETURNING *`,
    [rental.id, rental.amount, method]
  );
  const invoiceNumber = `INV-${String(rental.id).padStart(4, '0')}`;
  const invoice = await pool.query(
    `INSERT INTO invoices (rental_id, invoice_number, amount) VALUES ($1, $2, $3) RETURNING *`,
    [rental.id, invoiceNumber, rental.amount]
  );
  await pool.query(`UPDATE rentals SET status = 'active' WHERE id = $1`, [rental.id]);

  res.status(201).json({ payment: payment.rows[0], invoice: invoice.rows[0] });
}

export async function returnRental(req, res) {
  const { rows } = await pool.query(
    `UPDATE rentals SET status = 'returned', returned_at = now()
     WHERE id = $1 AND status = 'active'
     RETURNING *`,
    [req.params.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Active rental not found' });
  res.json({ rental: rows[0] });
}