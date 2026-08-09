import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">RentalHub</Link>
        <div className="nav-links">
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
              <Link to="/rentals" className="nav-link">My Rentals</Link>
              <span className="user-chip">{user.name} ({user.role})</span>
              <button className="btn btn-small" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary">Login / Sign up</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
