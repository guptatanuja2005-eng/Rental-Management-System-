import { useEffect, useState } from 'react';
import { api } from '../../api';

const emptyForm = { name: '', category: '', price: '', image_url: '' };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function load() {
    api('/products').then((data) => setProducts(data.products));
  }

  useEffect(load, []);

  function startAdd() {
    setEditing('new');
    setForm(emptyForm);
  }

  function startEdit(p) {
    setEditing(p.id);
    setForm({ name: p.name, category: p.category, price: p.price, image_url: p.image_url });
  }

  async function save(e) {
    e.preventDefault();
    setError('');
    const body = { ...form, price: Number(form.price) };
    try {
      if (editing === 'new') await api('/products', { method: 'POST', body });
      else await api(`/products/${editing}`, { method: 'PUT', body });
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(p) {
    if (!confirm(`Delete "${p.name}"? Its rentals will be deleted too.`)) return;
    await api(`/products/${p.id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div>
      <div className="row-between">
        <h2>Products</h2>
        <button className="btn btn-primary" onClick={startAdd}>Add product</button>
      </div>
      {error && <p className="alert alert-error">{error}</p>}
      {editing !== null && (
        <form className="card form-grid" onSubmit={save}>
          <h3>{editing === 'new' ? 'Add product' : 'Edit product'}</h3>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            placeholder="Price (₹)"
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <input
            placeholder="Image URL"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <div className="row">
            <button className="btn btn-primary" type="submit">Save</button>
            <button className="btn" type="button" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{Number(p.price).toLocaleString('en-IN')}</td>
              <td>
                <button className="btn btn-small" onClick={() => startEdit(p)}>Edit</button>
                <button className="btn btn-small btn-danger" onClick={() => remove(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
