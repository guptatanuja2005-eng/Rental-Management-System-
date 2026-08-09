import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  function load() {
    api('/rentals').then((data) => setRentals(data.rentals));
  }

  useEffect(load, []);

  async function markReturned(id) {
    await api(`/rentals/${id}/return`, { method: 'PUT' });
    load();
  }

  return (
    <div className="container">
      <h1>{isAdmin ? 'All rentals' : 'My rentals'}</h1>
      {rentals.length === 0 && <p className="muted">No rentals yet.</p>}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            {isAdmin && <th>Customer</th>}
            <th>Qty</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Rented on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.product_name}</td>
              {isAdmin && <td>{r.user_name}</td>}
              <td>{r.quantity}</td>
              <td>₹{Number(r.amount).toLocaleString('en-IN')}</td>
              <td>{r.payment_method || '—'}</td>
              <td>
                <span className={`badge badge-${r.status}`}>{r.status}</span>
              </td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
              <td>
                {r.status === 'pending' && !isAdmin && (
                  <Link to={`/pay/${r.id}`} className="btn btn-primary btn-small">
                    Pay now
                  </Link>
                )}
                {r.status === 'active' && isAdmin && (
                  <button className="btn btn-small" onClick={() => markReturned(r.id)}>
                    Mark returned
                  </button>
                )}
                {r.invoice_number && (
                  <Link to={`/invoice/${r.id}`} className="btn btn-small">
                    Invoice
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
