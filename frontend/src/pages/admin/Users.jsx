import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api('/admin/users').then((data) => setUsers(data.users));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`badge ${u.role === 'admin' ? 'badge-returned' : 'badge-active'}`}>
                  {u.role}
                </span>
              </td>
              <td>{new Date(u.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
