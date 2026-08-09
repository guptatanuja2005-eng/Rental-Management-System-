import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

export default function Invoice() {
  const { id } = useParams();
  const [inv, setInv] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/rentals/${id}/invoice`)
      .then((data) => setInv(data.invoice))
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <div className="container narrow">
      <h1>Invoice</h1>
      {error && <p className="alert alert-error">{error}</p>}
      {inv && (
        <div className="card invoice">
          <div className="invoice-head">
            <strong className="brand">RentalHub</strong>
            <span className="muted">{inv.invoice_number}</span>
          </div>
          <p className="muted">Issued: {new Date(inv.issued_at).toLocaleDateString()}</p>
          <p>
            <strong>Customer:</strong> {inv.user_name} ({inv.user_email})
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{inv.product_name}</td>
                <td>{inv.quantity}</td>
                <td>₹{Number(inv.amount).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
          <div className="invoice-total">
            <strong>Total: ₹{Number(inv.amount).toLocaleString('en-IN')}</strong>
          </div>
          <p className="muted">
            Paid via {inv.payment_method} on {new Date(inv.paid_at).toLocaleDateString()}
          </p>
          <button className="btn btn-primary" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </div>
      )}
    </div>
  );
}
