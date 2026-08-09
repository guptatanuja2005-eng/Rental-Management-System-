import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Store from './pages/Store';
import Payment from './pages/Payment';
import Invoice from './pages/Invoice';
import Rentals from './pages/Rentals';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminRentals from './pages/admin/Rentals';
import AdminUsers from './pages/admin/Users';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/rentals" element={<Protected><Rentals /></Protected>} />
        <Route path="/pay/:id" element={<Protected><Payment /></Protected>} />
        <Route path="/invoice/:id" element={<Protected><Invoice /></Protected>} />
        <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="rentals" element={<AdminRentals />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
