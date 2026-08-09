import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') await login(email, password);
      else await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Login' : 'Create account'}</h1>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="alert alert-error">{error}</p>}
          <button className="btn btn-primary btn-block" type="submit">
            {mode === 'login' ? 'Login' : 'Sign up'}
          </button>
        </form>
        <p className="switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="link"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
        <p className="hint">
          Demo: admin@rentalhub.com / admin123
          <br />
          Customer: aarav@example.com / customer123
        </p>
      </div>
    </div>
  );
}
