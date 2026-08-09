import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

const METHODS = ['UPI', 'Card', 'Cash on Pickup', 'Mock Payment'];

export default function Payment() {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [method, setMethod] = useState('UPI');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    api(`/rentals/${id}`)
      .then((data) => setRental(data.rental))
      .catch((e) => setError(e.message));
  }, [id, user]);

  async function pay() {
    setBusy(true);
    setError('');
    try {
      await api(`/rentals/${id}/pay`, { method: 'POST', body: { method } });
      navigate(`/invoice/${id}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="container narrow">
      <h1>Payment</h1>
      {error && <p className="alert alert-error">{error}</p>}
      {rental && (
        <>
          <div className="card card-body">
            <h3>{rental.product_name}</h3>
            <p className="muted">Quantity: {rental.quantity}</p>
            <p className="price">₹{Number(rental.amount).toLocaleString('en-IN')}</p>
          </div>
          <div className="methods">
            {METHODS.map((m) => (
              <label key={m} className={`method ${method === m ? 'method-selected' : ''}`}>
                <input type="radio" name="method" checked={method === m} onChange={() => setMethod(m)} />
                {m}
              </label>
            ))}
          </div>
          <p className="hint">Mock payment - no real money is charged.</p>
          <button className="btn btn-primary btn-block" onClick={pay} disabled={busy}>
            {busy ? 'Paying...' : `Pay ₹${Number(rental.amount).toLocaleString('en-IN')}`}
          </button>
        </>
      )}
    </div>
  );
}
