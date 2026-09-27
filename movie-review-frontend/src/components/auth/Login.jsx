import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      toast.success(`Welcome back, ${data.user.name}!`);
      if (data.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            Don&apos;t have an account?{' '}
            <Link to="/register">Register</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
