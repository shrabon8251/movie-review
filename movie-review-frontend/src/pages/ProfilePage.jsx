import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const updateData = { ...formData };
      if (password) {
        updateData.password = password;
      }
      const res = await authApi.updateProfile(updateData);
      setUser(res.data);
      toast.success('Profile updated!');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Update failed');
    }
  };

  if (!user) return null;

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">My Profile</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password (optional)</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
