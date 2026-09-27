import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { authApi } from '../../api/authApi';
import Spinner from '../common/Spinner';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.getAllUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const toggleBlock = async (user) => {
    try {
      if (user.blocked) {
        await authApi.unblockUser(user.id);
        toast.success(`${user.name} unblocked`);
      } else {
        await authApi.blockUser(user.id);
        toast.success(`${user.name} blocked`);
      }
      setUsers(users.map((u) => (u.id === user.id ? { ...u, blocked: !u.blocked } : u)));
    } catch (err) {
      toast.error('Action failed');
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Manage Users</h2>
      <Table hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Badge bg={user.role === 'ADMIN' ? 'warning' : 'info'}>
                  {user.role}
                </Badge>
              </td>
              <td>
                <Badge bg={user.blocked ? 'danger' : 'success'}>
                  {user.blocked ? 'Blocked' : 'Active'}
                </Badge>
              </td>
              <td>
                {user.role !== 'ADMIN' && (
                  <Button
                    variant={user.blocked ? 'success' : 'dark'}
                    size="sm"
                    onClick={() => toggleBlock(user)}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsers;
