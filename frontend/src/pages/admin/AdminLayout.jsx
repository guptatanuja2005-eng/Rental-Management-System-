import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div className="tabs">
        <NavLink to="/admin" end className="tab">Dashboard</NavLink>
        <NavLink to="/admin/products" className="tab">Products</NavLink>
        <NavLink to="/admin/rentals" className="tab">Rentals</NavLink>
        <NavLink to="/admin/users" className="tab">Users</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
