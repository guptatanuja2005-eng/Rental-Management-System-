import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api('/admin/stats').then(setStats);
  }, []);

  if (!stats) return null;

  const cards = [
    ['Users', stats.total_users],
    ['Products', stats.total_products],
    ['Rentals', stats.total_rentals],
    ['Pending', stats.pending],
    ['Active', stats.active],
    ['Returned', stats.returned],
    ['Revenue', `₹${Number(stats.revenue).toLocaleString('en-IN')}`],
  ];

  return (
    <div className="stats-grid">
      {cards.map(([label, value]) => (
        <div className="card stat" key={label}>
          <p className="muted">{label}</p>
          <h2>{value}</h2>
        </div>
      ))}
    </div>
  );
}
