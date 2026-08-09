import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

export default function Store() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api('/products').then((data) => setProducts(data.products));
  }, []);

  async function rentProduct(product) {
    if (!user) {
      navigate('/auth');
      return;
    }
    setMessage('');
    try {
      const data = await api('/rentals', { method: 'POST', body: { product_id: product.id, quantity: 1 } });
      navigate(`/pay/${data.rental.id}`);
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Rent something</h1>
      {message && <p className="alert alert-success">{message}</p>}
      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <img src={p.image_url} alt={p.name} className="card-image" />
            <div className="card-body">
              <h3>{p.name}</h3>
              <p className="muted">{p.category}</p>
              <p className="price">₹{Number(p.price).toLocaleString('en-IN')}</p>
              <button className="btn btn-primary" onClick={() => rentProduct(p)}>
                Rent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
